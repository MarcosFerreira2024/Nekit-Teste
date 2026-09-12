export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message: string | null;
};

export type QueryParams = Record<string, string | number | boolean | undefined | null>;

const API_URL =
  (process.env.NEXT_PUBLIC_API_URL ?? "").trim() || "/api/backend";

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

function buildQueryString(params?: QueryParams): string {
  if (!params) return "";
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, String(value));
    }
  }
  const queryString = query.toString();
  return queryString ? `?${queryString}` : "";
}

async function request<T>(
  path: string,
  params: QueryParams | undefined,
  options?: RequestInit
): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}${buildQueryString(params)}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(options?.headers ?? {}),
      },
    });
  } catch {
    throw new ApiError("Não foi possível conectar ao servidor.", 0);
  }

  const rawBody = await response.json().catch(() => null);
  const body = rawBody as ApiResponse<T> | null;

  if (!response.ok || body?.success === false) {
    throw new ApiError(body?.message ?? response.statusText, response.status);
  }

  return (body?.data ?? rawBody) as T;
}

export const api = {
  get: <T>(path: string, params?: QueryParams) =>
    request<T>(path, params, { method: "GET" }),

  post: <T>(path: string, body?: unknown) =>
    request<T>(path, undefined, {
      method: "POST",
      body: JSON.stringify(body ?? null),
    }),

  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, undefined, {
      method: "PATCH",
      body: JSON.stringify(body ?? null),
    }),

  put: <T>(path: string, body?: unknown) =>
    request<T>(path, undefined, {
      method: "PUT",
      body: JSON.stringify(body ?? null),
    }),

  delete: <T>(path: string) => request<T>(path, undefined, { method: "DELETE" }),
};