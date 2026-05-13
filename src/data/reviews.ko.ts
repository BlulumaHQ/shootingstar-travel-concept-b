// Korean reviews — machine-translated placeholder copy.
import g1 from "@/assets/guest-1.jpg";
import g2 from "@/assets/guest-2.jpg";
import g3 from "@/assets/guest-3.jpg";
import tourBanff from "@/assets/tour-banff.jpg";
import tourRockies from "@/assets/tour-rockies.jpg";
import tourAurora from "@/assets/tour-aurora.jpg";
import tourIcefield from "@/assets/tour-icefield.jpg";
import tourVancouver from "@/assets/tour-vancouver.jpg";
import tourVictoria from "@/assets/tour-victoria.jpg";
import tourToronto from "@/assets/tour-toronto.jpg";
import destJasper from "@/assets/dest-jasper.jpg";
import destWhistler from "@/assets/dest-whistler.jpg";
import destYukon from "@/assets/dest-yukon.jpg";
import type { Review } from "@/components/site/ReviewCard";

export const reviews: Review[] = [
  {
    avatar: g1, name: "메이린 첸", country: "타이베이, TW", tour: "로키 마운틴 클래식", rating: 5,
    text: "밴프에 발을 디딘 순간, 풍경에 안긴다는 것이 어떤 느낌인지 알게 되었습니다. 가이드는 세심했고 일정은 결코 서두르지 않았어요.",
    photos: [tourBanff, tourRockies, destJasper, tourIcefield, destWhistler],
  },
  {
    avatar: g2, name: "박지훈", country: "서울, KR", tour: "오로라 체이스 여정", rating: 5,
    text: "한국어 가이드가 따뜻하고 세심해서 오랜 친구와 여행하는 기분이었습니다. 오로라가 나타난 밤, 우리는 모두 말을 잃었어요.",
    photos: [tourAurora, destYukon, tourRockies, destJasper, tourBanff, tourIcefield],
  },
  {
    avatar: g3, name: "왕 가족", country: "홍콩", tour: "로키 마운틴 클래식", rating: 5,
    text: "가족이 함께한 최고의 추억 — 아이들은 벌써 내년에 또 가고 싶어합니다. 아이스필드 파크웨이의 새하얀 풍경이 마음을 차분하게 했어요.",
    photos: [tourRockies, tourIcefield, tourBanff, destJasper, destWhistler],
  },
  {
    avatar: g1, name: "레이첼 L.", country: "밴쿠버, CA", tour: "밴프 1일 투어", rating: 5,
    text: "짧은 하루였지만 상징적인 호수들을 모두 담았습니다. 동선이 매끄럽고 이야기가 또렷해 친구들에게 바로 공유했어요.",
    photos: [tourBanff, tourRockies, destJasper, tourIcefield, tourVictoria],
  },
  {
    avatar: g2, name: "샤오로우", country: "타이중, TW", tour: "오로라 체이스 여정", rating: 5,
    text: "−25°C에서 기다리다가 마침내 오로라를 본 순간 모든 시간이 가치 있게 느껴졌어요. 팀이 멋진 사진도 많이 찍어주었습니다.",
    photos: [tourAurora, destYukon, tourRockies, tourBanff, destJasper, destWhistler],
  },
  {
    avatar: g3, name: "다니엘 K.", country: "토론토, CA", tour: "아이스필드 파크웨이", rating: 4,
    text: "스카이워크는 정말 가볼 만했고 가이드도 인내심이 있었어요. 다음에는 점심 선택지가 더 다양했으면 좋겠습니다.",
    photos: [tourIcefield, tourRockies, tourBanff, destJasper, destWhistler],
  },
  {
    avatar: g1, name: "유키 S.", country: "오사카, JP", tour: "빅토리아 가든 여정", rating: 5,
    text: "부차트 가든은 정말 동화 속으로 들어간 듯했어요. 페리에서의 바닷바람이 여행에서 가장 부드러운 기억이 되었습니다.",
    photos: [tourVictoria, tourVancouver, tourBanff, destWhistler, tourRockies],
  },
  {
    avatar: g2, name: "앤디 & 조이", country: "싱가포르", tour: "밴쿠버 시티 디프 다이브", rating: 5,
    text: "짧은 산책만 계획했는데 훨씬 많은 것을 얻었습니다. 가이드가 추천한 카페가 아직도 생각나요.",
    photos: [tourVancouver, tourToronto, tourVictoria, destWhistler, tourBanff, destJasper],
  },
  {
    avatar: g3, name: "김혜진", country: "부산, KR", tour: "프라이빗 맞춤 투어", rating: 5,
    text: "삼대를 위한 맞춤 여행 — 할머니까지 내내 미소를 지으셨어요. 한 푼도 아깝지 않습니다.",
    photos: [tourRockies, tourBanff, destJasper, tourIcefield, tourVictoria, destWhistler],
  },
];
