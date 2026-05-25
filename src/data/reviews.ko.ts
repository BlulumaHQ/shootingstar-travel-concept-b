import aMinjun from "@/assets/avatars/a-minjun.jpg";
import aSarah from "@/assets/avatars/a-sarah.jpg";
import aJiwon from "@/assets/avatars/a-jiwon.jpg";
import aMarcus from "@/assets/avatars/a-marcus.jpg";
import aSoyeon from "@/assets/avatars/a-soyeon.jpg";
import aLin from "@/assets/avatars/a-linjy.jpg";
import aYuna from "@/assets/avatars/a-yuna.jpg";
import aChen from "@/assets/avatars/a-chen.jpg";
import aHyunwoo from "@/assets/avatars/a-hyunwoo.jpg";
import aJames from "@/assets/avatars/a-james.jpg";

import b1 from "@/assets/banff3/b1.webp";
import b2 from "@/assets/banff3/b2.webp";
import b3 from "@/assets/banff3/b3.webp";
import b4 from "@/assets/banff3/b4.webp";
import b5 from "@/assets/banff3/b5.webp";
import b6 from "@/assets/banff3/b6.webp";
import b7 from "@/assets/banff3/b7.webp";
import b8 from "@/assets/banff3/b8.webp";
import lake10 from "@/assets/lake-tours/lake-010.webp";
import lake13 from "@/assets/lake-tours/lake-013.webp";
import lake55 from "@/assets/lake-tours/lake-055.webp";

import sa1 from "@/assets/seattle/s1.webp";
import sa2 from "@/assets/seattle/s2.webp";
import sa4 from "@/assets/seattle/s4.webp";
import sa5 from "@/assets/seattle/s5.webp";
import sa7 from "@/assets/seattle/s7.webp";
import sb3 from "@/assets/seattle2/s3.webp";
import sb6 from "@/assets/seattle2/s6.webp";
import sb8 from "@/assets/seattle2/s8.webp";

import v1 from "@/assets/victoria/v1.webp";
import v2 from "@/assets/victoria/v2.webp";
import v4 from "@/assets/victoria/v4.webp";
import v5 from "@/assets/victoria/v5.webp";
import v7 from "@/assets/victoria/v7.webp";
import v8 from "@/assets/victoria/v8.webp";

import tourVancouver from "@/assets/tour-vancouver.webp";
import w2 from "@/assets/whistler/w2.webp";
import w4 from "@/assets/whistler/w4.webp";
import w6 from "@/assets/whistler/w6.webp";

import ykBg from "@/assets/hero-bg-yellowknife.webp";
import ykPolas from "@/assets/hero-polaroids-yellowknife.png";
import tourAurora from "@/assets/tour-aurora.webp";
import destYukon from "@/assets/dest-yukon.webp";

import type { Review } from "@/components/site/ReviewCard";

