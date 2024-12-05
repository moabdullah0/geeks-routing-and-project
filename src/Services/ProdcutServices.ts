import HttpServices from "./Http-services";
export interface Products {
    id?: number;
    name: string;
    category: string;
    price: number;
    image_url: string;
    description: string;
    brand: string;
  }
const apiProduct = new HttpServices<Products>("/products");
export default apiProduct