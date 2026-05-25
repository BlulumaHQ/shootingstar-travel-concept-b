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
    avatar: aMinjun, name: "李敏俊", country: "首爾, KR", tour: "班夫 & 露易絲湖", rating: 5,
    text: "早上七點到 Moraine Lake，比想像中冷，現場幾乎沒人。導遊在車上備好熱咖啡。照片真的拍不出那種藍，水就是那麼藍。",
    photos: [b3, lake10, b7, lake55],
  },
  {
    avatar: aSarah, name: "Sarah Thompson", country: "本拿比, CA", tour: "班夫一日遊", rating: 5,
    text: "在 BC 住了 12 年，竟然從沒去過班夫。這次帶來訪的媽媽參加一日遊 — 小團、不趕路，導遊知道哪個時間點光線最漂亮。媽媽到現在還一直在講。",
    photos: [b1, b5, lake13],
  },
  {
    avatar: aJiwon, name: "姜智元", country: "大田, KR", tour: "落磯山經典團", rating: 5,
    text: "蜜月去的，三天在洛磯山，住 Canmore 的木屋，路上還看到麋鹿。韓語導遊讓爸媽很安心。真的每一分錢都花得值得。",
    photos: [b2, b8, b4, b6, lake55],
  },

  {
    avatar: aMarcus, name: "Marcus Chen", country: "列治文, CA", tour: "西雅圖週末小旅行", rating: 5,
    text: "從列治文開車南下過週末。Pike Place 一開門就到、避開人潮的感覺超棒。導遊還帶我們去國際區一家小拉麵店，完全不在我的清單上。",
    photos: [sa7, sa2, sb6, sa4],
  },
  {
    avatar: aSoyeon, name: "韓昭妍", country: "仁川, KR", tour: "西雅圖週末小旅行", rating: 4,
    text: "第一次去西雅圖，天氣居然很給面子！Kerry Park 看夕陽時 Rainier 山露臉了大概 20 分鐘，大家都呆站在那。唯一可惜是 Chihuly 玻璃館的時間不夠。",
    photos: [sa5, sb3, sa1, sb8],
  },

  {
    avatar: aLin, name: "林佳穎", country: "溫哥華, CA", tour: "維多利亞 & 布查特花園", rating: 5,
    text: "從 Tsawwassen 坐 ferry 過去，天氣超好。Butchart Gardens 真的比照片漂亮太多了，下午回 Inner Harbour 喝下午茶剛剛好。導遊知道哪裡可以避開團客，很加分。",
    photos: [v2, v4, v7],
  },
  {
    avatar: aYuna, name: "崔有娜", country: "大邱, KR", tour: "維多利亞花園之旅", rating: 5,
    text: "和媽媽兩個人去的。渡輪上看到的海、布查特的玫瑰園，還有小咖啡店的司康 — 一整天感覺太短了。導遊用韓語細心解說，整個人都放鬆了。",
    photos: [v1, v5, v8, v4],
  },

  {
    avatar: aChen, name: "陳俊宏", country: "台北, TW", tour: "溫哥華市區深度遊", rating: 5,
    text: "從台北飛來，原本只把溫哥華當中轉站。後來臨時加了一天市區深度遊，Granville Island 跟 Stanley Park 都很喜歡，Whistler 順遊那段山路也美到不行。下次一定要待久一點。",
    photos: [tourVancouver, w4, w2, w6],
  },

  {
    avatar: aHyunwoo, name: "金賢宇", country: "釜山, KR", tour: "黃刀鎮極光追蹤", rating: 5,
    text: "−32 度。真的。第一晚因為雲層完全沒看到，第三天凌晨兩點導遊把我們叫醒，出去一看天空整片在發綠光。一輩子都不會忘記。",
    photos: [ykPolas, ykBg, tourAurora, destYukon],
  },
  {
    avatar: aJames, name: "James Patel", country: "素里, CA", tour: "極光追蹤之旅", rating: 5,
    text: "帶老婆去慶祝 40 歲生日。三晚有兩晚看到強烈極光。Aurora Village 那個有暖爐的 teepee 讓冷變得完全可以接受。小提醒：他們叫你帶的手套真的要帶。",
    photos: [tourAurora, ykBg, destYukon],
  },
];
