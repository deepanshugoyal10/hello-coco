import { fetchOrders } from "@/helpers/api";

export async function GET() {
  const result = await fetchOrders();
  return Response.json(result);
}
