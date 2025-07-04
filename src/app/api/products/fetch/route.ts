import { supabase } from "../../../../../lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_available", true)
      .order("id");

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({
      success: true,
      products: data,
      count: data.length,
    });
  } catch (error) {
    return Response.json(
      {
        error: "Failed to fetch products",
      },
      { status: 500 },
    );
  }
}
