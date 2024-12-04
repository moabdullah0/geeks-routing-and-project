import { useEffect, useState } from "react";
import HttpServices from "../Services/Http-services";
import EditProduct from "./EditProduct";
import AddProduct from "./AddProduct";
import axios from "axios";
import Navbar from "./Navbar";
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image_url: string;
  description: string;
  brand: string;
}

const Product = () => {
  const [products, setProduct] = useState<Product[]>();
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const [add, setAdd] = useState(false);
  const apiClient = new HttpServices<Product[]>("/products");

  useEffect(() => {
    const { request, cancel } = apiClient.getData();
    request.then((res) => setProduct(res.data));
    return () => cancel();
  }, []);

  const handleDelete = (id: number) => {
     axios.delete(`/products/${id}`).then(() => {
      setProduct(products?.filter((product) => product.id !== id));
    });
  };

  return (
    <div>
      <Navbar/>
      <AddProduct add={add} setAdd={setAdd} />
      <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-4 mt-5">
        {products?.map((item) => (
          <div key={item.id} className="border rounded-lg overflow-hidden ">
            <div>
              <img
                src={item.image_url}
                alt={item.name}
                className="h-56 w-full"
              />
            </div>
            <div className="px-3 pt-5">
              <h1 className="text-red-400">{item.name}</h1>
              <p>{item.description}</p>
            </div>
            <div className="flex items-center justify-center gap-5 pb-5">
              <button
                className="bg-green-500 px-5 py-1 rounded-md text-white"
                onClick={() => setSelectedProductId(item.id)}
              >
                Edit
              </button>

              <button
                className="bg-red-500 px-5 py-1 rounded-md text-white"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Product Modal */}
      {selectedProductId && (
        <EditProduct
          Edit={selectedProductId !== null}
          setEdit={() => setSelectedProductId(null)}
          id={selectedProductId}
        />
      )}
    </div>
  );
};

export default Product;
