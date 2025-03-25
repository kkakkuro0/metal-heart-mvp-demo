"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldAlt,
  faHandshake,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        {mounted && (
          <div className="absolute inset-0">
            <Image
              src={
                resolvedTheme === "dark"
                  ? "/imgs/mh_dark.png"
                  : "/imgs/mh_light.png"
              }
              alt="Metal Heart 배경"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 " />
          </div>
        )}
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <div className="max-w-xl animate-fade-in-right">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#151515] dark:text-white">
                <span className="block mb-2">비철금속 거래의 미래,</span>
                <span className="block text-[#324793] dark:text-[#7382b6] drop-shadow-md">
                  NME 플랫폼
                </span>
              </h1>
              <p className="mt-4 mb-8 text-lg text-[#545454] dark:text-white font-light">
                &ldquo;안전하고 투명한 거래, 실시간 시장 분석&rdquo;
              </p>
              <Link
                href="/exchange"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 inline-flex items-center"
              >
                거래소 바로가기
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* NME 소개 섹션 */}
      <section className="py-40 bg-gradient-to-br from-indigo-50 via-blue-50 to-white dark:from-gray-900 dark:via-indigo-950 dark:to-gray-800 relative">
        <div className="absolute inset-0 bg-pattern opacity-5 dark:opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900 dark:text-white relative inline-block">
              <span>
                <span className="relative">
                  <span className="text-[#5278FC] font-extrabold text-5xl md:text-5xl">
                    N
                  </span>
                  <span className="text-4xl">onferrous</span>
                </span>{" "}
                <span className="relative">
                  <span className="text-[#8A65BA] font-extrabold text-5xl md:text-5xl">
                    M
                  </span>
                  <span className="text-4xl">etals</span>
                </span>{" "}
                <span className="relative">
                  <span className="text-[#AA5B96] font-extrabold text-5xl md:text-5xl">
                    E
                  </span>
                  <span className="text-4xl">xchange, </span>
                  <span className="text-[#E6474E] text-5xl">NME</span>
                </span>
              </span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-red-500 transform translate-y-2"></span>
            </h2>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10 leading-relaxed">
              NME는 비철금속 거래에 특화된 플랫폼으로, 안전하고 효율적인 거래
              환경을 제공합니다. 국내외 비철금속 시장의 연결과 투명한 거래
              시스템을 통해 새로운 가치를 창출합니다.
            </p>
            <div className="w-24 h-1 rounded-full bg-gradient-to-r from-primary-500 to-red-500 mx-auto"></div>
          </div>
        </div>
      </section>

      {/* 리스크 관리 모델 섹션 */}
      <section className="py-24 px-4 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white to-transparent dark:from-gray-800 dark:to-transparent opacity-80"></div>
        <div className="absolute bottom-0 right-0 w-full h-40 bg-gradient-to-t from-white to-transparent dark:from-gray-800 dark:to-transparent opacity-80"></div>
        <div className="container mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white animate-fade-in-up">
            리스크 관리 Model
            <span className="text-primary-600 dark:text-primary-400 ml-2">
              (Risk Management)
            </span>
          </h2>
          <p
            className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-center mb-16 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            NME 플랫폼은 안전한 거래를 위한 종합적인 리스크 관리 시스템을
            제공합니다.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* 카드 1: 검증 시스템 강화 */}
            <div
              className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 text-white rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-lg">
                <FontAwesomeIcon icon={faShieldAlt} className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white">
                검증 시스템 강화
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                신용평가 시스템을 통한 이용자 및 거래 물품의 검증 시스템 강화
              </p>
            </div>

            {/* 카드 2: 리스크 경감 */}
            <div
              className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 animate-fade-in-up"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-lg">
                <FontAwesomeIcon icon={faHandshake} className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white">
                리스크 경감
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                ESCROW 계좌와 합의 창고를 통한 담보 관리 및 신용도 강화를 통한
                리스크 경감
              </p>
            </div>

            {/* 카드 3: 모니터링 시스템 강화 */}
            <div
              className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 animate-fade-in-up"
              style={{ animationDelay: "0.7s" }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-lg">
                <FontAwesomeIcon icon={faChartLine} className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white">
                모니터링 시스템 강화
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                계약 체결부터 물품 물류까지 실시간 추적을 위한 모니터링 시스템
                강화
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-gray-900 to-gray-800 dark:from-black dark:to-gray-900 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-white animate-fade-in-up">
            Metal Heart와 함께
            <span className="block mt-2 text-primary-400">
              비철금속 거래를 시작하세요
            </span>
          </h2>
          <p
            className="text-xl mb-12 max-w-2xl mx-auto text-gray-300 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            안전하고 투명한 거래, 효율적인 물류 관리, 다양한 금융 옵션을
            경험해보세요.
          </p>
          <Link
            href="/exchange"
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-5 px-12 rounded-full shadow-lg transition-all duration-300 hover:scale-105 inline-flex items-center text-xl animate-fade-in-up animate-scale"
            style={{ animationDelay: "0.4s" }}
          >
            시작하기
            <svg
              className="w-6 h-6 ml-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
