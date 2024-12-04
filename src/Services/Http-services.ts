import apiClient from "./api-client";

class HttpServices<T> {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  getData() {
    const controller = new AbortController();
    const request = apiClient.get<T[]>(this.endpoint, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }
}
export default HttpServices;
