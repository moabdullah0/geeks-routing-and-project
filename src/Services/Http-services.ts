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
  getByID(id: string | number | undefined) {
    return apiClient.get(this.endpoint + "/" + id);
  }
  postData(data: T) {
   return apiClient.post<T[]>(this.endpoint, data);
  }
  UpdateData(data:T,id:number|null){
  return  apiClient.put(this.endpoint + "/" + id, data);
  }
  deleteData(id:number|null){
return apiClient.delete(this.endpoint + "/" + id)
  }
}
export default HttpServices;
