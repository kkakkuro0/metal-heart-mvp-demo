"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faDollarSign,
  faBoxesPacking,
  faUser,
  faChevronLeft,
  faChevronRight,
  faMoneyBillTrendUp,
  faBuilding,
  faPeopleGroup,
  faHandshake,
  faPiggyBank,
  faUserGear,
  faChartLine,
  faClockRotateLeft,
  faFileInvoiceDollar,
  faChartPie,
} from "@fortawesome/free-solid-svg-icons";

type MenuItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  children?: MenuItem[];
};

const menuItems: MenuItem[] = [
  {
    id: "trading",
    label: "Trading",
    icon: <FontAwesomeIcon icon={faHandshake} className="h-6 w-6" />,
    children: [
      {
        id: "seller",
        label: "Seller",
        href: "#",
        icon: <FontAwesomeIcon icon={faBuilding} className="h-4 w-4" />,
      },
      {
        id: "buyer",
        label: "Buyer",
        href: "#",
        icon: <FontAwesomeIcon icon={faPeopleGroup} className="h-4 w-4" />,
      },
      {
        id: "investor",
        label: "Investor",
        href: "#",
        icon: <FontAwesomeIcon icon={faMoneyBillTrendUp} className="h-4 w-4" />,
      },
    ],
  },
  {
    id: "financing",
    label: "Financing",
    icon: <FontAwesomeIcon icon={faPiggyBank} className="h-6 w-6" />,
    children: [
      {
        id: "collateral",
        label: "실물 담보",
        href: "#",
        icon: <FontAwesomeIcon icon={faBoxesPacking} className="h-4 w-4" />,
      },
      {
        id: "crowdfund",
        label: "Crowd Fund",
        href: "#",
        icon: <FontAwesomeIcon icon={faDollarSign} className="h-4 w-4" />,
      },
    ],
  },
  {
    id: "logistics",
    label: "Logistics",
    icon: <FontAwesomeIcon icon={faBoxesPacking} className="h-6 w-6" />,
    href: "#",
  },
  {
    id: "myaccount",
    label: "My Account",
    icon: <FontAwesomeIcon icon={faUserGear} className="h-6 w-6" />,
    children: [
      {
        id: "account-status",
        label: "Account 현황",
        href: "#",
        icon: <FontAwesomeIcon icon={faUser} className="h-4 w-4" />,
      },
      {
        id: "account-trading",
        label: "Trading",
        icon: <FontAwesomeIcon icon={faHandshake} className="h-4 w-4" />,
        children: [
          {
            id: "account-seller",
            label: "Seller",
            href: "#",
            icon: <FontAwesomeIcon icon={faBuilding} className="h-4 w-4" />,
          },
          {
            id: "account-buyer",
            label: "Buyer",
            href: "#",
            icon: <FontAwesomeIcon icon={faPeopleGroup} className="h-4 w-4" />,
          },
          {
            id: "account-investor",
            label: "Investor",
            href: "#",
            icon: (
              <FontAwesomeIcon icon={faMoneyBillTrendUp} className="h-4 w-4" />
            ),
          },
        ],
      },
      {
        id: "account-report",
        label: "Report",
        href: "#",
        icon: (
          <FontAwesomeIcon icon={faFileInvoiceDollar} className="h-4 w-4" />
        ),
      },
      {
        id: "account-history",
        label: "History Data",
        icon: <FontAwesomeIcon icon={faClockRotateLeft} className="h-4 w-4" />,
        children: [
          {
            id: "account-transaction",
            label: "거래실적",
            href: "#",
            icon: <FontAwesomeIcon icon={faChartLine} className="h-4 w-4" />,
          },
          {
            id: "account-profit",
            label: "손익 분석",
            href: "#",
            icon: <FontAwesomeIcon icon={faChartPie} className="h-4 w-4" />,
          },
        ],
      },
    ],
  },
];

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ collapsed, toggleSidebar }: SidebarProps) => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    trading: true,
  });

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderMenuItem = (item: MenuItem, depth = 0) => {
    const isExpanded = expandedItems[item.id];
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.id} className="mb-1">
        <div
          className={`flex items-center ${
            collapsed ? "justify-center" : "justify-between"
          } py-2 rounded-md cursor-pointer transition-all
                    ${
                      depth === 0
                        ? "text-gray-800 dark:text-gray-200"
                        : "text-gray-600 dark:text-gray-400"
                    }
                    hover:bg-gray-100 dark:hover:bg-gray-800
                    ${collapsed ? "px-1" : "px-4"}`}
          style={{
            paddingLeft: collapsed
              ? "4px"
              : `${depth > 0 ? depth * 12 + 16 : 16}px`,
          }}
          onClick={() => (hasChildren ? toggleExpand(item.id) : null)}
        >
          <div className="flex items-center">
            {item.icon && (
              <span
                className={`${
                  collapsed
                    ? "mx-auto w-10 flex justify-center items-center"
                    : "mr-3 w-7"
                } text-center flex justify-center`}
              >
                {item.icon}
              </span>
            )}
            <span
              className={`${
                collapsed ? "opacity-0 absolute" : "opacity-100"
              } transition-opacity`}
            >
              {item.label}
            </span>
          </div>
          {hasChildren && !collapsed && (
            <span className="text-gray-500">
              <FontAwesomeIcon
                icon={isExpanded ? faChevronUp : faChevronDown}
                className="h-4 w-4"
              />
            </span>
          )}
        </div>

        {hasChildren && isExpanded && !collapsed && (
          <div className="ml-2">
            {item.children!.map((child) => renderMenuItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside
      className={`h-[calc(100vh-64px)] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      } flex flex-col fixed top-16 left-0 overflow-y-auto overflow-x-hidden`}
    >
      <div className="flex-1 py-4">
        {menuItems.map((item) => renderMenuItem(item))}
      </div>

      <div className="mt-auto py-4 border-t border-gray-200 dark:border-gray-800">
        <div
          className={`flex items-center ${
            collapsed ? "justify-center" : "justify-between"
          } py-2 px-2 rounded-md cursor-pointer transition-all
                  text-gray-800 dark:text-gray-200
                  hover:bg-gray-100 dark:hover:bg-gray-800`}
          onClick={toggleSidebar}
        >
          <div className="flex items-center w-full">
            <span
              className={`${
                collapsed
                  ? "mx-auto w-10 flex justify-center items-center"
                  : "mr-3 w-7"
              } text-center flex justify-center`}
            >
              <FontAwesomeIcon
                icon={collapsed ? faChevronRight : faChevronLeft}
                className="h-6 w-6"
              />
            </span>
            <span
              className={`${
                collapsed ? "opacity-0 absolute" : "opacity-100"
              } transition-opacity`}
            >
              {collapsed ? "메뉴 펼치기" : "메뉴 접기"}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
