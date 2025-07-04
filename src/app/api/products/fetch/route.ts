import { fetchProducts } from "@/helpers/api";
import { supabase } from "../../../../../lib/supabase";

export async function GET() {
  const result = await fetchProducts();
  return Response.json(result);
}
