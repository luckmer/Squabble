import { ApiServiceCore } from './apiServiceCore'

export class ApiService extends ApiServiceCore {
  get<T>(path: string, headers?: Record<string, string>): Promise<T> {
    return super._get(path, headers)
  }

  post<T>(path: string, body?: unknown, headers?: Record<string, string>): Promise<T> {
    return super._post(path, body, headers)
  }

  put<T>(path: string, body?: unknown, headers?: Record<string, string>): Promise<T> {
    return super._put(path, body, headers)
  }

  patch<T>(path: string, body?: unknown, headers?: Record<string, string>): Promise<T> {
    return super._patch(path, body, headers)
  }

  delete<T>(path: string, headers?: Record<string, string>): Promise<T> {
    return super._delete(path, headers)
  }
}
