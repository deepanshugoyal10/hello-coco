import { fetchProducts } from "@/helpers/api";
import { supabase } from "@supa";

export async function GET() {
  const result = await fetchProducts();
  return Response.json(result);
}
