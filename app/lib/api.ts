export type ApiFetchOptions = RequestInit & {
  baseUrl?: string;
  parseAs?: "json" | "text" | "blob";
};

export async function apiFetch<T>(url: string, options: ApiFetchOptions = {}) {
  const { baseUrl, parseAs = "json", ...init } = options;
  const target = baseUrl ? new URL(url, baseUrl).toString() : url;
  const response = await fetch(target, init);

  if (!response.ok) {
    let message = "Request failed";

    try {
      message = await response.text();
    } catch {
      message = "Request failed";
    }

    throw new Error(message);
  }

  if (parseAs === "text") {
    return (await response.text()) as T;
  }

  if (parseAs === "blob") {
    return (await response.blob()) as T;
  }

  return (await response.json()) as T;
}
