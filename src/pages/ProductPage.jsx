import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  fetchProduct,
  updateProduct,
  deleteProduct,
} from "../components/AxiosUtils";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({
    _id: "",
    name: "",
    price: "",
    quantity: "",
    category: "",
  });

  useEffect(() => {
    const getProduct = async () => {
      try {
        const productData = await fetchProduct(id);
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    getProduct();
  }, [id]);

  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(id, product);
      // Optionally update local state or perform any necessary actions
      window.history.go(-1);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(id);
      // Navigate back to the previous page
      window.history.go(-1);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  return (
    <div className="container mx-auto bg-gray-100 my-[3rem] rounded-lg shadow-sm shadow-slate-400 p-[3rem]">
      <h1 className="text-3xl font-bold mb-4">Product Details</h1>
      <form onSubmit={handleUpdateFormSubmit} className="mt-2">
        <label className="block mb-2">
          Name:
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2"
          />
        </label>
        <label className="block mb-2">
          Price:
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2"
          />
        </label>
        <label className="block mb-2">
          Quantity:
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2"
          />
        </label>
        <label className="block mb-2">
          Category:
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
        >
          Delete
        </button>
      </form>
    </div>
  );
}

export default ProductPage;
