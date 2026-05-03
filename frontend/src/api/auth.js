import { API_BASE_URL } from "./api";

const parseResponseBody = async (response) => {
  const text = await response.text();

  try {
    return text ? JSON.parse(text) : {};
  } catch (err) {
    return { message: text };
  }
};

const authRequest = async (path, payload) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await parseResponseBody(response);

  if (!response.ok) {
    throw new Error(data?.message || "Request failed");
  }

  return data;
};

export const signup = (payload) => authRequest("/api/auth/signup", payload);

export const login = (payload) => authRequest("/api/auth/login", payload);
