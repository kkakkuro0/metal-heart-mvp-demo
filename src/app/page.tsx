import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faBoxes,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-[60vh] w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-gray-900/70 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1605699139319-8e9faafb2a02?q=80&w=2070&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-white text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Metal Heart 비철금속 거래소
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl">
            안전하고 투명한 비철금속 거래를 위한 플랫폼
          </p>
          <Link
            href="/exchange"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-all"
          >
            거래소 바로가기
          </Link>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Metal Heart의 주요 서비스
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center mb-6 mx-auto">
                <FontAwesomeIcon icon={faBolt} className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-3 text-gray-900 dark:text-white">
                실시간 금속 거래
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                금속 매매를 위한 안전하고 투명한 거래 플랫폼을 제공합니다.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center mb-6 mx-auto">
                <FontAwesomeIcon icon={faBoxes} className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-3 text-gray-900 dark:text-white">
                물류 관리
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                창고, 운송, 통관 등 완벽한 물류 서비스를 제공합니다.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center mb-6 mx-auto">
                <FontAwesomeIcon icon={faMoneyBillWave} className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-3 text-gray-900 dark:text-white">
                금융 서비스
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                실물 담보 및 크라우드 펀딩을 통한 다양한 금융 옵션을 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Metal Heart와 함께 비철금속 거래를 시작하세요
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            안전하고 투명한 거래, 효율적인 물류 관리, 다양한 금융 옵션을
            경험해보세요.
          </p>
          <Link
            href="/exchange"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-all"
          >
            시작하기
          </Link>
        </div>
      </section>
    </main>
  );
}
