import { getRouteApi } from "@tanstack/react-router";

const rootApi = getRouteApi("__root__");

export function useReviews() {
  const { reviews } = rootApi.useLoaderData() as { reviews: import("@/components/site/ReviewCard").Review[] };
  return reviews;
}
