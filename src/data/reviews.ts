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
    avatar: g1, name: "Mei-Lin Chen", country: "Taipei, TW", tour: "落磯山經典團", rating: 5,
    text: "走進班夫的那一刻，終於懂得什麼叫被風景擁抱。導遊細心，整趟旅程沒有趕路的緊張感。",
    photos: [tourBanff, tourRockies, destJasper, tourIcefield, destWhistler],
  },
  {
    avatar: g2, name: "Jihoon Park", country: "Seoul, KR", tour: "極光追蹤之旅", rating: 5,
    text: "韓語導遊細心又溫柔，整趟旅程像和老朋友出遊。極光出現的那夜，我們都沉默了。",
    photos: [tourAurora, destYukon, tourRockies, destJasper, tourBanff, tourIcefield],
  },
  {
    avatar: g3, name: "The Wong Family", country: "Hong Kong", tour: "落磯山經典團", rating: 5,
    text: "一家人最棒的回憶，孩子說明年還要再來。冰原大道的雪白讓人心都靜下來。",
    photos: [tourRockies, tourIcefield, tourBanff, destJasper, destWhistler],
  },
  {
    avatar: g1, name: "Rachel L.", country: "Vancouver, CA", tour: "班夫一日遊", rating: 5,
    text: "短短一天卻完整收藏經典湖景，行程順暢、講解清楚，回家立刻分享給朋友。",
    photos: [tourBanff, tourRockies, destJasper, tourIcefield, tourVictoria],
  },
  {
    avatar: g2, name: "小柔", country: "Taichung, TW", tour: "極光追蹤之旅", rating: 5,
    text: "在 −25 度等到極光的瞬間，覺得一切都值得。工作人員幫我們拍了好多人生美照。",
    photos: [tourAurora, destYukon, tourRockies, tourBanff, destJasper, destWhistler],
  },
  {
    avatar: g3, name: "Daniel K.", country: "Toronto, CA", tour: "哥倫比亞冰原大道", rating: 4,
    text: "天空步道很值得，導遊也很有耐心。希望午餐可以再多一點選擇。",
    photos: [tourIcefield, tourRockies, tourBanff, destJasper, destWhistler],
  },
  {
    avatar: g1, name: "Yuki S.", country: "Osaka, JP", tour: "維多利亞花園之旅", rating: 5,
    text: "布查特花園真的像走進童話。一路上的渡輪海風是這趟最溫柔的記憶。",
    photos: [tourVictoria, tourVancouver, tourBanff, destWhistler, tourRockies],
  },
  {
    avatar: g2, name: "Andy & Joy", country: "Singapore", tour: "溫哥華市區深度遊", rating: 5,
    text: "原本只想短途散步，沒想到收穫滿滿。導遊推薦的咖啡店讓我們念念不忘。",
    photos: [tourVancouver, tourToronto, tourVictoria, destWhistler, tourBanff, destJasper],
  },
  {
    avatar: g3, name: "Hyejin Kim", country: "Busan, KR", tour: "私人包團服務", rating: 5,
    text: "為我們家三代人量身打造的行程，連阿嬤都笑得很開心。真的非常值得。",
    photos: [tourRockies, tourBanff, destJasper, tourIcefield, tourVictoria, destWhistler],
  },
];
