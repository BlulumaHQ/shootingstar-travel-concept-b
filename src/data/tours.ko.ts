import tourBanff from "@/assets/tour-banff.webp";
import bgLake from "@/assets/bg-lake-louise.webp";
import banffTwoLakeFeature from "@/assets/banff-two-lake-feature.jpg";
import { banff3Hero, banff3Gallery } from "./banff3-gallery";
import tourRockies from "@/assets/tour-rockies.webp";
import tourVancouver from "@/assets/tour-vancouver.webp";
import { seattleHero, seattleGallery } from "./seattle-gallery";
import { seattle2Hero, seattle2Gallery } from "./seattle2-gallery";
import { victoriaHero, victoriaGallery } from "./victoria-gallery";
import { kelownaHero, kelownaGallery } from "./kelowna-gallery";
import { westernUsaHero, westernUsaGallery } from "./western-usa-gallery";
import { vegasCanyonHero, vegasCanyonGallery } from "./vegas-canyon-gallery";
import { la3Hero, la3Gallery } from "./la3-gallery";
import { oregonHero, oregonGallery } from "./oregon-gallery";

import tourIcefield from "@/assets/tour-icefield.webp";
import tourToronto from "@/assets/tour-toronto.jpg";
import destWhistler from "@/assets/dest-whistler.webp";
import { whistlerHero, whistlerGallery } from "./whistler-gallery";
import type { Tour } from "./tours";

const LANGUAGE_NOTE =
  "가이드 언어는 투어 구성에 따라 배정됩니다. 게스트가 선호하시는 언어(영어, 중국어, 한국어)를 최대한 반영해 드리지만, 단일 언어 투어를 보장할 수는 없습니다.";
const ROOM_NOTE =
  "여러 명이 함께 여행하시면 객실 비용을 분담할 수 있어 1인당 가격이 더욱 합리적입니다.";

