"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Sidebar from "../components/Sidebar";

// 타입 정의
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

// 클라이언트 사이드에서만 렌더링되는 컴포넌트 (SSR 방지)
const TradeTable = dynamic(() => import("../components/TradeTable"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-64">
      <p className="text-gray-500 dark:text-gray-400">
        테이블을 불러오는 중...
      </p>
    </div>
  ),
});

export default function ExchangePage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [tradeData, setTradeData] = useState<TradeData[]>([]);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);

    // 데이터 로드
    const fetchData = async () => {
      try {
        setLoading(true);
        // API가 없으므로 임시로 로컬 데이터 사용
        const localData = await import("../data/tradeData.json");
        // 약간의 지연 추가하여 AG Grid 초기화가 완료되도록 함
        setTimeout(() => {
          setTradeData(localData.default);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error loading trade data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 마운트 전에는 UI를 렌더링하지 않음 (SSR과 CSR 간의 불일치 방지)
  if (!mounted) {
    return null;
  }

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 사이드바 */}
      <Sidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />

      {/* 메인 콘텐츠 */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        <main className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            비철금속 거래소
          </h1>

          {/* 거래 테이블 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-gray-500 dark:text-gray-400">
                  데이터를 불러오는 중...
                </p>
              </div>
            ) : (
              tradeData.length > 0 && <TradeTable data={tradeData} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
