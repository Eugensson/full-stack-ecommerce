const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const getAllProduct = async () => {
  const res = await fetch(`${API_URL}/products`);

  if (!res.ok) throw new Error("Error");

  const data = await res.json();

  return data;
};

export const getProductById = async (id: string) => {
  const res = await fetch(`${API_URL}/products/${id}`);

  if (!res.ok) throw new Error("Error");

  const data = await res.json();

  return data;
};