export const tours: Tour[] = [
  {
    slug: "seattle-1-day",
    img: seattleHero,
    gallery: seattleGallery,
    title: "시애틀 1일 투어 | 에메랄드 시티 클래식 하루 여행",
    desc: "도시의 푸르른 자연 속에서 세계를 이끄는 테크와 문화의 영혼을 만나보세요.",
    intro:
      "사계절 푸르른 숲으로 둘러싸인 시애틀은 \"에메랄드 시티(Emerald City)\"라는 별칭으로 잘 알려져 있습니다. 신선한 자연과 첨단 기술, 100년 역사의 인문이 완벽하게 어우러진 도시입니다. 정성껏 설계된 하이라이트 일정으로 상징적인 스카이라인, 활기 넘치는 100년 전통의 공공 시장, 마법 같은 캠퍼스를 누비며, 전문 가이드와 전용 차량으로 교통과 주차 걱정 없이 시애틀의 매력을 단 하루에 깊이 있게 만끽하실 수 있습니다.",
    duration: "1일",
    language: LANGUAGE_NOTE,
    price: "$140 CAD부터 / 1인",
    gratuity: "권장 가이드 팁: $20 USD / 1인",
    itinerary: [
      { stop: "1일차", title: "케리 파크 (Kerry Park)", body: "엽서 같은 시애틀 스카이라인을 담아보세요. 스페이스 니들, 퓨젯 사운드, 멀리 레이니어 산까지 한 프레임에 들어오는 시애틀 최고의 뷰포인트입니다." },
      { stop: "1일차", title: "아마존 스피어 (Amazon Spheres)", body: "테크 자이언트의 도심 속 숲. 세 개의 거대한 유리 돔으로 이루어진 실내 우림은 미래 오피스의 새로운 정의를 보여줍니다. (내부는 직원 전용이며, 외부 최고의 포토 스폿에서 정차합니다.)" },
      { stop: "1일차", title: "파이크 플레이스 마켓 (Pike Place Market)", body: "미국에서 가장 오래된 공공 시장 중 하나에서 활기찬 로컬 문화를 만나보세요. 1971년에 문을 연 세계 최초의 스타벅스 매장과 유명한 \"검 월(Gum Wall)\"도 함께 둘러봅니다." },
      { stop: "1일차", title: "스페이스 니들 & 치훌리 가든", body: "[자유 자비 옵션] 360도 전망대에서 퓨젯 사운드의 장엄한 풍경을 내려다보거나, 유리 거장 데일 치훌리의 환상적인 빛과 색의 세계를 자유롭게 선택하실 수 있습니다." },
      { stop: "1일차", title: "워싱턴 대학교 (University of Washington)", body: "\"미국에서 가장 아름다운 캠퍼스\"로 손꼽히는 워싱턴 대학교를 산책하며, 해리포터의 호그와트를 떠올리게 하는 Suzzallo 도서관의 웅장한 고딕 양식을 감상합니다." },
    ],
    included: [
      "편안한 전용 차량",
      "전문 운전기사·가이드",
      "일정 내 주차비",
    ],
    notIncluded: [
      "5% 세금",
      "식사 및 개인 경비",
      "옵션 입장권",
      "권장 가이드 팁",
    ],
    optional: [
      "스페이스 니들 입장권",
      "치훌리 가든 앤 글래스 입장권",
    ],
    notes: [
      "시애틀 날씨는 변화가 많습니다. 레이어드 의류, 방풍·방수 자켓, 편한 워킹화를 권장합니다.",
      "입장권 사전 예약: 스페이스 니들과 치훌리 박물관은 현장 대기가 길 수 있습니다. 예약 시 알려 주시면 미리 입장권을 준비해 드립니다.",
      "캠퍼스 방문 유연성: Suzzallo 도서관이 학교 행사·시험 기간·공휴일로 임시 폐쇄될 경우, 가이드가 캠퍼스 내 다른 고딕 양식 건축물을 깊이 있게 안내해 드립니다.",
    ],
    bookingCta: "시애틀 1일 투어 예약하기",
  },
  {
    slug: "seattle-2-day",
    img: seattle2Hero,
    gallery: seattle2Gallery,
    title: "시애틀 2일 투어 | 1박 2일 심층 탐방 & 쇼핑 여행",
    desc: "여유로운 페이스로 시애틀의 랜드마크, 해산물 만찬, 프리미엄 쇼핑까지 한 번에 누리는 여행.",
    intro:
      "하루로는 부족한 시애틀, 1박 2일의 완벽한 여행을 선물해 보세요! 보잉과 테크의 발원지를 깊이 있게 탐방합니다. 크랩 팟의 시그니처 해산물 만찬, 압도적인 항공 박물관, 빈티지 인더스트리얼 분위기의 가스 웍스 파크, 그리고 인기 만점의 Trader Joe's와 시애틀 프리미엄 아울렛 쇼핑까지! 전용 차량과 1박 숙박이 포함되어 국경 운전과 무거운 짐의 부담 없이 즐기실 수 있습니다.",
    duration: "1박 2일",
    language: LANGUAGE_NOTE,
    price: "$370 CAD부터 / 1인",
    gratuity: "권장 가이드 팁: $40 USD / 1인 (1일 $20 USD × 2일)",
    itinerary: [
      { stop: "1일차", title: "케리 파크 (Kerry Park)", body: "최고의 뷰포인트! 스페이스 니들과 레이니어 산이 완벽하게 어우러지는 스카이라인을 한눈에 담습니다." },
      { stop: "1일차", title: "파이크 플레이스 마켓 (Pike Place Public Market)", body: "100년 전통의 공공 시장과 생선 던지기 퍼포먼스, 세계 최초의 스타벅스 매장을 만나보세요." },
      { stop: "1일차", title: "더 크랩 팟 (The Crab Pot) 시그니처 해산물", body: "시애틀 대표 해산물 레스토랑에서 게와 해산물을 통째로 테이블에 쏟아 손으로 먹는 독특한 경험! (특별 식사 정차로, 식사 비용은 게스트 부담입니다.)" },
      { stop: "1일차", title: "항공 박물관 (Museum of Flight)", body: "[자유 자비 옵션] 보잉의 본고장, 세계 최대 규모의 독립 항공·우주 박물관에서 퇴역한 에어포스 원과 콩코드 내부까지 둘러보실 수 있습니다." },
      { stop: "1일차", title: "트레이더 조 (Trader Joe's)", body: "북미 최고 인기 슈퍼마켓에서 한정판 에코백, 단독 스낵, 시즈닝까지 알차게 쇼핑하실 수 있습니다." },
      { stop: "2일차", title: "스페이스 니들 / 치훌리 박물관", body: "[자유 자비 옵션] 시애틀의 두 랜드마크 중 자유롭게 선택해 방문하실 수 있습니다." },
      { stop: "2일차", title: "가스 웍스 파크 (Gas Works Park)", body: "옛 가스 공장을 그대로 살린 인더스트리얼 감성의 공원! 유니언 호수 너머의 다운타운 스카이라인이 절경입니다." },
      { stop: "2일차", title: "워싱턴 대학교", body: "미국에서 가장 아름다운 캠퍼스를 산책하고, 해리포터의 호그와트를 닮은 Suzzallo 도서관을 방문합니다." },
      { stop: "2일차", title: "시애틀 프리미엄 아울렛", body: "여행의 완벽한 마무리! 수백 개의 인터내셔널 브랜드를 합리적인 할인가로 쇼핑하실 수 있습니다." },
    ],
    roomOptions: [
      { label: "패밀리 / 그룹 4인실", guests: "4명", price: "$370 CAD부터 / 1인" },
      { label: "트리플 객실 (3인 공유)", guests: "3명", price: "$400 CAD부터 / 1인" },
      { label: "프라이빗 더블 룸", guests: "2명", price: "$430 CAD부터 / 1인" },
    ],
    roomNote: ROOM_NOTE,
    included: [
      "호텔 1박 숙박",
      "편안한 전용 차량",
      "전문 운전기사·가이드",
      "일정 내 주차비",
    ],
    notIncluded: [
      "5% 세금",
      "식사 및 개인 경비 (예: 크랩 팟)",
      "옵션 입장권",
      "권장 가이드 팁",
    ],
    optional: [
      "스페이스 니들 입장권",
      "치훌리 가든 앤 글래스 입장권",
      "항공 박물관 입장권",
    ],
    notes: [
      "수하물 공간: 2일차 아울렛 쇼핑이 포함되어 있으니 캐리어에 여유 공간을 남겨 두세요.",
      "입장권 사전 예약: 스페이스 니들·치훌리 박물관·항공 박물관은 사전 구매를 권장합니다.",
      "국경 통과: 캐나다에서 출발하시는 게스트는 유효 기간 6개월 이상의 여권과 유효한 미국 비자 또는 ESTA 상태를 반드시 확인해 주세요.",
    ],
    bookingCta: "시애틀 2일 여행 예약하기",
  },
  {
    slug: "victoria-1-day",
    img: victoriaHero,
    gallery: victoriaGallery,
    title: "빅토리아 1일 투어 | 영국풍 매력과 해안 정원",
    desc: "아름다운 해상 페리를 타고 100년의 영국풍 매력이 가득한 정원의 도시로.",
    intro:
      "BC주의 주도이자 밴쿠버 섬 남쪽 끝에 위치한 빅토리아(Victoria)는 \"리틀 브리튼(Little Britain)\"이라 불리며 사랑받는 도시입니다. 도시의 분주함 대신 화려한 100년 건축물, 매력적인 항구 풍경, 세계적으로 유명한 정원을 만나실 수 있습니다. 까다로운 페리 예약과 섬 내 운전을 저희에게 맡기시고, BC Ferries 왕복 페리가 포함된 본 투어로 갑판 위에서 바닷바람을 즐기며 로맨틱한 섬 여행을 시작해 보세요.",
    duration: "1일",
    language: LANGUAGE_NOTE,
    price: "$170 CAD부터 / 1인",
    gratuity: "권장 가이드 팁: $20 CAD / 1인",
    itinerary: [
      { stop: "1일차", title: "BC Ferries 해상 크루즈", body: "조지아 해협과 걸프 제도 사이를 가로지르는 약 1.5시간의 여유로운 해상 여행을 즐기실 수 있습니다." },
      { stop: "1일차", title: "부차드 가든 (The Butchart Gardens)", body: "[자유 자비 옵션] 캐나다 국가 사적지로 지정된 세계 최고의 정원 중 하나. 선큰 가든부터 장미 정원, 일본 정원까지 사계절 꽃의 향연이 펼쳐집니다." },
      { stop: "1일차", title: "어부의 부두 (Fisherman's Wharf)", body: "다채로운 수상 가옥 마을! 산책하며 명물 피쉬 앤 칩스를 맛보고, 운이 좋다면 야생 항만 물범을 만날 수도 있습니다." },
      { stop: "1일차", title: "마일 제로 기념비", body: "캐나다 횡단 고속도로의 상징적인 시작점에서 해안 풍경과 멀리 워싱턴 주 올림픽 산맥을 감상하실 수 있습니다." },
      { stop: "1일차", title: "이너 하버 & 정부 거리 (Inner Harbour & Government Street)", body: "담쟁이로 덮인 페어몬트 엠프레스 호텔과 웅장한 BC 의회 건물, 영국풍의 정부 거리에서 특색 있는 상점과 카페를 자유롭게 둘러보세요." },
    ],
    included: [
      "편안한 전용 차량",
      "전문 운전기사·가이드",
      "BC Ferries 왕복 페리 및 차량 승선료",
      "일정 내 주차비",
    ],
    notIncluded: [
      "5% 세금",
      "식사 및 개인 경비",
      "옵션 입장권",
      "권장 가이드 팁",
    ],
    optional: ["부차드 가든 입장권"],
    notes: [
      "방풍·보온: 페리 데크와 항구 주변은 바람이 강할 수 있으니 방풍 자켓을 준비해 주세요.",
      "입장권 사전 예약: 부차드 가든은 빅토리아 필수 명소입니다. 사전 알려 주시면 미리 입장권을 준비해 드립니다.",
      "페리 일정: 시즌과 해상 상황에 따라 페리 시간이 조정될 수 있으며, 가이드가 일정을 유연하게 안내해 드립니다.",
    ],
    bookingCta: "빅토리아 1일 투어 예약하기",
  },
  {
    slug: "whistler-1-day",
    img: whistlerHero,
    gallery: whistlerGallery,
    title: "휘슬러 1일 투어 | 시 투 스카이 하이웨이와 알파인 마을",
    desc: "세계 최고의 해안 고속도로를 따라 두 개의 폭포와 올림픽 알파인 마을을 한 번에 만나는 하루.",
    intro:
      "세계적으로 유명한 \"시 투 스카이 하이웨이(Sea-to-Sky Highway)\"를 따라 북쪽으로 향하는 여행. 한쪽은 반짝이는 태평양, 다른 한쪽은 웅장한 산맥이 펼쳐집니다. 장엄한 폭포부터 캐나다 아웃도어의 수도 스쿼미시, 2010 동계올림픽 개최지 휘슬러까지 — 구불구불한 산길 운전과 비싼 주차비의 부담 없이 자연과 유럽풍 알파인 마을의 매력을 만끽하실 수 있습니다.",
    duration: "1일",
    language: LANGUAGE_NOTE,
    price: "$130 CAD부터 / 1인",
    gratuity: "권장 가이드 팁: $20 CAD / 1인",
    itinerary: [
      { stop: "1일차", title: "포르토 코브 (Porteau Cove)", body: "시 투 스카이 하이웨이의 첫 보석! 하우 사운드의 깊은 푸른 바다와 피요르드 풍경을 감상하실 수 있습니다." },
      { stop: "1일차", title: "섀넌 폭포 (Shannon Falls)", body: "BC주에서 세 번째로 높은 폭포. 산책로를 따라 가볍게 걸으며 335m 높이의 폭포가 화강암 절벽을 따라 쏟아지는 장관을 감상합니다." },
      { stop: "1일차", title: "스쿼미시 (Squamish)", body: "캐나다 아웃도어의 수도로 불리는 스쿼미시를 지나며 세계적인 화강암 봉우리 스타와무스 치프(Stawamus Chief)를 감상합니다." },
      { stop: "1일차", title: "브랜디와인 폭포 (Brandywine Falls)", body: "원시림 속에 숨겨진 비경. 70m 높이의 폭포가 화산암 가장자리에서 깊은 협곡으로 떨어지는 모습이 한 폭의 그림 같습니다." },
      { stop: "1일차", title: "휘슬러 빌리지 (Whistler Village)", body: "유럽 알프스 분위기의 보행자 전용 마을을 산책하며 부티크 상점과 갤러리, 카페를 즐기실 수 있습니다. 옵션으로 세계 기록의 Peak 2 Peak 곤돌라도 체험 가능합니다." },
    ],
    included: [
      "편안한 전용 차량",
      "전문 운전기사·가이드",
      "일정 내 주차비",
    ],
    notIncluded: [
      "5% 세금",
      "식사 및 개인 경비",
      "옵션 입장권",
      "권장 가이드 팁",
    ],
    optional: ["피크 투 피크 곤돌라 (Peak 2 Peak Gondola)"],
    notes: [
      "복장 안내: 휘슬러는 고지대로 밴쿠버보다 5–8도 정도 기온이 낮습니다. 따뜻한 방풍 자켓과 편한 워킹화(폭포 산책로는 미끄러울 수 있음)를 준비해 주세요.",
      "곤돌라 예약: 휘슬러 피크 투 피크 곤돌라는 시즌별 요금이 다르고 대기 인원이 많습니다. 예약 시 알려 주시면 사전 구매를 도와드립니다.",
      "산악 기상: 산악 날씨는 변화가 많으니, 안전을 우선으로 가이드가 정차 시간을 유연하게 조정합니다.",
    ],
    bookingCta: "휘슬러 1일 투어 예약하기",
  },
  {
    slug: "rockies-3-day",
    img: banff3Hero,
    gallery: banff3Gallery,
    title: "캐나다 록키 3일 투어 | 캘거리 왕복 — 빙하와 호수의 비경",
    desc: "장거리 운전의 피로와 국립공원 주차 걱정 없이, 캘거리에서 출발하여 록키의 심장부로.",
    intro:
      "2박 3일의 핵심 일정으로 100년 역사의 밴프 마을, 환상적인 레이크 루이스와 모레인 호수, 압도적인 컬럼비아 아이스필드를 한 번에 만나보세요. 편안한 숙박과 전용 차량이 포함되어 자연이 빚어낸 풍경에 모든 순간을 집중하실 수 있습니다.",
    duration: "2박 3일",
    language: LANGUAGE_NOTE,
    price: "$830 CAD부터 / 1인",
    gratuity: "권장 가이드 팁: $60 CAD / 1인 (1일 $20 CAD × 3일)",
    pickup: "픽업: 1일차 오전 캘거리 국제공항(YYC). 드롭오프: 3일차 오후 5:00경 캘거리 국제공항(YYC).",
    itinerary: [
      { stop: "1일차", title: "캘거리 공항 픽업", body: "오전 캘거리 공항(YYC)에서 픽업 후, 전용 차량으로 록키를 향해 장엄한 자연 여행을 시작합니다." },
      { stop: "1일차", title: "밴프 타운 & 점심", body: "활기 넘치는 알파인 마을 밴프에 도착하여 점심과 함께 산으로 둘러싸인 리조트 분위기를 즐깁니다." },
      { stop: "1일차", title: "캐스케이드 오브 타임 가든", body: "역사 있는 영국풍 정원을 산책하며 밴프 애비뉴를 담을 수 있는 최고의 뷰포인트를 만나보세요." },
      { stop: "1일차", title: "밴프 곤돌라 (Banff Gondola)", body: "[자유 자비 옵션] 유리 곤돌라로 설퍼 산 정상에 올라 록키의 360도 파노라마를 감상합니다." },
      { stop: "1일차", title: "밴프 스프링스 호텔 & 주변", body: "\"록키의 성\"이라 불리는 페어몬트 밴프 스프링스 호텔과 보우 폭포, 서프라이즈 코너에서 엽서 같은 풍경을 만나보세요." },
      { stop: "2일차", title: "보우 호수 (Bow Lake)", body: "아이스필드 파크웨이를 따라 북쪽으로 향하며, 거울처럼 잔잔한 보우 호수와 크로풋 빙하의 반영을 감상합니다." },
      { stop: "2일차", title: "컬럼비아 아이스필드 (Columbia Icefield)", body: "[자유 자비 옵션] 거대한 아이스 익스플로러를 타고 아타바스카 빙하 위에서 만년 빙하의 위엄을 직접 체험하실 수 있습니다." },
      { stop: "2일차", title: "페이토 호수 (Peyto Lake)", body: "여우 모양의 빙하 호수와 청록빛 호수를 한눈에 담을 수 있는 록키의 대표 뷰포인트입니다." },
      { stop: "2일차", title: "에메랄드 호수 (Emerald Lake)", body: "요호 국립공원의 비취빛 호수가 산과 숲에 둘러싸인 평화로운 풍경을 선사합니다." },
      { stop: "3일차", title: "투 잭 레이크 (Two Jack Lake)", body: "아침의 고요한 호수와 거울 같은 수면에 비친 룬들 산(Mt. Rundle)의 절경을 만나보세요." },
      { stop: "3일차", title: "모레인 호수 (Moraine Lake)", body: "여름 시즌 한정의 세계적 절경! 까다로운 출입 제한을 저희가 해결해 드리며, 전용 차량으로 \"텐 픽스 밸리\"의 청록빛 호수를 감상하실 수 있습니다." },
      { stop: "3일차", title: "레이크 루이스 & 캘거리 드롭오프", body: "\"록키의 사파이어\"라 불리는 레이크 루이스를 산책하며 빅토리아 빙하의 장엄함을 느낀 뒤, 오후 5:00경 캘거리 공항(YYC)에 도착합니다." },
    ],
    roomOptions: [
      { label: "패밀리 / 그룹 4인실", guests: "4명", price: "$830 CAD부터 / 1인" },
      { label: "트리플 객실 (3인 공유)", guests: "3명", price: "$890 CAD부터 / 1인" },
      { label: "프라이빗 더블 룸", guests: "2명", price: "$1050 CAD부터 / 1인" },
    ],
    roomNote: ROOM_NOTE,
    included: [
      "호텔 숙박",
      "편안한 전용 차량",
      "전문 운전기사·가이드",
      "일정 내 주차비",
    ],
    notIncluded: [
      "캘거리 왕복 항공권",
      "5% 세금",
      "식사 및 개인 경비",
      "옵션 입장권",
      "권장 가이드 팁",
      { text: "Parks Canada Discovery Pass (각 게스트가 사전에 직접 구매 필요)", href: "https://parkscanadashop.ca/pages/discovery-pass" },
    ],
    optional: [
      "밴프 곤돌라 (Banff Gondola): $90 CAD (6–15세 $60 CAD)",
      "컬럼비아 아이스필드 어드벤처: $100 CAD (6–15세 $60 CAD)",
      "모레인 호수 셔틀 / 입장 패스: $16 CAD",
    ],
    notes: [
      { text: "중요 안내: 본 투어 요금에는 Parks Canada Discovery Pass가 포함되어 있지 않습니다. 각 게스트는 출발 전 본인 이름으로 Discovery Pass를 직접 구매하고 투어 당일 지참해야 합니다. 구매 링크: ", href: "https://parkscanadashop.ca/pages/discovery-pass" },
      "Discovery Pass는 게스트 본인이 개별적으로 구매해야 하며, 여행사가 타인 명의로 대신 구매하거나 패스를 공유해 드릴 수 없습니다. 사전에 구매하지 않으면 캐나다 국립공원 입장 및 당일 일정에 영향이 있을 수 있습니다.",
      "록키 고지대는 날씨 변화가 빠릅니다. 레이어드 의류와 방풍·보온 자켓을 준비해 주세요.",
      "옵션 활동(아이스필드 어드벤처, 곤돌라 등)을 원하시면 예약 시 알려 주시기 바랍니다.",
    ],
    bookingCta: "록키 3일 투어 예약하기",
  },
  {
    slug: "kelowna-2-day",
    img: kelownaHero,
    gallery: kelownaGallery,
    title: "켈로나 2일 투어 | 오카나간 호수 & 와이너리 여행",
    desc: "도시의 분주함에서 벗어나, 오카나간 밸리에서 즐기는 여유로운 1박 2일.",
    intro:
      "장엄한 폭포, 활기 넘치는 호숫가, 여름 한정 제철 과일 따기, 그리고 유명한 로컬 와이너리까지. 장거리 운전과 복잡한 일정의 부담 없이 숙박·교통·전문 가이드가 모두 포함되어 있어, 햇살과 와인의 여유로운 시간을 누리실 수 있습니다.",
    duration: "1박 2일",
    language: LANGUAGE_NOTE,
    price: "$999 CAD부터 / 1인",
    gratuity: "권장 가이드 팁: $40 CAD / 1인 (1일 $20 CAD × 2일)",
    itinerary: [
      { stop: "1일차", title: "브라이덜 폭포 (Bridal Falls)", body: "푸르른 숲길을 따라 신부의 베일처럼 우아하게 떨어지는 폭포를 감상합니다." },
      { stop: "1일차", title: "메리트 (Merritt)", body: "컨트리 음악으로 유명한 내륙 마을을 지나며 BC주의 다른 풍경을 만나보세요." },
      { stop: "1일차", title: "켈로나 시티 파크", body: "켈로나 다운타운에 도착하여 아름다운 호숫가 공원에서 여유로운 휴식을 즐깁니다." },
      { stop: "1일차", title: "오카나간 호수 물놀이", body: "맑은 오카나간 호수에서 여름의 상쾌함과 함께 여유로운 오후를 보내실 수 있습니다." },
      { stop: "2일차", title: "제철 과일 U-Pick", body: "직접 제철 과일을 따는 체험(7월 체리, 8월 복숭아)으로 산지 직송의 신선함을 만나보세요." },
      { stop: "2일차", title: "캥거루 크릭 팜 (Kangaroo Creek Farm)", body: "캥거루와 카피바라 등 사랑스러운 동물들과 가까이 교감할 수 있는 가족 친화 명소." },
      { stop: "2일차", title: "와이너리 투어", body: "오카나간 밸리의 자랑인 와이너리에서 포도밭에 둘러싸여 와인 테이스팅을 즐깁니다." },
    ],
    roomOptions: [
      { label: "패밀리 / 그룹 4인실", guests: "4명", price: "$999 CAD부터 / 1인" },
      { label: "트리플 객실 (3인 공유)", guests: "3명", price: "$999 CAD부터 / 1인" },
      { label: "프라이빗 더블 룸", guests: "2명", price: "$999 CAD부터 / 1인" },
    ],
    roomNote: ROOM_NOTE,
    included: [
      "호텔 1박 숙박",
      "편안한 전용 차량",
      "전문 가이드",
      "일정 내 주차비",
    ],
    notIncluded: [
      "5% 세금",
      "식사",
      "입장권",
      "권장 가이드 팁",
    ],
    optional: [
      "캥거루 크릭 팜 입장권",
      "와이너리 테이스팅 비용",
      "제철 과일 채취 비용",
    ],
    notes: ["여름철 자외선이 강하니 자외선 차단제와 오카나간 호수 물놀이를 위한 수영복도 준비해 주세요."],
    bookingCta: "켈로나 2일 투어 예약하기",
  },
  {
    slug: "western-usa-8-day",
    img: westernUsaHero,
    gallery: westernUsaGallery,
    title: "미서부 8일 투어 | 장엄한 레드 록 캐니언 & 캘리포니아 별의 여정",
    desc: "샌프란시스코, 라스베이거스, 캐니언 비경, 로스앤젤레스를 가로지르는 최고의 로드 트립.",
    intro:
      "미서부의 상징적인 명소와 자연의 경이를 완벽하게 잇는 8일간의 여정. 전용 차량으로 장거리 주간 이동의 피로와 복잡한 노선 계획의 부담을 해소하고, 우수한 숙박과 교통, 전문 가이드를 통해 감탄과 즐거움이 가득한 여행을 선사합니다.",
    duration: "7박 8일",
    language: LANGUAGE_NOTE,
    price: "$999 CAD부터 / 1인",
    gratuity: "권장 가이드 팁: $160 USD / 1인 (1일 $20 USD × 8일)",
    pickup: "픽업: 1일차 오전 10:30 샌프란시스코 국제공항(SFO). 드롭오프: 8일차 오후 3:00 로스앤젤레스 국제공항(LAX).",
    itinerary: [
      { stop: "1일차", title: "SFO 픽업 & 금문교", body: "오전 10:30 SFO 픽업 후, 샌프란시스코의 상징 금문교를 방문해 장엄한 베이 전경을 감상합니다." },
      { stop: "1일차", title: "피어 39 (Pier 39)", body: "활기찬 부두를 산책하며 바다사자와 샌프란시스코 베이의 풍경을 즐깁니다." },
      { stop: "2일차", title: "라스베이거스 스트립", body: "네바다로 이동해 저녁 무렵 라스베이거스 스트립의 화려한 매력을 만끽합니다." },
      { stop: "2일차", title: "프리몬트 스트리트 라이트 쇼", body: "야간 투어로 다운타운의 프리몬트 스트리트 일렉트릭 라이트 쇼를 감상합니다." },
      { stop: "3일차", title: "밸리 오브 파이어 & 브라이스 캐니언", body: "독특한 붉은 바위 지형의 밸리 오브 파이어와 브라이스 캐니언의 환상적인 돌기둥 풍경을 만나보세요." },
      { stop: "4일차", title: "엔텔로프 캐니언 & 호스슈 벤드", body: "슬롯 캐니언의 환상적인 빛과 그림자를 담고, 콜로라도강이 만들어낸 호스슈 벤드의 장관을 감상합니다." },
      { stop: "4일차", title: "그랜드 캐니언 & 글렌 캐니언 댐", body: "세계 7대 자연경관 중 하나인 그랜드 캐니언에서 자연의 위엄을 직접 느껴보세요." },
      { stop: "5일차", title: "베벌리 힐스 & 할리우드", body: "LA에 도착하여 인앤아웃 버거를 맛본 후, 베벌리 힐스와 할리우드 명예의 거리를 둘러봅니다." },
      { stop: "5일차", title: "어반 라이트 (LACMA)", body: "저녁 LACMA의 \"어반 라이트\" 빈티지 가로등 설치 작품에서 LA의 상징적인 포토 스폿을 만나보세요." },
      { stop: "6일차", title: "유니버설 스튜디오", body: "하루 종일 할리우드 영화의 마법 같은 세계에서 스튜디오 투어와 어트랙션을 즐깁니다." },
      { stop: "6일차", title: "그리피스 천문대", body: "저녁 그리피스 천문대에서 LA의 화려한 야경을 한눈에 담아보세요." },
      { stop: "7일차", title: "디즈니랜드 캘리포니아", body: "지구상에서 가장 행복한 곳에서 하루 종일 클래식 동화와 신나는 퍼레이드를 즐기세요." },
      { stop: "8일차", title: "산타모니카, 게티, UCLA", body: "UCLA 캠퍼스, 게티 센터의 웅장한 건축, 그리고 산타모니카 비치를 끝으로 오후 3:00 LAX에 도착합니다." },
    ],
    roomOptions: [
      { label: "패밀리 / 그룹 4인실", guests: "4명", price: "$999 CAD부터 / 1인" },
      { label: "트리플 객실 (3인 공유)", guests: "3명", price: "$999 CAD부터 / 1인" },
      { label: "프라이빗 더블 룸", guests: "2명", price: "$999 CAD부터 / 1인" },
    ],
    roomNote: ROOM_NOTE,
    included: [
      "호텔 7박 숙박",
      "편안한 전용 차량",
      "전문 가이드",
      "일정 내 주차비",
    ],
    notIncluded: [
      "5% 세금",
      "식사",
      "입장권",
      "권장 가이드 팁",
    ],
    optional: [
      "엔텔로프 캐니언 가이드 투어",
      "유니버설 스튜디오 입장권",
      "디즈니랜드 캘리포니아 입장권",
      "그랜드 캐니언 헬리콥터 체험",
    ],
    notes: [
      "캐나다에서 미국으로 입국하시는 게스트는 유효한 여권과 미국 비자 또는 ESTA 상태를 반드시 확인해 주세요.",
    ],
    bookingCta: "미서부 8일 투어 예약하기",
  },
  {
    slug: "vegas-canyon-4-day",
    img: vegasCanyonHero,
    gallery: vegasCanyonGallery,
    title: "라스베이거스 & 캐니언 4일 투어 | 네온 시티와 장엄한 자연",
    desc: "인간이 만든 최고의 엔터테인먼트와 자연의 경이가 만나는 완벽한 여행.",
    intro:
      "라스베이거스의 화려한 밤문화부터 브라이스 캐니언과 그랜드 캐니언의 붉은 바위 절경까지. 편안한 교통과 우수한 숙박으로 사막과 캐니언 사이를 자유롭게 누비며 시각적으로 감동적인 여행을 선사합니다.",
    duration: "3박 4일",
    language: LANGUAGE_NOTE,
    price: "$999 CAD부터 / 1인",
    gratuity: "권장 가이드 팁: $80 USD / 1인 (1일 $20 USD × 4일)",
    pickup: "픽업: 1일차 오후 4:00 라스베이거스 파리 호텔. 드롭오프: 4일차 오후 3:00 로스앤젤레스 국제공항(LAX).",
    itinerary: [
      { stop: "1일차", title: "라스베이거스 스트립 & 야간 투어", body: "오후 4:00 파리 호텔 픽업 후, 라스베이거스 스트립과 프리몬트 스트리트 라이트 쇼를 함께 즐깁니다." },
      { stop: "2일차", title: "밸리 오브 파이어 & 브라이스 캐니언", body: "도시를 떠나 밸리 오브 파이어의 붉은 바위와 브라이스 캐니언의 환상적인 돌기둥 풍경을 만나보세요." },
      { stop: "3일차", title: "엔텔로프 캐니언 & 호스슈 벤드", body: "슬롯 캐니언의 환상적인 빛과 콜로라도강 270도의 장엄한 호스슈 벤드를 감상합니다." },
      { stop: "3일차", title: "그랜드 캐니언 & 글렌 캐니언 댐", body: "웅장한 글렌 캐니언 댐과 그랜드 캐니언 국립공원에서 형용할 수 없는 자연의 감동을 만나보세요." },
      { stop: "4일차", title: "인앤아웃 & LAX 드롭오프", body: "LA로 이동하며 미서부의 클래식 인앤아웃 버거를 맛본 후, 오후 3:00 LAX에 도착합니다." },
    ],
    roomOptions: [
      { label: "패밀리 / 그룹 4인실", guests: "4명", price: "$999 CAD부터 / 1인" },
      { label: "트리플 객실 (3인 공유)", guests: "3명", price: "$999 CAD부터 / 1인" },
      { label: "프라이빗 더블 룸", guests: "2명", price: "$999 CAD부터 / 1인" },
    ],
    roomNote: ROOM_NOTE,
    included: [
      "호텔 3박 숙박",
      "편안한 전용 차량",
      "전문 가이드",
      "주차비",
    ],
    notIncluded: [
      "5% 세금",
      "식사",
      "입장권",
      "권장 가이드 팁",
    ],
    optional: ["엔텔로프 캐니언 가이드 투어", "그랜드 캐니언 헬리콥터 체험"],
    notes: [
      "캐나다에서 미국으로 입국하시는 게스트는 유효한 여권과 미국 비자 또는 ESTA 상태를 반드시 확인해 주세요.",
      "캐니언 트레킹 시 편한 신발을 착용해 주시고, 사막 지역은 일교차가 크므로 레이어드 의류를 권장합니다.",
    ],
    bookingCta: "라스베이거스 캐니언 4일 투어 예약하기",
  },
  {
    slug: "los-angeles-3-day",
    img: la3Hero,
    gallery: la3Gallery,
    title: "로스앤젤레스 3일 투어 | 테마파크 & 캘리포니아 햇살 여행",
    desc: "시간이 제한된 여행자를 위한 LA 핵심 정수 여행.",
    intro:
      "세 개의 메이저 테마파크와 시내 랜드마크를 한 번에 만나보세요. 복잡한 LA의 교통과 주차의 부담을 덜고, 편안한 교통과 숙박이 포함되어 도착 즉시 캘리포니아 휴양 시간을 시작하실 수 있습니다.",
    duration: "2박 3일",
    language: LANGUAGE_NOTE,
    price: "$999 CAD부터 / 1인",
    gratuity: "권장 가이드 팁: $60 USD / 1인 (1일 $20 USD × 3일)",
    pickup: "픽업: 1일차 오전 11:50 로스앤젤레스 국제공항(LAX). 드롭오프: 3일차 오후 5:00 LAX.",
    itinerary: [
      { stop: "1일차", title: "LAX 픽업 & 베벌리 힐스", body: "오전 11:50 LAX 픽업, 인앤아웃 버거 후 파머스 마켓과 베벌리 힐스에서 캘리포니아 분위기를 만끽합니다." },
      { stop: "1일차", title: "할리우드 & 그리피스 천문대 야경", body: "스타들의 손도장을 찾으며 할리우드 명예의 거리를 산책하고, 저녁에는 그리피스 천문대에서 LA의 화려한 야경을 감상합니다." },
      { stop: "2일차", title: "디즈니랜드 캘리포니아", body: "하루 종일 캘리포니아 디즈니랜드에서 웃음과 마법의 시간을 보내세요." },
      { stop: "3일차", title: "유니버설 스튜디오 할리우드", body: "영화의 전당에서 스튜디오 투어와 짜릿한 어트랙션을 체험합니다. 오후 5:00 LAX에 도착합니다." },
    ],
    roomOptions: [
      { label: "패밀리 / 그룹 4인실", guests: "4명", price: "$999 CAD부터 / 1인" },
      { label: "트리플 객실 (3인 공유)", guests: "3명", price: "$999 CAD부터 / 1인" },
      { label: "프라이빗 더블 룸", guests: "2명", price: "$999 CAD부터 / 1인" },
    ],
    roomNote: ROOM_NOTE,
    included: [
      "호텔 2박 숙박",
      "편안한 전용 차량",
      "전문 가이드",
      "주차비",
    ],
    notIncluded: [
      "5% 세금",
      "식사",
      "입장권",
      "권장 가이드 팁",
    ],
    optional: ["디즈니랜드 캘리포니아 입장권", "유니버설 스튜디오 할리우드 입장권"],
    notes: [
      "캐나다에서 미국으로 입국하시는 게스트는 유효한 여권과 미국 비자 또는 ESTA 상태를 반드시 확인해 주세요.",
      "테마파크 운영 시간은 시즌별로 달라질 수 있으니 편한 워킹화를 권장합니다.",
    ],
    bookingCta: "로스앤젤레스 3일 투어 예약하기",
  },
  {
    slug: "oregon-coast-3-day",
    img: oregonHero,
    gallery: oregonGallery,
    title: "오리건 3일 투어 | 면세 쇼핑 & 태평양 해안 절경",
    desc: "남쪽으로 향하며 만나는 태평양 북서부의 독특한 매력.",
    intro:
      "시애틀의 클래식 마켓을 시작으로 워싱턴 주를 가로질러 오리건 주의 장엄한 해안선, 포틀랜드의 면세 쇼핑까지 즐기는 여행. 자연과 도시 쇼핑이 어우러진 주말 크로스-스테이트 여행의 완벽한 선택입니다.",
    duration: "2박 3일",
    language: LANGUAGE_NOTE,
    price: "$999 CAD부터 / 1인",
    gratuity: "권장 가이드 팁: $60 USD / 1인 (1일 $20 USD × 3일)",
    itinerary: [
      { stop: "1일차", title: "시애틀 파이크 플레이스 마켓", body: "유명한 파이크 플레이스 마켓을 둘러보며 시애틀의 커피 문화와 활기찬 해산물 마켓을 만나보세요." },
      { stop: "1일차", title: "워싱턴 주의사당 & 시사이드", body: "워싱턴 주의사당과 아스토리아 칼럼을 방문한 후, 휴양 분위기의 시사이드 비치에 도착합니다." },
      { stop: "2일차", title: "캐논 비치 & 틸라무크", body: "유명한 헤이스택 록을 만나고, 틸라무크 크리머리에서 풍부한 아이스크림과 유제품을 맛보세요." },
      { stop: "2일차", title: "우드번 아울렛 & 포틀랜드", body: "우드번 프리미엄 아울렛에서 오리건의 면세 쇼핑을 즐긴 후, 파웰스 시티 오브 북스와 로컬 푸드 트럭을 경험합니다." },
      { stop: "3일차", title: "콜롬비아 리버 게지", body: "비스타 하우스에서 장엄한 강과 협곡을 내려다본 후, 미국에서 두 번째로 높은 멀트노마 폭포를 감상합니다." },
      { stop: "3일차", title: "트레이더 조 (Trader Joe's)", body: "복귀 전 인기 슈퍼마켓에서 특색 있는 스낵과 선물을 쇼핑하며 여행을 완벽하게 마무리합니다." },
    ],
    roomOptions: [
      { label: "패밀리 / 그룹 4인실", guests: "4명", price: "$999 CAD부터 / 1인" },
      { label: "트리플 객실 (3인 공유)", guests: "3명", price: "$999 CAD부터 / 1인" },
      { label: "프라이빗 더블 룸", guests: "2명", price: "$999 CAD부터 / 1인" },
    ],
    roomNote: ROOM_NOTE,
    included: [
      "호텔 2박 숙박",
      "편안한 전용 차량",
      "전문 가이드",
      "주차비",
    ],
    notIncluded: [
      "5% 세금",
      "식사",
      "입장권",
      "권장 가이드 팁",
    ],
    optional: ["포함 명소 외 자유 자비 활동", "트레이더 조 쇼핑"],
    notes: [
      "캐나다에서 미국으로 입국하시는 게스트는 유효한 여권과 미국 비자 또는 ESTA 상태를 반드시 확인해 주세요.",
      "오리건 해안은 날씨 변화가 많으니 레이어드 의류와 방풍 자켓을 권장합니다.",
    ],
    bookingCta: "오리건 3일 투어 예약하기",
  },
  {
    slug: "banff-two-lake-1-day",
    href: "/rocky-mountain-lake-tours",
    img: banffTwoLakeFeature,
    title: "밴프 투 레이크 1일 투어｜레이크 루이스 & 모레인 레이크",
    desc: "캐나디안 로키의 가장 상징적인 두 호수, 레이크 루이스와 모레인 레이크를 하루에 천천히 둘러봅니다.",
    intro: "로키에서 가장 사랑받는 두 호수를 여유롭게 즐기는 1일 일정.",
    duration: "1일",
    language: LANGUAGE_NOTE,
    price: "From $155 CAD / 인",
    itinerary: [
      { stop: "Day 1", title: "레이크 루이스", body: "빅토리아 빙하 아래 에메랄드 빛 호수를 만나는 오전." },
      { stop: "Day 1", title: "모레인 레이크", body: "텐 픽스 계곡 아래 모레인 레이크에서의 오후." },
    ],
    included: ["편안한 전용 차량", "전문 가이드 겸 드라이버"],
    notIncluded: [
      "5% 세금",
      "식사 및 개인 비용",
      "가이드 팁(권장)",
      { text: "Parks Canada Discovery Pass (각 게스트가 사전에 직접 구매 필요)", href: "https://parkscanadashop.ca/pages/discovery-pass" },
    ],
    notes: [
      "밴프 국립공원 입장에는 Parks Canada Discovery Pass가 필요합니다. 각 게스트가 parkscanadashop.ca에서 본인 명의로 사전에 구매하시고 투어 당일 지참해 주세요.",
      "호수 개방은 계절에 따라 달라지며, 일정은 도로 및 날씨 상황에 따라 조정될 수 있습니다.",
      "로키 산맥 고지대는 날씨 변화가 빠르므로 레이어드 의류와 방풍·보온 자켓을 준비해 주세요.",
    ],
    bookingCta: "밴프 투 레이크 1일 투어 예약",
  },
];

export function getTour(slug: string) {
  return tours.find((t) => t.slug === slug);
}
