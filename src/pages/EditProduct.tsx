import { Dialog, DialogPanel } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import apiClient from "../Services/api-client";
import { brand } from "./brand";
import apiProduct from "../Services/ProdcutServices";
import { schema, schemaForm } from "./schema";

interface Props {
  Edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}

const EditProduct = ({ Edit, setEdit, id }: Props) => {
  const [product, setProduct] = useState<schemaForm | null>(null);

  useEffect(() => {
    if (Edit && id) {
      apiProduct.getByID(id).then((response) => {
        setProduct(response.data);
      });
    }
  }, [Edit, id]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<schemaForm>({
    resolver: zodResolver(schema),
    defaultValues: product ?? {},
  });

  useEffect(() => {
    if (product) {
      Object.keys(product).forEach((key) => {
        setValue(key as keyof schemaForm, product[key as keyof schemaForm]);
      });
    }
  }, [product, setValue]);

  const onSubmit = (data: schemaForm) => {
    apiClient
      .put(`/products/${id}`, data)
      .then((response) => {
        console.log("Product updated:", response.data);
        setEdit(false);
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  return (
    <div className="w-full">
      <Dialog
        open={Edit}
        onClose={() => setEdit(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="max-w-sm mx-auto"
            >
              {/* Name Field */}
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  {...register("name")}
                  type="text"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter product name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Category Field */}
              <div className="mb-5">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <input
                  {...register("category")}
                  type="text"
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter product category"
                />
                {errors.category && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Price Field */}
              <div className="mb-5">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price
                </label>
                <input
                  {...register("price", { valueAsNumber: true })}
                  type="number"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter price"
                />
                {errors.price && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>

              {/* Image URL Field */}
              <div className="mb-5">
                <label
                  htmlFor="image_url"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Image URL
                </label>
                <input
                  {...register("image_url")}
                  type="url"
                  id="image_url"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter image URL"
                />
                {errors.image_url && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.image_url.message}
                  </p>
                )}
              </div>

              {/* Description Field */}
              <div className="mb-5">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  {...register("description")}
                  id="description"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter product description"
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div className="mb-5 border ">
                <select
                  {...register("brand")}
                  className="rounded w-full  focus:outline-none"
                >
                  {brand.map((brand) => (
                    <option>{brand}</option>
                  ))}
                </select>
                {errors.brand && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.brand.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </form>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => setEdit(false)}
                className="text-red-500 hover:text-red-700"
              >
                Cancel
              </button>
              <button
                onClick={() => setEdit(false)}
                className="text-yellow-500 hover:text-yellow-700"
              >
                Deactivate
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default EditProduct;
