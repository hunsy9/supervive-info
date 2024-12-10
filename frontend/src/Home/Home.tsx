import { BasicLayout } from "@/layouts/BasicLayout";
import { Suspense } from "react";
import { HomeTable } from "./HomeTable";

function Exp() {
  return (
    <div className="max-w-6xl mb-[30px]">
      <h1 className="text-2xl font-bold text-gray-900">헌터 티어 및 분석</h1>
      <p className="text-gray-700 mt-4 leading-relaxed">
        헌터 페이지에서는 영웅 통계에 대한 종합적인 개요를 제공합니다.
      </p>
    </div>
  );
}

export function Home() {
  return (
    <BasicLayout>
      <Exp />
      <Suspense fallback={<div>로딩중</div>}>
        <HomeTable />
      </Suspense>
    </BasicLayout>
  );
}
