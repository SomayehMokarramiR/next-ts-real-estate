export async function apiRequest(url: string, options?: RequestInit) {
  const response = await fetch(url, {
    credentials: "include",

    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },

    ...options,
  });

  const text = await response.text();

  let data;

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(data.message || "خطایی در درخواست رخ داده است");
  }

  return data;
}
