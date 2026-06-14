import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://eiblzjvjscwwfnswrltn.supabase.co";
const SUPABASE_KEY = "sb_publishable_SxT7OrCqFdnHhGOgXpLxAA_fTEgHD_t";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: "sst-admin-auth",
  },
});

export type ReviewRow = {
  id: string;
  name: string | null;
  avatar: string | null;
  tour_slug: string | null;
  tour_label: string | null;
  rating: number | null;
  text: string | null;
  photos: string[] | null;
  status: "pending" | "approved" | "rejected" | string;
  created_at: string;
};