export const reviews: Review[] = [
  {
    avatar: aMinjun, name: "이민준", country: "서울, KR", tour: "밴프 & 루이스 호수", rating: 5,
    text: "아침 7시에 모레인 호수 도착 — 생각보다 훨씬 추웠고 사람도 거의 없었어요. 가이드님이 차에 따뜻한 커피를 준비해두셨더라고요. 사진으로는 그 색이 절대 안 나와요, 물이 진짜 그렇게 파래요.",
    photos: [b3, lake10, b7, lake55],
  },
  {
    avatar: aSarah, name: "Sarah Thompson", country: "버나비, CA", tour: "밴프 1일 투어", rating: 5,
    text: "BC에 12년 살면서 밴프를 한 번도 못 가봤어요. 한국에서 오신 엄마랑 같이 1일 투어를 했는데 — 소규모, 안 서두르고, 가이드가 빛이 가장 좋은 시간을 정확히 알고 있더라고요. 엄마가 아직도 그 얘기만 하세요.",
    photos: [b1, b5, lake13],
  },
  {
    avatar: aJiwon, name: "강지원", country: "대전, KR", tour: "로키 마운틴 클래식", rating: 5,
    text: "신혼여행으로 다녀왔어요. 로키에서 3일, Canmore의 통나무집에서 자고, 길에서 엘크도 봤어요. 한국어 가이드 덕분에 부모님이 정말 편하게 다니셨어요. 정말 돈이 아깝지 않은 여행이었습니다.",
    photos: [b2, b8, b4, b6, lake55],
  },

  {
    avatar: aMarcus, name: "Marcus Chen", country: "리치먼드, CA", tour: "시애틀 주말 여행", rating: 5,
    text: "리치먼드에서 차로 내려가서 주말을 보냈어요. 파이크 플레이스가 문 열자마자 들어가서 인파를 피한 게 정말 신의 한 수. 가이드님이 인터내셔널 디스트릭트의 작은 라멘집도 데려가 주셨는데 제 리스트엔 없던 곳이었어요.",
    photos: [sa7, sa2, sb6, sa4],
  },
  {
    avatar: aSoyeon, name: "한소연", country: "인천, KR", tour: "시애틀 주말 여행", rating: 4,
    text: "시애틀은 처음이었는데 날씨가 정말 잘 도와줬어요! Kerry Park에서 해질녘에 Rainier 산이 한 20분 정도 모습을 드러냈는데 다들 그냥 멍하니 서 있었어요. 한 가지 아쉬운 건 Chihuly 유리관에서 시간이 부족했던 것.",
    photos: [sa5, sb3, sa1, sb8],
  },

  {
    avatar: aLin, name: "린쟈잉", country: "밴쿠버, CA", tour: "빅토리아 & 부차트 가든", rating: 5,
    text: "Tsawwassen에서 페리 타고 갔는데 날씨가 정말 좋았어요. Butchart Gardens는 사진보다 훨씬 더 예쁘고, 오후에 Inner Harbour에서 애프터눈 티 마시기 딱 좋았어요. 가이드가 단체관광객 피하는 동선을 알고 있어서 너무 좋았어요.",
    photos: [v2, v4, v7],
  },
  {
    avatar: aYuna, name: "최유나", country: "대구, KR", tour: "빅토리아 가든 여정", rating: 5,
    text: "엄마랑 둘이 다녀왔어요. 페리에서 본 바다, 부차트 가든의 장미 정원, 그리고 작은 카페에서 먹은 스콘까지 — 하루가 너무 짧게 느껴졌어요. 가이드님이 한국어로 꼼꼼히 설명해주셔서 편안했습니다.",
    photos: [v1, v5, v8, v4],
  },

  {
    avatar: aChen, name: "천쥔훙", country: "타이베이, TW", tour: "밴쿠버 시티 디프 다이브", rating: 5,
    text: "타이베이에서 날아왔는데 원래는 밴쿠버를 경유지로만 생각했어요. 그런데 즉흥적으로 시티 투어 하루를 추가했는데, Granville Island랑 Stanley Park 둘 다 너무 좋았고 Whistler 가는 산길도 정말 아름다웠어요. 다음엔 꼭 더 오래 머물고 싶어요.",
    photos: [tourVancouver, w4, w2, w6],
  },

  {
    avatar: aHyunwoo, name: "김현우", country: "부산, KR", tour: "옐로나이프 오로라 체이스", rating: 5,
    text: "−32도였어요. 진짜. 첫째 날 밤은 구름 때문에 못 봤는데 셋째 날 새벽 2시쯤 가이드가 깨워줘서 나갔더니 하늘이 초록색으로 일렁이고 있었어요. 평생 못 잊을 것 같아요.",
    photos: [ykPolas, ykBg, tourAurora, destYukon],
  },
  {
    avatar: aJames, name: "James Patel", country: "써리, CA", tour: "오로라 체이스 여정", rating: 5,
    text: "아내 40번째 생일 기념으로 갔어요. 3박 중 2박은 강한 오로라를 봤어요. Aurora Village의 난방되는 티피 덕분에 추위가 충분히 견딜 만했어요. 팁 하나: 가져오라는 장갑은 진짜로 챙겨가세요.",
    photos: [tourAurora, ykBg, destYukon],
  },
];
