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
    avatar: g1, name: "Mei-Lin Chen", country: "Taipei, TW", tour: "Rocky Mountain Classic", rating: 5,
    text: "The moment we stepped into Banff, I finally understood what it feels like to be embraced by a landscape. The guide was attentive and the pace never rushed.",
    photos: [tourBanff, tourRockies, destJasper, tourIcefield, destWhistler],
  },
  {
    avatar: g2, name: "Jihoon Park", country: "Seoul, KR", tour: "Aurora Chase Journey", rating: 5,
    text: "Our Korean-speaking guide was warm and thoughtful — the trip felt like travelling with an old friend. The night the aurora appeared, we all fell silent.",
    photos: [tourAurora, destYukon, tourRockies, destJasper, tourBanff, tourIcefield],
  },
  {
    avatar: g3, name: "The Wong Family", country: "Hong Kong", tour: "Rocky Mountain Classic", rating: 5,
    text: "The best memory we've had as a family — our kids already want to come back next year. The white expanse along the Icefields Parkway truly settles the heart.",
    photos: [tourRockies, tourIcefield, tourBanff, destJasper, destWhistler],
  },
  {
    avatar: g1, name: "Rachel L.", country: "Vancouver, CA", tour: "Banff Day Tour", rating: 5,
    text: "A short day that still captured the iconic lakes. Smooth logistics, clear storytelling — I shared it with friends as soon as I got home.",
    photos: [tourBanff, tourRockies, destJasper, tourIcefield, tourVictoria],
  },
  {
    avatar: g2, name: "Xiaorou", country: "Taichung, TW", tour: "Aurora Chase Journey", rating: 5,
    text: "Waiting at −25 °C and finally seeing the aurora made every minute worthwhile. The team also took so many beautiful photos for us.",
    photos: [tourAurora, destYukon, tourRockies, tourBanff, destJasper, destWhistler],
  },
  {
    avatar: g3, name: "Daniel K.", country: "Toronto, CA", tour: "Icefields Parkway", rating: 4,
    text: "The Skywalk is absolutely worth it and the guide was patient. Just hoping for a wider lunch selection next time.",
    photos: [tourIcefield, tourRockies, tourBanff, destJasper, destWhistler],
  },
  {
    avatar: g1, name: "Yuki S.", country: "Osaka, JP", tour: "Victoria Garden Journey", rating: 5,
    text: "Butchart Gardens really felt like stepping into a fairy tale. The sea breeze on the ferry was the gentlest memory of the whole trip.",
    photos: [tourVictoria, tourVancouver, tourBanff, destWhistler, tourRockies],
  },
  {
    avatar: g2, name: "Andy & Joy", country: "Singapore", tour: "Vancouver City Deep Dive", rating: 5,
    text: "We only planned a short stroll but came away with so much more. The café our guide recommended is still on our minds.",
    photos: [tourVancouver, tourToronto, tourVictoria, destWhistler, tourBanff, destJasper],
  },
  {
    avatar: g3, name: "Hyejin Kim", country: "Busan, KR", tour: "Private Custom Tour", rating: 5,
    text: "A trip designed for three generations of our family — even grandma was smiling the whole way. Truly worth every dollar.",
    photos: [tourRockies, tourBanff, destJasper, tourIcefield, tourVictoria, destWhistler],
  },
];
