export const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8080";

export async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || "The book request failed.");
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}
