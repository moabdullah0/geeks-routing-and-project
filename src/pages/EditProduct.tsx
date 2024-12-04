import { Dialog, DialogPanel } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import apiClient from "../Services/api-client";

interface Props {
  Edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}

const schema = z.object({
  name: z.string().min(2, "Name is required").max(255, "Name is too long"),
  category: z
    .string()
    .min(2, "Category is required")
    .max(255, "Category is too long"),
  price: z.number().min(0, "Price cannot be negative"),
  image_url: z.string().url("Invalid URL"),
  description: z
    .string()
    .min(2, "Description is required")
    .max(255, "Description is too long"),
  brand: z.string().min(2, "Brand is required").max(255, "Brand is too long"),
});

type schemaForm = z.infer<typeof schema>;

const EditProduct = ({ Edit, setEdit, id }: Props) => {
  const [product, setProduct] = useState<schemaForm | null>(null);

  // Fetch the product data by ID when the modal opens
  useEffect(() => {
    if (Edit && id) {
      apiClient.get(`/products/${id}`).then((response) => {
        setProduct(response.data); // Assuming the API response has the product data
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
    defaultValues: product ?? {}, // Set default values if product is loaded
  });

  useEffect(() => {
    if (product) {
      // Populate the form fields with the fetched product data
      Object.keys(product).forEach((key) => {
        setValue(key as keyof schemaForm, product[key as keyof schemaForm]);
      });
    }
  }, [product, setValue]);

  const onSubmit = (data: schemaForm) => {
    apiClient
      .put(`/products/${id}`, data) // Use PUT to update the existing product
      .then((response) => {
        console.log("Product updated:", response.data);
        setEdit(false); // Close the dialog on successful submission
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

              {/* Brand Field */}
              <div className="mb-5">
                <label
                  htmlFor="brand"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Brand
                </label>
                <input
                  {...register("brand")}
                  type="text"
                  id="brand"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter brand"
                />
                {errors.brand && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.brand.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
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
