export async function fetchProducts() {
  const response = await fetch("/api/products/fetch");
  const data = await response.json();
  return data;
}
