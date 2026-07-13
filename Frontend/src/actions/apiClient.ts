import API_URL from "../config/api";

interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
  errors?: Array<{ msg: string }>;
}

export const apiRequest = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
  const token = localStorage.getItem("token");
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${API_URL}${path}`, { ...options, headers });
  const payload = await response.json() as ApiEnvelope<T>;

  if (!response.ok) {
    throw new Error(payload.errors?.[0]?.msg ?? payload.message ?? "Request failed");
  }

  return payload.data;
};
