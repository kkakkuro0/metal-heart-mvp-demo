"use client";

const TailwindTest = () => {
  return (
    <div>
      <div className="p-4 m-4 rounded-lg shadow-md bg-blue-100 dark:bg-blue-900">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-300">
          TailwindCSS 테스트
        </h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          이 텍스트가 스타일링되어 보인다면 TailwindCSS가 올바르게 작동하는
          것입니다.
        </p>
        <div className="mt-4 flex space-x-2">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            버튼 1
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            버튼 2
          </button>
        </div>
      </div>

      {/* 명시적인 Tailwind 클래스 테스트 */}
      <div className="grid grid-cols-3 gap-4 m-4">
        <div className="bg-red-500 p-4 text-white text-center">Red Box</div>
        <div className="bg-green-500 p-4 text-white text-center">Green Box</div>
        <div className="bg-blue-500 p-4 text-white text-center">Blue Box</div>
      </div>

      {/* 추가 Tailwind 유틸리티 테스트 */}
      <div className="flex flex-col md:flex-row justify-between m-4 p-4 border border-gray-200 rounded-lg">
        <div className="flex-1 p-2">
          <h3 className="font-bold underline decoration-sky-500">항목 1</h3>
          <p className="text-sm italic opacity-75">
            기본 텍스트 스타일링 테스트
          </p>
        </div>
        <div className="flex-1 p-2">
          <div className="h-12 w-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mx-auto"></div>
        </div>
        <div className="flex-1 p-2">
          <button className="transition duration-300 ease-in-out transform hover:scale-110 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
            애니메이션 버튼
          </button>
        </div>
      </div>
    </div>
  );
};

export default TailwindTest;
