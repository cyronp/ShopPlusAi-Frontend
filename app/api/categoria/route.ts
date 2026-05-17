const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:8080";

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/categoria`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return new Response("Failed to fetch categories", { status: 502 });
    }

    const data = await response.json();
    return Response.json(data);
  } catch {
    return new Response("Upstream error", { status: 502 });
  }
}
