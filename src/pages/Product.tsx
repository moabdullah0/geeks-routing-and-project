import { useEffect, useState } from "react";
import EditProduct from "./EditProduct";
import AddProduct from "./AddProduct";
import Navbar from "./Navbar";
import { brand } from "./brand";
import apiProduct, { Products } from "../Services/ProdcutServices";

const Product = () => {
  const [products, setProduct] = useState<Products[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const [add, setAdd] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); 

  useEffect(() => {
    const { request, cancel } = apiProduct.getData();
    request.then((res) => {
      setProduct(res.data);
      setFilteredProducts(res.data);
    });
    return () => cancel();
  }, []);

  const FilterData = (selectedBrand: string) => {
    if (selectedBrand === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.brand === selectedBrand
      );
      setFilteredProducts(filtered);
    }
  };

  const handleSearch = () => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleDelete = (id: number) => {
    apiProduct.deleteData(id).then(() => {
      const updatedProducts = products.filter((product) => product.id !== id);
      setProduct(updatedProducts);
      setFilteredProducts(updatedProducts);
    });
  };

  return (
    <div>
      <Navbar />
      <AddProduct add={add} setAdd={setAdd} />

      {/* Search Bar */}
      <div className="border mx-5 border-gray-300 flex justify-between items-center w-full md:w-64 rounded-lg py-2 mb-5 mt-5">
        <input
          type="text"
          className="w-full px-4 py-2 rounded-lg focus:outline-none"
          placeholder="Search Products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state
        />
        <button
          className="bg-red-500 text-white px-6 py-2 rounded-lg ml-4"
          type="button"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* Brand Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-5">
        {brand.map((brandItem) => (
          <button
            key={brandItem}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            onClick={() => FilterData(brandItem)}
          >
            {brandItem}
          </button>
        ))}
        <button
          className="bg-gray-600 text-white px-5 py-2 rounded-lg hover:bg-gray-700"
          onClick={() => FilterData("")}
        >
          All Products
        </button>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-4 mt-5">
        {filteredProducts.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg overflow-hidden shadow-lg"
          >
            <div className="relative">
              <img
                src={item.image_url}
                alt={item.name}
                className="h-56 w-full object-cover"
              />
            </div>
            <div className="px-3 pt-5">
              <h1 className="text-xl text-red-400 font-semibold">
                {item.name}
              </h1>
              <p className="text-sm text-gray-600">{item.description}</p>
              <span className="bg-red-400 text-white mt-3 inline-block rounded-lg px-4 py-1">
                {item.brand}
              </span>
              <span className="bg-green-400 mx-5 text-white mt-3 inline-block rounded-lg px-4 py-1">
                {item.price} $
              </span>
            </div>
            <div className="flex items-center  justify-center gap-5 pb-5 mt-5">
              <button
                className="bg-green-500 px-5 py-1 rounded-md text-white hover:bg-green-600"
                onClick={() => setSelectedProductId(item.id!)}
              >
                Edit
              </button>

              <button
                className="bg-red-500 px-5 py-1 rounded-md text-white hover:bg-red-600"
                onClick={() => handleDelete(item.id!)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

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
