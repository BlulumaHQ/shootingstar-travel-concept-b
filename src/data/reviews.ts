import g1 from "@/assets/guest-1.jpg";
import g2 from "@/assets/guest-2.jpg";
import g3 from "@/assets/guest-3.jpg";

// Banff (banff3 + lake-tours)
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

// Seattle
import sa1 from "@/assets/seattle/s1.webp";
import sa2 from "@/assets/seattle/s2.webp";
import sa4 from "@/assets/seattle/s4.webp";
import sa5 from "@/assets/seattle/s5.webp";
import sa7 from "@/assets/seattle/s7.webp";
import sb3 from "@/assets/seattle2/s3.webp";
import sb6 from "@/assets/seattle2/s6.webp";
import sb8 from "@/assets/seattle2/s8.webp";

// Victoria
import v1 from "@/assets/victoria/v1.webp";
import v2 from "@/assets/victoria/v2.webp";
import v4 from "@/assets/victoria/v4.webp";
import v5 from "@/assets/victoria/v5.webp";
import v7 from "@/assets/victoria/v7.webp";
import v8 from "@/assets/victoria/v8.webp";

// Vancouver / Whistler
import tourVancouver from "@/assets/tour-vancouver.webp";
import w2 from "@/assets/whistler/w2.webp";
import w4 from "@/assets/whistler/w4.webp";
import w6 from "@/assets/whistler/w6.webp";

// Yellowknife
import ykBg from "@/assets/hero-bg-yellowknife.webp";
import ykPolas from "@/assets/hero-polaroids-yellowknife.png";
import tourAurora from "@/assets/tour-aurora.webp";
import destYukon from "@/assets/dest-yukon.webp";

import type { Review } from "@/components/site/ReviewCard";

export const reviews: Review[] = [
  // ── Banff × 3 ───────────────────────────────────────────
  {
    avatar: g2, name: "Minjun Lee", country: "Seoul, KR", tour: "Banff & Lake Louise", rating: 5,
    text: "Moraine Lake at 7am — colder than I expected and almost no one around. Our guide had hot coffee waiting in the van. Honestly the photos don't do it justice, the water really is that blue.",
    photos: [b3, lake10, b7, lake55],
  },
  {
    avatar: g1, name: "Sarah Thompson", country: "Burnaby, CA", tour: "Banff Day Tour", rating: 5,
    text: "I've lived in BC for 12 years and somehow never made it to Banff. Did the day tour with my mom who was visiting — small group, no rushing, and the guide knew exactly where to stop for the best light. Mom hasn't stopped talking about it.",
    photos: [b1, b5, lake13],
  },
  {
    avatar: g3, name: "Jiwon Kang", country: "Daejeon, KR", tour: "Rocky Mountain Classic", rating: 5,
    text: "신혼여행으로 갔는데… okay sorry, mixing languages. Three days in the Rockies, slept in a cabin in Canmore, saw elk on the road. The Korean-speaking guide made my parents feel so comfortable. Worth every penny.",
    photos: [b2, b8, b4, b6, lake55],
  },

  // ── Seattle × 2 ─────────────────────────────────────────
  {
    avatar: g1, name: "Marcus Chen", country: "Richmond, CA", tour: "Seattle Weekend", rating: 5,
    text: "Drove down from Richmond for a long weekend. Pike Place at opening time before the crowds was a game changer. Also the guide took us to a tiny ramen spot in the International District that wasn't on any of my lists.",
    photos: [sa7, sa2, sb6, sa4],
  },
  {
    avatar: g2, name: "Soyeon Han", country: "Incheon, KR", tour: "Seattle Weekend", rating: 4,
    text: "First time in Seattle and the weather actually cooperated! Loved Kerry Park at sunset — Mt Rainier showed up for about 20 minutes and we all just stood there. Only thing: I wish we had more time at Chihuly.",
    photos: [sa5, sb3, sa1, sb8],
  },

  // ── Victoria × 2 ────────────────────────────────────────
  {
    avatar: g3, name: "Lin Jia-Ying", country: "Vancouver, CA", tour: "Victoria & Butchart Gardens", rating: 5,
    text: "從 Tsawwassen 坐 ferry 過去，天氣超好。Butchart Gardens 真的比照片漂亮太多了，下午回 Inner Harbour 喝下午茶剛剛好。導遊知道哪裡可以避開團客，很加分。",
    photos: [v2, v4, v7],
  },
  {
    avatar: g2, name: "Yuna Choi", country: "Daegu, KR", tour: "Victoria Garden Journey", rating: 5,
    text: "엄마랑 둘이 다녀왔어요. 페리에서 본 바다, 부차트 가든의 장미 정원, 그리고 작은 카페에서 먹은 스콘까지 — 하루가 너무 짧게 느껴졌어요. 가이드님이 한국어로 꼼꼼히 설명해주셔서 편안했습니다.",
    photos: [v1, v5, v8, v4],
  },

  // ── Vancouver × 1 ───────────────────────────────────────
  {
    avatar: g3, name: "Chen Chun-Hong", country: "Taipei, TW", tour: "Vancouver City Deep Dive", rating: 5,
    text: "從台北飛來，原本只把溫哥華當中轉站。後來臨時加了一天市區深度遊，Granville Island 跟 Stanley Park 都很喜歡，Whistler 順遊那段山路也美到不行。下次一定要待久一點。",
    photos: [tourVancouver, w4, w2, w6],
  },

  // ── Yellowknife × 2 ─────────────────────────────────────
  {
    avatar: g2, name: "Hyunwoo Kim", country: "Busan, KR", tour: "Aurora Chase — Yellowknife", rating: 5,
    text: "−32도였어요. 진짜. 첫째 날 밤은 구름 때문에 못 봤는데 셋째 날 새벽 2시쯤 가이드가 깨워줘서 나갔더니 하늘이 초록색으로 일렁이고 있었어요. 평생 못 잊을 것 같아요.",
    photos: [ykPolas, ykBg, tourAurora, destYukon],
  },
  {
    avatar: g1, name: "James Patel", country: "Surrey, CA", tour: "Aurora Chase Journey", rating: 5,
    text: "Took my partner for her 40th. Three nights, two with strong aurora activity. The heated teepee out at Aurora Village made the cold totally manageable. Pro tip: actually bring the gloves they tell you to bring.",
    photos: [tourAurora, ykBg, destYukon],
  },
];
