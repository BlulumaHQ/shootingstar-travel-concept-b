import { getRouteApi } from "@tanstack/react-router";
import type { HeroSlideRow } from "./heroSlides";

const rootApi = getRouteApi("__root__");

/** Published hero slides from Supabase, or `null` if the request failed. */
export function useHeroSlides(): HeroSlideRow[] | null {
  const data = rootApi.useLoaderData() as { heroSlides: HeroSlideRow[] | null };
  return data.heroSlides ?? null;
}
