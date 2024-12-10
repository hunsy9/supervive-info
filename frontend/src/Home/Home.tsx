import { BasicLayout } from "@/layouts/BasicLayout";
import { Suspense } from "react";
import { HomeTable } from "./HomeTable";

function Exp() {
  return (
    <div className="max-w-6xl mb-[30px]">
      <h1 className="text-2xl font-bold text-gray-900">헌터 티어 및 분석</h1>
      <p className="text-gray-700 mt-4 leading-relaxed">
        헌터 페이지에서는 영웅 통계에 대한 종합적인 개요를 제공합니다.
        사용자들은 다양한 영웅 성능 지표를 분석하고 비교할 수 있어요. 탑 1 비율,
        픽 비율, 평균 처치 수 등 다양한 티어별로 통계를 정렬하고 필터링하여 여러
        게임 모드에서의 영웅 효과를 파악할 수 있어요. 이 상세한 통계 분석을 통해
        플레이어들은 영웅 선택과 전략에 대해 정보에 기반한 결정을 내릴 수 있어
        게임 경험을 향상시킬 수 있어요.
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
