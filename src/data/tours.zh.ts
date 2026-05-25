import tourBanff from "@/assets/tour-banff.webp";
import tourRockies from "@/assets/tour-rockies.webp";
import tourVancouver from "@/assets/tour-vancouver.webp";
import { seattleHero, seattleGallery } from "./seattle-gallery";
import { victoriaHero, victoriaGallery } from "./victoria-gallery";
import tourPrivate from "@/assets/tour-private.webp";
import tourIcefield from "@/assets/tour-icefield.webp";
import tourToronto from "@/assets/tour-toronto.jpg";
import destWhistler from "@/assets/dest-whistler.webp";
import { whistlerHero, whistlerGallery } from "./whistler-gallery";
import type { Tour } from "./tours";

export const tours: Tour[] = [
  {
    slug: "seattle-1-day",
    img: seattleHero,
    gallery: seattleGallery,
    title: "西雅圖一日遊｜翡翠之城精華輕旅行",
    desc: "一日精選導覽，走訪西雅圖天際線、派克市場、星巴克創始店、Amazon Spheres 與華盛頓大學校園。",
    intro:
      "用一個精心安排的日程，輕鬆走訪西雅圖最具代表性的景點。從經典天際線觀景點、歷史悠久的派克市場，到現代科技地標與美麗的華盛頓大學校園，這趟行程適合想體驗西雅圖卻不想自駕、找停車位或安排路線的旅人。專業導遊隨行，順暢、舒適、令人印象深刻的城市小旅行。",
    duration: "1 日",
    language: "中文 / 英文 / 韓文",
    price: "USD $140 起 / 每位",
    gratuity: "USD $20 / 每位",
    itinerary: [
      { stop: "景點 1", title: "Kerry Park 觀景點", body: "西雅圖最經典的觀景台之一，晴天可同時望見太空針塔、市中心天際線、普吉灣與雷尼爾山。" },
      { stop: "景點 2", title: "Amazon Spheres", body: "近距離欣賞 Amazon 著名的玻璃球建築外觀，感受西雅圖作為全球科技重鎮的氣息。內部為員工辦公空間，不開放參觀。" },
      { stop: "景點 3", title: "派克市場 Pike Place Market", body: "美國最古老的公共市場之一，可品嘗在地美食、新鮮海鮮，欣賞著名的丟魚秀，感受充滿活力的海濱市場氛圍。" },
      { stop: "景點 4", title: "星巴克創始店", body: "1971 年開業的全球第一家星巴克，是西雅圖最具代表性的文化地標之一。" },
      { stop: "景點 5", title: "口香糖牆 Gum Wall", body: "派克市場附近最特別、色彩最繽紛的拍照景點之一。" },
      { stop: "景點 6", title: "太空針塔 / Chihuly 玻璃花園", body: "可依個人喜好與時間，自費選擇登上太空針塔或參觀 Chihuly 玻璃藝術花園。" },
      { stop: "景點 7", title: "華盛頓大學", body: "美國最美的大學校園之一，包含氣勢磅礡的哥德式 Suzzallo 圖書館。春季校園櫻花盛開，亦是熱門景點。" },
    ],
    included: ["舒適專車", "中英 / 中韓雙語專業導遊", "行程內景點停車費"],
    notIncluded: ["5% 稅金", "餐食", "景點門票", "建議導遊小費"],
    optional: ["太空針塔門票", "Chihuly 玻璃花園門票"],
    notes: ["西雅圖天氣多變，建議洋蔥式穿搭、輕便防雨外套與舒適步行鞋。"],
    bookingCta: "預訂西雅圖一日遊",
  },
  {
    slug: "seattle-2-day",
    img: tourToronto,
    gallery: [tourToronto, tourVancouver],
    title: "西雅圖兩日遊｜城市深度＋暢貨購物之旅",
    desc: "輕鬆過夜的西雅圖小旅行，含經典景點、海鮮餐廳、航空博物館、Trader Joe's 與 Seattle Premium Outlets，含住宿。",
    intro:
      "享受一趟舒適的西雅圖過夜小旅行，結合經典景點、在地美食、航空歷史與精品 Outlet 購物。兩日行程適合想花更多時間在西雅圖、又不想自行跨境開車、安排住宿、找停車或拖著大包小包行李的旅人。含住宿、專車與專業導遊，是更輕鬆舒適的西雅圖體驗方式。",
    duration: "2 日 1 夜",
    language: "中文 / 英文 / 韓文",
    price: "USD $370 起 / 每位",
    gratuity: "USD $40 / 每位（兩日）",
    itinerary: [
      { stop: "Day 1", title: "Kerry Park 觀景點", body: "以西雅圖經典天際線開啟旅程，晴天可同時望見太空針塔、市中心、普吉灣與雷尼爾山。" },
      { stop: "Day 1", title: "派克市場", body: "走訪西雅圖最著名的公共市場，欣賞新鮮海鮮、在地店家、丟魚秀與西雅圖文化氛圍。" },
      { stop: "Day 1", title: "星巴克創始店", body: "造訪歷史悠久的全球第一家星巴克，感受最具代表性的西雅圖地標之一。" },
      { stop: "Day 1", title: "The Crab Pot 海鮮餐廳", body: "於西雅圖知名海濱海鮮餐廳安排用餐停留，餐費另計，可依個人喜好點選。" },
      { stop: "Day 1", title: "Museum of Flight 航空博物館", body: "世界上最大的獨立航空與太空博物館之一。門票自費自選。" },
      { stop: "Day 1", title: "Trader Joe's", body: "加拿大旅客最愛的美式超市之一，零食、香料、特色商品與環保袋皆是熱門選擇。" },
      { stop: "Day 2", title: "太空針塔 / Chihuly 玻璃博物館", body: "可自費自選登上太空針塔，或參觀 Chihuly 玻璃藝術花園。" },
      { stop: "Day 2", title: "Gas Works Park", body: "西雅圖最特別的公園之一，以工業遺跡與隔著聯合湖的天際線景觀聞名。" },
      { stop: "Day 2", title: "華盛頓大學", body: "漫步美麗的華盛頓大學校園，視當日開放狀況走訪 Suzzallo 圖書館外觀或可進入區域。" },
      { stop: "Day 2", title: "Seattle Premium Outlets", body: "以充裕的購物時間結束旅程，多家國際與設計師品牌任您選購。" },
    ],
    roomOptions: [
      { label: "家庭／團體四人房", guests: "4 位旅客", price: "USD $370 起 / 每位" },
      { label: "三人共用房", guests: "3 位旅客", price: "USD $400 起 / 每位" },
      { label: "雙人私人房", guests: "2 位旅客", price: "USD $430 起 / 每位" },
    ],
    roomNote: "多人同行時，由於住宿費用可共同分攤，因此每位旅客價格會更優惠。",
    included: ["1 晚飯店住宿", "舒適專車", "專業導遊", "行程內景點停車費"],
    notIncluded: ["5% 稅金", "餐食", "景點門票", "建議導遊小費"],
    optional: ["太空針塔門票", "Chihuly 玻璃花園門票", "Museum of Flight 門票"],
    notes: ["由加拿大入境美國旅客請攜帶有效護照，並確認美國簽證或 ESTA 是否符合資格。"],
    bookingCta: "預訂西雅圖兩日小旅行",
  },
  {
    slug: "victoria-1-day",
    img: victoriaHero,
    gallery: victoriaGallery,
    title: "維多利亞一日遊｜英倫風情與海岸花園",
    desc: "含 BC Ferries 來回渡輪的離島一日遊，走訪維多利亞內港、漁人碼頭、政府街與可選的布查特花園。",
    intro:
      "用一段順暢的一日行程，感受維多利亞的優雅。本行程含來回 BC Ferries 渡輪，帶您穿越美麗的喬治亞海峽與海灣群島，抵達不列顛哥倫比亞省充滿魅力的首府——以歷史建築、美麗港灣、彩色水上屋與世界知名花園聞名。專業安排，免去自駕、訂船與島上停車的繁瑣。",
    duration: "1 日",
    language: "中文 / 英文 / 韓文",
    price: "USD $170 起 / 每位",
    gratuity: "USD $20 / 每位",
    itinerary: [
      { stop: "景點 1", title: "BC Ferries 海上巡航", body: "搭乘渡輪穿越壯麗的喬治亞海峽與海灣群島，享受海景、清新空氣與悠閒節奏。" },
      { stop: "景點 2", title: "布查特花園 The Butchart Gardens", body: "維多利亞最著名的景點之一，亦為世界知名花園。門票為自費選項。" },
      { stop: "景點 3", title: "漁人碼頭 Fisherman's Wharf", body: "色彩繽紛的水上屋社區，可享用在地美食、欣賞港灣景觀與悠閒海濱氛圍。" },
      { stop: "景點 4", title: "Mile Zero 紀念碑", body: "加拿大橫貫公路的象徵起點，亦可眺望周邊海岸風光。" },
      { stop: "景點 5", title: "內港與政府街", body: "漫步維多利亞市中心：BC 議會大樓、Fairmont Empress 帝后飯店、海濱景觀、商店、咖啡廳與英倫風街景。" },
    ],
    included: ["舒適專車", "專業導遊", "BC Ferries 來回船票", "車輛上船費用", "行程內景點停車費"],
    notIncluded: ["5% 稅金", "餐食", "景點門票", "建議導遊小費"],
    optional: ["布查特花園門票"],
    notes: ["渡輪甲板與港灣區域風較大，建議備防風外套與舒適步行鞋。"],
    bookingCta: "預訂維多利亞一日遊",
  },
  {
    slug: "whistler-1-day",
    img: whistlerHero,
    gallery: whistlerGallery,
    title: "惠斯勒一日遊｜海天公路與高山小鎮",
    desc: "沿著海天公路的高山一日遊，走訪 Porteau Cove、香農瀑布、Squamish、Brandywine 瀑布與惠斯勒村。",
    intro:
      "沿著壯麗的海天公路（Sea-to-Sky Highway）一路前行，欣賞不列顛哥倫比亞省最美的海岸與山景。本行程結合海岸觀景點、瀑布、森林步道、高山風光與聞名世界的惠斯勒村，適合想輕鬆享受山林、無需自行開蜿蜒山路與找停車位的旅客。",
    duration: "1 日",
    language: "中文 / 英文 / 韓文",
    price: "USD $130 起 / 每位",
    gratuity: "USD $20 / 每位",
    itinerary: [
      { stop: "景點 1", title: "Porteau Cove", body: "海天公路上的人氣觀景點，可欣賞 Howe Sound 海灣、海岸山脈與廣闊海景。" },
      { stop: "景點 2", title: "香農瀑布 Shannon Falls", body: "不列顛哥倫比亞省最高的瀑布之一，沿森林步道短程走至觀景台。" },
      { stop: "景點 3", title: "Squamish", body: "途經加拿大戶外運動之都，遠眺著名的 Stawamus Chief 花崗岩巨石。" },
      { stop: "景點 4", title: "Brandywine 瀑布", body: "穿越森林步道，眺望氣勢磅礡的 Brandywine 瀑布。" },
      { stop: "景點 5", title: "惠斯勒村", body: "於行人友善的高山度假村自由活動，逛商店、咖啡廳、餐廳與藝廊，並於奧運五環處留影。" },
    ],
    included: ["舒適專車", "專業導遊", "行程內景點停車費"],
    notIncluded: ["5% 稅金", "餐食", "景點門票", "建議導遊小費"],
    optional: ["Peak 2 Peak 高空纜車"],
    notes: ["惠斯勒山區氣溫通常較溫哥華低，建議攜帶保暖層、防風外套與舒適步行鞋。"],
    bookingCta: "預訂惠斯勒一日遊",
  },
  {
    slug: "rockies-3-day",
    img: tourRockies,
    gallery: [tourRockies, tourBanff, tourIcefield],
    title: "加拿大洛磯山三日遊｜班夫・夢蓮湖・冰原大道",
    desc: "從卡加利出發的三日洛磯山行程，走訪班夫、露易絲湖、夢蓮湖、哥倫比亞冰原、佩托湖與翡翠湖，含住宿。",
    intro:
      "用三天時間，舒適完整地體驗加拿大洛磯山脈。本行程從卡加利出發，走訪班夫、露易絲湖、夢蓮湖、弓湖、佩托湖、翡翠湖、哥倫比亞冰原與其他經典山岳景點。為想欣賞洛磯山美景、又不想長途自駕、找停車與規劃景點的旅客專業安排。",
    duration: "3 日 2 夜",
    language: "中文 / 英文 / 韓文",
    price: "USD $830 起 / 每位",
    gratuity: "USD $60 / 每位（三日，每日 USD $20 計算）",
    pickup: "出發：第一日約上午 11:20 卡加利機場集合。返程：第三日約下午 5:00 抵達卡加利機場。",
    itinerary: [
      { stop: "Day 1", title: "卡加利機場接機", body: "於卡加利機場與導遊會合，啟程前往班夫國家公園。" },
      { stop: "Day 1", title: "班夫小鎮", body: "於班夫小鎮享用午餐、購物，輕鬆認識這座山中度假小鎮。" },
      { stop: "Day 1", title: "Cascade of Time Garden", body: "走訪班夫大街附近的歷史花園，欣賞景觀步道與山景。" },
      { stop: "Day 1", title: "班夫纜車", body: "可選擇加購搭乘班夫纜車（Banff Gondola）。" },
      { stop: "Day 1", title: "Fairmont Banff Springs Hotel 城堡飯店", body: "造訪班夫最具代表性的城堡式溫泉飯店外觀。" },
      { stop: "Day 1", title: "弓河瀑布 Bow Falls", body: "鄰近班夫春溪飯店的瀑布觀景點。" },
      { stop: "Day 1", title: "Surprise Corner", body: "經典觀景點，遠眺 Fairmont Banff Springs 飯店與周圍山景。" },
      { stop: "Day 2", title: "弓湖 Bow Lake", body: "冰原大道沿線的冰川湖泊，環抱壯麗山景。" },
      { stop: "Day 2", title: "哥倫比亞冰原 Columbia Icefield", body: "加拿大洛磯山中最壯觀的冰原區之一。冰原雪車體驗為自費選項。" },
      { stop: "Day 2", title: "佩托湖 Peyto Lake", body: "洛磯山最具代表性的綠松石色湖泊觀景點之一。" },
      { stop: "Day 2", title: "翡翠湖 Emerald Lake", body: "湖水色彩鮮明、山景倒映、氛圍寧靜的高山湖泊。" },
      { stop: "Day 3", title: "Two Jack Lake", body: "以班夫附近寧靜的湖景與山影倒映揭開第三天序幕。" },
      { stop: "Day 3", title: "夢蓮湖 Moraine Lake", body: "加拿大最具代表性的湖泊之一，以綠松石湖水與十峰山景聞名。實際造訪須依季節通行規定、接駁車與國家公園管理規範。" },
      { stop: "Day 3", title: "露易絲湖 Lake Louise", body: "聞名世界的露易絲湖，冰川湖水與山景倒映，是洛磯山的經典之一。" },
      { stop: "Day 3", title: "卡加利機場送機", body: "約下午 5:00 抵達卡加利機場，結束行程。" },
    ],
    roomOptions: [
      { label: "家庭／團體四人房", guests: "4 位旅客", price: "USD $830 起 / 每位" },
      { label: "三人共用房", guests: "3 位旅客", price: "USD $890 起 / 每位" },
      { label: "雙人私人房", guests: "2 位旅客", price: "USD $1050 起 / 每位" },
    ],
    roomNote: "多人同行時，由於住宿費用可共同分攤，因此每位旅客價格會更優惠。",
    included: ["飯店住宿", "舒適專車", "司機 / 導遊", "國家公園通行證", "行程內景點停車費"],
    notIncluded: ["機票", "餐食", "個人花費", "5% 稅金", "選購體驗", "建議導遊小費"],
    optional: [
      "班夫纜車體驗：成人 USD $90 / 6–15 歲兒童 USD $60",
      "哥倫比亞冰原體驗：成人 USD $100 / 6–15 歲兒童 USD $60",
      "夢蓮湖接駁／通行費：USD $16",
    ],
    notes: [
      "山區天氣多變，建議洋蔥式穿搭、舒適步行鞋與保暖外套。",
      "夢蓮湖是否能造訪須依季節道路規定、接駁車與加拿大國家公園規範。",
    ],
    bookingCta: "預訂洛磯山三日遊",
  },
  {
    slug: "custom-tour",
    img: tourPrivate,
    gallery: [tourPrivate],
    title: "私人客製行程｜即將推出",
    desc: "為彈性行程、私人交通與客製旅程而設的私人包團服務，即將推出。",
    intro:
      "為需要彈性行程、私人交通或客製旅遊規劃的旅客所推出的私人包團服務即將上線。此頁面目前保留作為未來行程擴充使用。如需私人包團或客製團體安排，歡迎聯絡 Shooting Star Travel。",
    duration: "客製",
    language: "中文 / 英文 / 韓文",
    price: "客製報價",
    itinerary: [
      { stop: "—", title: "私人行程規劃", body: "依您的人數、日期、興趣與節奏量身設計路線。" },
      { stop: "—", title: "彈性接送地點", body: "依您的旅行安排調整接送時間與地點。" },
      { stop: "—", title: "客製目的地需求", body: "告訴我們想去的地方，我們為您規劃。" },
      { stop: "—", title: "小團或私人包團", body: "可服務情侶、家庭與各種規模的私人團體。" },
    ],
    included: ["依客製行程確認"],
    notIncluded: ["依客製行程確認"],
    notes: ["依行程內容、人數、住宿需求與旅遊日期客製報價。"],
    bookingCta: "索取客製行程報價",
  },
];

export function getTour(slug: string) {
  return tours.find((t) => t.slug === slug);
}
