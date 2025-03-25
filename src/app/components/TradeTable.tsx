"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import {
  ColDef,
  ValueFormatterParams,
  GridApi,
  GridReadyEvent,
  RowClassParams,
  CellClassParams,
} from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faFilterCircleXmark,
  faStop,
  faPlay,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";

interface TradeData {
  id: string;
  type: string;
  region: string;
  warehouse: string;
  confirmedPrice: number;
  quantity: number;
  brand: string;
  releaseDate: string;
  customsClearance: string;
  validUntil: string;
  isCompleted: string;
  note: string;
}

interface TradeTableProps {
  data: TradeData[];
}

// 간소화된 셀 렌더러 타입
interface CellParams {
  value: string;
}

// 필요한 모듈 등록
ModuleRegistry.registerModules([ClientSideRowModelModule]);

// 5의 배수로 숫자 반올림하는 함수
const roundToMultipleOf5 = (num: number): number => {
  return Math.round(num / 5) * 5;
};

const TradeTable = ({ data }: TradeTableProps) => {
  // 다크모드 지원을 위한 테마 관리
  const [gridTheme, setGridTheme] = useState("ag-theme-alpine");
  const [rowData, setRowData] = useState<TradeData[]>(data);
  const gridApiRef = useRef<GridApi | null>(null);
  const previousDataRef = useRef<{ [key: string]: TradeData }>({});
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [regionFilter, setRegionFilter] = useState<string>("ALL");
  const [filteredData, setFilteredData] = useState<TradeData[]>([]);
  const [isLive, setIsLive] = useState<boolean>(true);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  // 변경된 값을 추적하기 위한 상태
  const [changedCells, setChangedCells] = useState<{
    [id: string]: { [field: string]: "increase" | "decrease" | null };
  }>({});

  // 검색어와 필터에 따라 데이터 필터링
  useEffect(() => {
    let filtered = [...rowData];

    // 코드 검색어로 필터링
    if (searchTerm.trim()) {
      filtered = filtered.filter((item) =>
        item.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 타입으로 필터링
    if (typeFilter !== "ALL") {
      filtered = filtered.filter((item) => item.type === typeFilter);
    }

    // 지역으로 필터링
    if (regionFilter !== "ALL") {
      filtered = filtered.filter((item) => item.region === regionFilter);
    }

    setFilteredData(filtered);
  }, [searchTerm, typeFilter, regionFilter, rowData]);

  // 초기 데이터 설정
  useEffect(() => {
    // 초기 필터링된 데이터를 전체 데이터로 설정
    setFilteredData(rowData);
  }, [rowData]);

  // 초기 데이터 확장 (100개까지)
  useEffect(() => {
    if (data.length < 100) {
      const extendedData = [...data];
      const baseLength = data.length;

      for (let i = 0; i < 100 - baseLength; i++) {
        const sourceItem = data[i % baseLength];
        const newId = (parseInt(sourceItem.id) + baseLength + i)
          .toString()
          .padStart(5, "0");

        const newRow: TradeData = {
          ...sourceItem,
          id: newId,
          type: Math.random() > 0.5 ? "SELL" : "BUY",
          region: ["부산", "인천", "평택"][Math.floor(Math.random() * 3)],
          warehouse: ["B-1", "I-3", "P-2", "B-4", "I-5", "P-6"][
            Math.floor(Math.random() * 6)
          ],
          confirmedPrice: 3450000 + Math.floor(Math.random() * 100000),
          quantity: roundToMultipleOf5(15 + Math.floor(Math.random() * 35)), // 5의 배수로 수량 설정
          brand: ["PMB", "LME", "BIZ"][Math.floor(Math.random() * 3)],
          customsClearance: Math.random() > 0.4 ? "NO" : "YES",
          isCompleted: Math.random() > 0.5 ? "NO" : "YES",
        };
        extendedData.push(newRow);
      }

      setRowData(extendedData);
    }
  }, [data]);

  // 실시간 데이터 업데이트 시뮬레이션
  useEffect(() => {
    // 이전 데이터를 객체로 변환하여 저장
    const previousDataMap = {} as { [key: string]: TradeData };
    rowData.forEach((item) => {
      previousDataMap[item.id] = { ...item };
    });
    previousDataRef.current = previousDataMap;

    // 실시간 데이터 변경 시뮬레이션 함수
    const updateData = () => {
      // 기존 데이터의 10-20%에 변경 사항 적용
      const newData = [...rowData];
      const changesObj: {
        [id: string]: { [field: string]: "increase" | "decrease" | null };
      } = {};

      // 데이터 변경 적용
      for (let i = 0; i < Math.floor(Math.random() * 12) + 5; i++) {
        const randomIndex = Math.floor(Math.random() * newData.length);
        const randomRow = newData[randomIndex];
        const oldPrice = randomRow.confirmedPrice;
        const oldQuantity = randomRow.quantity;

        // 가격 변동 (±2% 범위 내)
        const priceChange = Math.random() > 0.5 ? 1 : -1;
        const newPrice =
          oldPrice +
          Math.floor(oldPrice * (Math.random() * 0.03) * priceChange);

        // 수량 변동 (5의 배수로)
        const quantityChange = Math.random() > 0.5 ? 1 : -1;
        const rawQuantityChange = Math.floor(
          oldQuantity * (Math.random() * 0.07) * quantityChange
        );
        const roundedQuantityChange = roundToMultipleOf5(rawQuantityChange);
        const newQuantity = oldQuantity + roundedQuantityChange;

        // 변경사항 적용
        newData[randomIndex] = {
          ...randomRow,
          confirmedPrice: newPrice,
          quantity: newQuantity,
        };

        // 변경 내역 추적
        changesObj[randomRow.id] = {
          confirmedPrice:
            newPrice > oldPrice
              ? "increase"
              : newPrice < oldPrice
              ? "decrease"
              : null,
          quantity:
            newQuantity > oldQuantity
              ? "increase"
              : newQuantity < oldQuantity
              ? "decrease"
              : null,
        };
      }

      // 새로운 행 추가 (15% 확률)
      if (Math.random() < 0.15) {
        const newId = (parseInt(newData[newData.length - 1].id) + 1)
          .toString()
          .padStart(5, "0");
        const newRow: TradeData = {
          id: newId,
          type: Math.random() > 0.5 ? "SELL" : "BUY",
          region: ["부산", "인천", "평택"][Math.floor(Math.random() * 3)],
          warehouse: ["B-1", "I-3", "P-2", "B-4", "I-5", "P-6"][
            Math.floor(Math.random() * 6)
          ],
          confirmedPrice: 3450000 + Math.floor(Math.random() * 100000),
          quantity: roundToMultipleOf5(15 + Math.floor(Math.random() * 35)), // 5의 배수로 수량 설정
          brand: ["PMB", "LME", "BIZ"][Math.floor(Math.random() * 3)],
          releaseDate: "2025.03." + (10 + Math.floor(Math.random() * 20)),
          customsClearance: Math.random() > 0.7 ? "NO" : "YES",
          validUntil:
            "2025.01." +
            (23 + Math.floor(Math.random() * 7)) +
            " " +
            Math.floor(Math.random() * 24) +
            ":00",
          isCompleted: Math.random() > 0.5 ? "NO" : "YES",
          note: "자세히 보기",
        };
        // 새 데이터를 배열의 첫 번째 위치에 추가
        newData.unshift(newRow);
      }

      // 행 제거 (8% 확률)
      if (Math.random() < 0.08 && newData.length > 5) {
        const removeIndex = Math.floor(Math.random() * newData.length);
        newData.splice(removeIndex, 1);
      }

      setRowData(newData);
      setChangedCells(changesObj);

      // 데이터 변경 후 정렬 유지
      setTimeout(() => {
        if (gridApiRef.current) {
          gridApiRef.current.applyColumnState({
            state: [
              {
                colId: "id",
                sort: "desc",
              },
            ],
            defaultState: { sort: null },
          });
        }
      }, 100);

      // 1.5초 후에 하이라이트 효과 제거
      setTimeout(() => {
        setChangedCells({});
      }, 1500);
    };

    // 실시간 데이터 업데이트 설정
    if (isLive) {
      intervalIdRef.current = setInterval(updateData, 1500); // 1.5초마다 데이터 업데이트
    }

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    };
  }, [rowData, isLive]);

  // 실시간 업데이트 토글 핸들러
  const toggleLiveUpdate = () => {
    setIsLive((prev) => !prev);
  };

  // AG Grid 준비 이벤트 핸들러
  const onGridReady = useCallback((params: GridReadyEvent) => {
    gridApiRef.current = params.api;

    // 그리드가 준비되면 사이즈 조정
    window.dispatchEvent(new Event("resize"));

    // ID 컬럼 기준으로 내림차순 정렬 설정
    setTimeout(() => {
      if (gridApiRef.current) {
        gridApiRef.current.applyColumnState({
          state: [
            {
              colId: "id",
              sort: "desc",
            },
          ],
          defaultState: { sort: null },
        });
      }
    }, 100);
  }, []);

  // 창 크기 변경 시 그리드 크기 조정
  useEffect(() => {
    const handleResize = () => {
      if (gridApiRef.current) {
        setTimeout(() => {
          gridApiRef.current?.sizeColumnsToFit();
        }, 100);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // 다크모드 감지 로직
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    const handleChange = (e: MediaQueryListEvent) => {
      setGridTheme(e.matches ? "ag-theme-alpine-dark" : "ag-theme-alpine");
    };

    // 초기 상태 설정
    setGridTheme(
      document.documentElement.classList.contains("dark")
        ? "ag-theme-alpine-dark"
        : "ag-theme-alpine"
    );

    // 변경 이벤트 리스너
    darkModeMediaQuery.addEventListener("change", handleChange);

    // 클린업 함수
    return () => darkModeMediaQuery.removeEventListener("change", handleChange);
  }, []);

  // 셀 클래스 설정 - 가격과 수량이 변경될 때 하이라이트 효과
  const getCellClass = useCallback(
    (params: CellClassParams) => {
      const field = params.colDef.field;
      const rowId = params.data.id;

      if (field && rowId && changedCells[rowId] && changedCells[rowId][field]) {
        return changedCells[rowId][field] === "increase"
          ? "cell-increase-highlight"
          : "cell-decrease-highlight";
      }

      return "";
    },
    [changedCells]
  );

  // 행 클래스 설정 - 새 행 강조 효과
  const getRowClass = useCallback((params: RowClassParams) => {
    const rowId = params.data.id;

    // 이전 데이터에 없던 새 행이면 하이라이트 효과
    if (!previousDataRef.current[rowId]) {
      return "row-new-highlight";
    }

    return "";
  }, []);

  // AG Grid 컬럼 정의
  const columnDefs: ColDef<TradeData>[] = [
    {
      field: "id",
      headerName: "코드",
      minWidth: 100,
      sortable: true,
      filter: true,
      flex: 0.7,
      sort: "desc",
    },
    {
      field: "type",
      headerName: "SELL/BUY",
      minWidth: 120,
      cellRenderer: (params: CellParams) => {
        const color =
          params.value === "SELL"
            ? "text-red-600 dark:text-red-400"
            : "text-blue-600 dark:text-blue-400";
        return <span className={color}>{params.value}</span>;
      },
      sortable: true,
      filter: true,
      flex: 0.8,
    },
    {
      field: "region",
      headerName: "지역",
      minWidth: 120,
      sortable: true,
      filter: true,
      flex: 0.8,
    },
    {
      field: "warehouse",
      headerName: "창고",
      minWidth: 100,
      sortable: true,
      filter: true,
      flex: 0.7,
    },
    {
      field: "confirmedPrice",
      headerName: "확정가격",
      minWidth: 150,
      valueFormatter: (params: ValueFormatterParams) => {
        return new Intl.NumberFormat("ko-KR").format(params.value);
      },
      sortable: true,
      filter: "agNumberColumnFilter",
      cellClass: getCellClass,
      flex: 1.2,
    },
    {
      field: "quantity",
      headerName: "수량[+/-5%]",
      minWidth: 130,
      sortable: true,
      filter: "agNumberColumnFilter",
      cellClass: getCellClass,
      flex: 1,
    },
    {
      field: "brand",
      headerName: "BRAND",
      minWidth: 120,
      sortable: true,
      filter: true,
      flex: 0.8,
    },
    {
      field: "releaseDate",
      headerName: "출고가능일",
      minWidth: 150,
      sortable: true,
      filter: true,
      flex: 1.2,
    },
    {
      field: "customsClearance",
      headerName: "통관완료",
      minWidth: 120,
      cellRenderer: (params: CellParams) => {
        const color =
          params.value === "NO"
            ? "text-red-600 dark:text-red-400"
            : "text-green-600 dark:text-green-400";
        return <span className={color}>{params.value}</span>;
      },
      sortable: true,
      filter: true,
      flex: 0.9,
    },
    {
      field: "validUntil",
      headerName: "유효기간",
      minWidth: 180,
      sortable: true,
      filter: true,
      flex: 1.5,
    },
    {
      field: "isCompleted",
      headerName: "체결여부",
      minWidth: 120,
      cellRenderer: (params: CellParams) => {
        const color =
          params.value === "NO"
            ? "text-red-600 dark:text-red-400"
            : "text-green-600 dark:text-green-400";
        return <span className={color}>{params.value}</span>;
      },
      sortable: true,
      filter: true,
      flex: 0.9,
    },
    {
      field: "note",
      headerName: "비고",
      minWidth: 120,
      cellRenderer: (params: CellParams) => {
        return (
          <button className="text-blue-600 dark:text-blue-400 hover:underline focus:outline-none flex items-center gap-1">
            <FontAwesomeIcon icon={faCircleInfo} className="h-4 w-4" />
            <span>{params.value}</span>
          </button>
        );
      },
      flex: 0.8,
    },
  ];

  // 기본 그리드 옵션
  const defaultColDef = {
    resizable: true,
  };

  // 검색어 변경 핸들러
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // 검색어 초기화 핸들러
  const handleClearSearch = () => {
    setSearchTerm("");
  };

  // 타입 필터 변경 핸들러
  const handleTypeFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeFilter(e.target.value);
  };

  // 지역 필터 변경 핸들러
  const handleRegionFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRegionFilter(e.target.value);
  };

  // 모든 필터 초기화 핸들러
  const handleResetFilters = () => {
    setSearchTerm("");
    setTypeFilter("ALL");
    setRegionFilter("ALL");
  };

  // 지역 목록 추출 (중복 제거)
  const uniqueRegions = [...new Set(rowData.map((item) => item.region))].sort();

  return (
    <>
      <style jsx global>{`
        @font-face {
          font-family: "Pretendard";
          src: url("/fonts/woff2/Pretendard-Regular.woff2") format("woff2"),
            url("/fonts/woff/Pretendard-Regular.woff") format("woff");
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: "Pretendard";
          src: url("/fonts/woff2/Pretendard-Medium.woff2") format("woff2"),
            url("/fonts/woff/Pretendard-Medium.woff") format("woff");
          font-weight: 500;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: "Pretendard";
          src: url("/fonts/woff2/Pretendard-SemiBold.woff2") format("woff2"),
            url("/fonts/woff/Pretendard-SemiBold.woff") format("woff");
          font-weight: 600;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: "Pretendard";
          src: url("/fonts/woff2/Pretendard-Bold.woff2") format("woff2"),
            url("/fonts/woff/Pretendard-Bold.woff") format("woff");
          font-weight: 700;
          font-style: normal;
          font-display: swap;
        }

        .cell-increase-highlight {
          background-color: rgba(0, 145, 255, 0.2) !important;
          transition: background-color 1s;
        }
        .cell-decrease-highlight {
          background-color: rgba(255, 0, 0, 0.2) !important;
          transition: background-color 1s;
        }
        .row-new-highlight {
          background-color: rgba(255, 255, 0, 0.1) !important;
          animation: fadeBackground 2s forwards;
        }
        @keyframes fadeBackground {
          from {
            background-color: rgba(255, 255, 0, 0.1);
          }
          to {
            background-color: transparent;
          }
        }

        .ag-theme-alpine {
          --ag-foreground-color: rgb(18, 18, 18);
          --ag-background-color: rgb(249, 250, 251);
          --ag-header-background-color: rgb(240, 242, 245);
          --ag-odd-row-background-color: rgba(226, 232, 240, 0.3);
          --ag-header-column-separator-color: rgb(200, 200, 200);
          --ag-border-color: rgb(226, 232, 240);
          --ag-row-height: 48px;
          --ag-header-height: 48px;
          --ag-font-size: 14px;
          --ag-font-family: "Pretendard", -apple-system, BlinkMacSystemFont,
            "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
            "Helvetica Neue", sans-serif;
        }

        .ag-theme-alpine-dark {
          --ag-foreground-color: rgb(245, 245, 245);
          --ag-background-color: rgb(22, 27, 34);
          --ag-header-background-color: rgb(36, 41, 47);
          --ag-odd-row-background-color: rgb(26, 32, 39);
          --ag-header-column-separator-color: rgb(70, 70, 70);
          --ag-border-color: rgb(48, 54, 61);
          --ag-row-height: 48px;
          --ag-header-height: 48px;
          --ag-font-size: 14px;
          --ag-font-family: "Pretendard", -apple-system, BlinkMacSystemFont,
            "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
            "Helvetica Neue", sans-serif;
        }

        .ag-theme-alpine-dark .ag-header,
        .ag-theme-alpine .ag-header {
          font-weight: 600;
        }

        .ag-theme-alpine-dark .ag-cell,
        .ag-theme-alpine .ag-cell {
          padding-top: 12px;
          padding-bottom: 12px;
          line-height: 24px;
          display: flex;
          align-items: center;
        }

        .ag-theme-alpine .ag-cell-value,
        .ag-theme-alpine-dark .ag-cell-value {
          line-height: 24px;
        }

        .search-bar {
          margin-bottom: 16px;
          width: 100%;
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .search-container {
          position: relative;
          display: flex;
          align-items: center;
          flex-grow: 1;
          max-width: 300px;
        }

        .search-input {
          padding: 8px 12px;
          padding-right: 32px;
          border-radius: 4px;
          border: 1px solid var(--ag-border-color);
          background-color: var(--ag-background-color);
          color: var(--ag-foreground-color);
          font-family: var(--ag-font-family);
          font-size: 14px;
          width: 100%;
          transition: border-color 0.2s;
        }

        .search-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
        }

        .clear-button {
          position: absolute;
          right: 8px;
          background: none;
          border: none;
          cursor: pointer;
          color: #6b7280;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          width: 20px;
          height: 20px;
        }

        .clear-button:hover {
          color: #4b5563;
        }

        .search-label {
          margin-right: 8px;
          font-weight: 500;
          color: var(--ag-foreground-color);
          font-family: "Pretendard", var(--ag-font-family);
        }

        .filter-group {
          display: flex;
          align-items: center;
        }

        .filter-select {
          padding: 8px 12px;
          border-radius: 4px;
          border: 1px solid var(--ag-border-color);
          background-color: var(--ag-background-color);
          color: var(--ag-foreground-color);
          font-family: "Pretendard", var(--ag-font-family);
          font-size: 14px;
          min-width: 120px;
          transition: border-color 0.2s;
        }

        .filter-select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
        }

        .reset-button {
          padding: 8px 12px;
          border-radius: 4px;
          border: 1px solid var(--ag-border-color);
          background-color: var(--ag-background-color);
          color: var(--ag-foreground-color);
          font-family: "Pretendard", var(--ag-font-family);
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .reset-button:hover {
          background-color: rgba(59, 130, 246, 0.1);
          border-color: #3b82f6;
        }

        .control-bar {
          margin-top: 16px;
          display: flex;
          justify-content: center;
        }

        .toggle-button {
          padding: 8px 16px;
          border-radius: 4px;
          font-family: "Pretendard", var(--ag-font-family);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          min-width: 180px;
        }

        .live-button {
          background-color: #ef4444;
          color: white;
        }

        .live-button:hover {
          background-color: #dc2626;
        }

        .paused-button {
          background-color: #10b981;
          color: white;
        }

        .paused-button:hover {
          background-color: #059669;
        }

        .toggle-button-icon {
          margin-right: 8px;
        }
      `}</style>
      <div className="flex flex-col w-full">
        <div className="search-bar">
          <div className="filter-group">
            <label htmlFor="codeSearch" className="search-label">
              코드:
            </label>
            <div className="search-container">
              <input
                id="codeSearch"
                type="text"
                className="search-input"
                placeholder="코드 번호 입력..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              {searchTerm && (
                <button
                  className="clear-button"
                  onClick={handleClearSearch}
                  aria-label="검색어 지우기"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              )}
            </div>
          </div>
          <div className="filter-group">
            <label htmlFor="typeFilter" className="search-label">
              타입:
            </label>
            <select
              id="typeFilter"
              className="filter-select"
              value={typeFilter}
              onChange={handleTypeFilterChange}
            >
              <option value="ALL">전체</option>
              <option value="SELL">SELL</option>
              <option value="BUY">BUY</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="regionFilter" className="search-label">
              지역:
            </label>
            <select
              id="regionFilter"
              className="filter-select"
              value={regionFilter}
              onChange={handleRegionFilterChange}
            >
              <option value="ALL">전체</option>
              {uniqueRegions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
          <button
            className="reset-button flex items-center gap-1"
            onClick={handleResetFilters}
          >
            <FontAwesomeIcon icon={faFilterCircleXmark} />
            <span>필터 초기화</span>
          </button>
          <button
            className={`toggle-button ${
              isLive ? "live-button" : "paused-button"
            } ml-auto flex items-center justify-center gap-1`}
            onClick={toggleLiveUpdate}
          >
            <FontAwesomeIcon icon={isLive ? faStop : faPlay} />
            <span>{isLive ? "실시간 중지" : "실시간 시작"}</span>
          </button>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {filteredData.length}개 항목
          </div>
        </div>
        <div className={`${gridTheme} w-full h-[calc(100vh-170px)]`}>
          <AgGridReact
            rowData={filteredData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            pagination={true}
            paginationPageSize={15}
            suppressMovableColumns={true}
            animateRows={true}
            rowSelection="single"
            onGridReady={onGridReady}
            getRowClass={getRowClass}
            domLayout="normal"
            rowHeight={48}
            headerHeight={48}
            sortingOrder={["desc", "asc", null]}
          />
        </div>
      </div>
    </>
  );
};

export default TradeTable;
