import { API_BASE_URL } from "../config";

export async function apiRequest(path, options = {}) {
  const { token, body, headers = {}, ...rest } = options;
  const isFormData = body instanceof FormData;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  let data = {};
  try { data = await response.json(); } catch { data = {}; }

  if (!response.ok) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  return data;
}
