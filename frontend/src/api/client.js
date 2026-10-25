const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/+$/, '')
const TOKEN_KEY = 'justshop-token'

export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export function getAuthToken() {
  return window.localStorage.getItem(TOKEN_KEY)
}

export function saveAuthToken(token) {
  window.localStorage.setItem(TOKEN_KEY, token)
}

async function request(path, { body, ...options } = {}) {
  const token = getAuthToken()
  let response

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    })
  } catch {
    throw new ApiError('Unable to reach the JustShop service. Check that the backend is running.', 0)
  }

  const responseText = await response.text()
  let responseBody

  try {
    responseBody = responseText ? JSON.parse(responseText) : null
  } catch {
    responseBody = responseText
  }

  if (!response.ok) {
    const message = typeof responseBody === 'string'
      ? responseBody
      : responseBody?.message || responseBody?.detail || responseBody?.error
    throw new ApiError(message || `The request failed with status ${response.status}.`, response.status)
  }

  return responseBody
}

export const api = {
  getProducts() {
    return request('/products')
  },
  register({ fullName, email, password }) {
    return request('/auth/register', {
      method: 'POST',
      body: { fullName, email, password },
    })
  },
  login({ email, password }) {
    return request('/auth/login', {
      method: 'POST',
      body: { email, password },
    })
  },
  checkout({ checkoutDto, items }) {
    return request('/orders/checkout', {
      method: 'POST',
      body: { checkoutDto, items },
    })
  },
}
