// Korean tour data — machine-translated placeholder copy. Replace with final Korean copy when ready.
import tourBanff from "@/assets/tour-banff.webp";
import tourRockies from "@/assets/tour-rockies.webp";
import tourAurora from "@/assets/tour-aurora.webp";
import tourVancouver from "@/assets/tour-vancouver.webp";
import tourVictoria from "@/assets/tour-victoria.webp";
import tourPrivate from "@/assets/tour-private.webp";
import tourIcefield from "@/assets/tour-icefield.webp";
import tourToronto from "@/assets/tour-toronto.jpg";
import type { Tour } from "./tours";

export const tours: Tour[] = [
  {
    slug: "rocky-mountain-classic",
    img: tourRockies,
    gallery: [tourRockies, tourBanff, tourIcefield],
    title: "로키 마운틴 클래식 — 5일 4박",
    desc: "밴프 · 레이크 루이즈 · 아이스필드 파크웨이",
    intro: "캘거리에서 출발해 캐나다에서 가장 웅장한 산맥 깊숙이 들어가 알프스의 일출과 별빛이 가득한 밤을 모두 만나보세요.",
    duration: "5일 4박",
    group: "소그룹 8–14명",
    language: "영어 / 중국어 / 한국어",
    price: "CAD $1,280부터",
    itinerary: [
      { stop: "1일차", title: "캘거리 → 밴프", body: "오후 밴프 도착, 설퍼 마운틴 곤돌라에서 풍경 감상, 온천 마을에서 저녁 식사." },
      { stop: "2일차", title: "모레인 호수 & 레이크 루이즈", body: "아침 햇살 속 텐 픽스 밸리, 오후엔 레이크 루이즈에서 여유로운 시간." },
      { stop: "3일차", title: "아이스필드 파크웨이", body: "보우 호수와 크로풋 빙하를 지나 컬럼비아 아이스필드 스노코치와 스카이워크." },
      { stop: "4일차", title: "재스퍼 국립공원", body: "말린 호수에서 스피릿 아일랜드까지 크루즈, 저녁 밴프로 돌아옵니다." },
      { stop: "5일차", title: "캘거리 귀환", body: "캔모어를 들러 오후 공항에서 여정을 마무리합니다." },
    ],
    included: ["영어 / 중국어 / 한국어 전문 가이드", "3성급 이상 호텔 4박", "조식 매일 + 4식", "전 일정 교통 및 입장료", "여행자 보험"],
    bring: ["따뜻한 재킷 (여름에도)", "편안한 미끄럼 방지 워킹화", "재사용 물병과 자외선 차단제", "개인 약품", "카메라"],
    notes: ["산악 날씨는 변덕스러우니 유연한 일정을 부탁드립니다.", "출발 30일 전까지 전액 환불 가능.", "6세 미만 아동은 적합하지 않습니다."],
    faq: [
      { q: "항공편이 포함되나요?", a: "포함되지 않습니다. 캘거리(YYC) 입국을 권장하며, 공항 픽업을 안내해 드릴 수 있습니다." },
      { q: "비자가 필요한가요?", a: "여권 국적에 따라 eTA 또는 캐나다 비자를 신청해 주세요." },
      { q: "1인실 가능한가요?", a: "추가 요금으로 1인실 업그레이드가 가능합니다 — 예약 시 요청해 주세요." },
    ],
  },
  {
    slug: "banff-day",
    img: tourBanff,
    gallery: [tourBanff, tourRockies],
    title: "밴프 국립공원 — 1일 투어",
    desc: "모레인 호수 · 레이크 루이즈 · 보우 폭포",
    intro: "밴프에서 출발하는 큐레이티드 1일 여정으로 로키의 세 호수를 여유롭게 둘러봅니다.",
    duration: "1일 (약 9시간)",
    group: "소그룹 6–12명",
    language: "영어 / 중국어",
    price: "CAD $179부터",
    itinerary: [
      { stop: "08:00", title: "밴프 출발", body: "지정 장소 집합, 가이드 브리핑." },
      { stop: "09:30", title: "모레인 호수", body: "록파일 전망대에 올라 텐 픽스 밸리를 감상합니다." },
      { stop: "12:00", title: "레이크 루이즈 점심", body: "호숫가 자유시간 및 점심 (개별 부담)." },
      { stop: "15:00", title: "보우 폭포", body: "폭포까지 짧은 산책과 밴프 스프링스 호텔 전망." },
      { stop: "17:30", title: "밴프 귀환", body: "일정 종료." },
    ],
    included: ["전문 가이드", "전 구간 교통", "국립공원 입장료"],
    bring: ["점심 자비 부담", "보온 의류", "편한 워킹화"],
    notes: ["여름철 모레인 호수 진입이 제한될 수 있어 순서가 변경될 수 있습니다."],
    faq: [
      { q: "아이를 데려갈 수 있나요?", a: "네, 4세 이상 적합합니다." },
      { q: "점심이 포함되나요?", a: "포함되지 않습니다. 레이크 루이즈에 식당이 여러 곳 있습니다." },
    ],
  },
  {
    slug: "aurora-chase",
    img: tourAurora,
    gallery: [tourAurora],
    title: "오로라 체이스 여정",
    desc: "옐로나이프 · 오로라 캐빈 · 사진 가이드",
    intro: "옐로나이프 오로라 벨트 아래에서 초록빛이 부드럽게 내려오는 순간을 기다립니다.",
    duration: "5일 4박",
    group: "소그룹 6–10명",
    language: "영어 / 중국어",
    price: "CAD $229부터 (체이스 1박 기준)",
    itinerary: [
      { stop: "1일차", title: "옐로나이프 도착", body: "공항 픽업, 호텔 체크인, 저녁 오리엔테이션." },
      { stop: "2–4일차", title: "오로라 체이스", body: "22시 오로라 캐빈으로 출발, 약 02시 귀환." },
      { stop: "5일차", title: "출발", body: "공항 드롭오프; 다음을 기약합니다." },
    ],
    included: ["오로라 캐빈 이용", "방한 의류 대여", "따뜻한 음료와 간식", "사진 가이드"],
    bring: ["여권", "개인 보온 내의", "예비 카메라 배터리"],
    notes: ["오로라는 자연 현상이며 관측이 보장되지 않습니다."],
    faq: [
      { q: "최적의 계절은?", a: "11월부터 4월까지가 황금기입니다." },
      { q: "카메라가 필요한가요?", a: "권장합니다. 가이드가 설정을 도와드립니다." },
    ],
  },
  {
    slug: "vancouver-city",
    img: tourToronto,
    gallery: [tourToronto, tourVancouver],
    title: "밴쿠버 시티 — 깊이 있는 투어",
    desc: "도시 하이라이트 · 깊이 있는 체험",
    intro: "현지 가이드가 가장 좋은 이야기와 함께 밴쿠버 골목골목을 안내합니다.",
    duration: "1일",
    group: "소그룹 4–10명",
    language: "영어 / 중국어 / 한국어",
    price: "CAD $129부터",
    itinerary: [
      { stop: "09:00", title: "스탠리 파크", body: "씨월 라이드와 토템 폴 정차." },
      { stop: "11:30", title: "그랜빌 아일랜드", body: "퍼블릭 마켓과 공예가 상점들." },
      { stop: "14:00", title: "개스타운", body: "스팀 시계와 자갈길." },
      { stop: "16:00", title: "캐나다 플레이스", body: "워터프론트 전망과 도심 스카이라인." },
    ],
    included: ["전문 가이드", "전 구간 교통", "그랜빌 아일랜드 페리"],
    bring: ["편한 신발", "비옷 (밴쿠버는 비가 잦습니다)", "카메라"],
    notes: ["점심은 자비 부담; 가이드가 현지 맛집을 추천드립니다."],
    faq: [{ q: "출발지는 어디인가요?", a: "다운타운 밴쿠버의 버라드 역입니다." }],
  },
  {
    slug: "victoria-garden",
    img: tourVictoria,
    gallery: [tourVictoria],
    title: "빅토리아 가든 여정",
    desc: "페리 + 부차트 가든 + 클래식 다운타운",
    intro: "영국풍 매력과 가든 속 오후 — 가장 여유로운 섬 나들이.",
    duration: "1일",
    group: "소그룹 6–14명",
    language: "영어 / 중국어",
    price: "CAD $219부터",
    itinerary: [
      { stop: "07:00", title: "밴쿠버 집합", body: "차왓슨 페리 터미널까지 이동." },
      { stop: "09:00", title: "BC 페리", body: "해협을 가로지르는 풍경." },
      { stop: "11:00", title: "부차트 가든", body: "선큰 가든 · 로즈 가든 · 일본 정원." },
      { stop: "14:30", title: "다운타운 빅토리아", body: "주의회 의사당과 이너 하버 산책." },
      { stop: "20:00", title: "밴쿠버 귀환", body: "여정 종료." },
    ],
    included: ["페리 티켓", "부차트 가든 입장료", "전 구간 교통"],
    bring: ["가벼운 워킹화", "카메라", "자외선 차단제"],
    notes: ["개화 시즌은 5–9월이며 월별로 풍경이 다릅니다."],
    faq: [{ q: "혼자 예약 가능한가요?", a: "가능합니다 — 출발 최소 2명." }],
  },
  {
    slug: "private-tour",
    img: tourPrivate,
    gallery: [tourPrivate],
    title: "프라이빗 맞춤 투어",
    desc: "당신과 가족, 친구를 위해",
    intro: "유연한 날짜, 유연한 코스, 유연한 페이스 — 단 하나뿐인 여행 시나리오를 함께 그려드립니다.",
    duration: "맞춤 (1–14일)",
    group: "2–20명",
    language: "영어 / 중국어 / 한국어",
    price: "견적 요청",
    itinerary: [
      { stop: "1단계", title: "디스커버리 콜", body: "인원, 일정, 관심사, 예산을 알려주세요." },
      { stop: "2단계", title: "일정 제안", body: "48시간 이내 맞춤 코스와 견적을 보내드립니다." },
      { stop: "3단계", title: "확정 & 보증금", body: "세부 사항 확정 후 보증금 결제." },
      { stop: "4단계", title: "출발!", body: "전담 가이드가 동행합니다." },
    ],
    included: ["맞춤 일정 설계", "전용 차량", "전담 가이드"],
    bring: ["여행에 따라 다름"],
    notes: ["최소 한 달 전 예약을 권장합니다."],
    faq: [{ q: "최소 인원은?", a: "단 2명." }],
  },
];

export function getTour(slug: string) {
  return tours.find((t) => t.slug === slug);
}
