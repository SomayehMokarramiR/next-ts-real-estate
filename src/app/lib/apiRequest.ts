export async function apiRequest<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(url, {
    ...options,

    credentials: "include",

    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const text = await response.text();

  console.log("API URL:", url);
  console.log("API STATUS:", response.status);
  console.log("API RAW RESPONSE:", text);

  let data: T;

  try {
    data = text ? JSON.parse(text) : ({} as T);
  } catch {
    throw new Error(`پاسخ API معتبر نیست. Status: ${response.status}`);
  }

  console.log("API DATA:", data);

  if (!response.ok) {
    const errorData = data as {
      message?: string;
    };

    throw new Error(errorData.message || "خطایی در درخواست رخ داده است");
  }

  return data;
}
