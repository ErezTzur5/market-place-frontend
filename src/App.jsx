import React, { useEffect, useState } from "react";
import "./index.css";

import {
  fetchProducts,
  deleteProduct,
  updateProduct,
  createProduct,
} from "./components/AxiosUtils";

function App() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
  });
  const [currentProduct, setCurrentProduct] = useState({
    _id: "",
    name: "",
    price: "",
    quantity: "",
    category: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault();
    const updatedProduct = { ...currentProduct };

    try {
      const updatedProductData = await updateProduct(
        currentProduct._id,
        updatedProduct
      );
      setProducts(
        products.map((product) =>
          product._id === currentProduct._id
            ? { ...product, ...updatedProductData }
            : product
        )
      );
      setCurrentProduct({
        _id: "",
        name: "",
        price: "",
        quantity: "",
        category: "",
      });
      setIsEdit(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleCurrentProductChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({
      ...currentProduct,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdProduct = await createProduct(newProduct);
      setProducts([...products, createdProduct]);
      setNewProduct({ name: "", price: "", quantity: "", category: "" });
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleEditClick = (product) => {
    setIsEdit(true);
    setCurrentProduct(product);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
    setProducts((prevProducts) =>
      [...prevProducts].sort((a, b) => {
        if (a[field] < b[field]) return order === "asc" ? -1 : 1;
        if (a[field] > b[field]) return order === "asc" ? 1 : -1;
        return 0;
      })
    );
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto bg-gray-100 my-[3rem] rounded-lg shadow-sm shadow-slate-400 p-[3rem]">
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={handleSearchChange}
        className="border border-gray-300 rounded-md p-2 mb-4 mr-2"
      />
      <button
        onClick={() => handleSort("price")}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
      >
        Sort by Price {sortOrder === "asc" && sortField === "price" ? "↑" : "↓"}
      </button>
      <button
        onClick={() => handleSort("category")}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Sort by Category{" "}
        {sortOrder === "asc" && sortField === "category" ? "↑" : "↓"}
      </button>
      <div className="w-[80%]">
        <ul className="mt-4 grid grid-cols-3 grid-rows-3">
          {filteredProducts.map((product) => (
            <li
              key={product._id}
              className="border-b border-gray-300 py-2 hover:bg-gray-200 flex justify-between h-[20vh] w-[50%] flex-col "
            >
              <h1>
                {product.name.length > 20
                  ? `${product.name.slice(0, 20)}...`
                  : product.name}
              </h1>
              <p>Price -${product.price} </p> <p>Units - {product.quantity}</p>{" "}
              <p>Category -{product.category}</p>
              <div>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEditClick(product)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded ml-2"
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* Create Form */}
      <h2 className="text-2xl font-bold mt-4">Create Product</h2>
      <form onSubmit={handleSubmit} className="mt-2">
        <label className="block mb-2">
          Name:
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleNewProductChange}
            className="border border-gray-300 rounded-md p-2"
          />
        </label>
        <label className="block mb-2">
          Price:
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleNewProductChange}
            className="border border-gray-300 rounded-md p-2"
          />
        </label>
        <label className="block mb-2">
          Quantity:
          <input
            type="number"
            name="quantity"
            value={newProduct.quantity}
            onChange={handleNewProductChange}
            className="border border-gray-300 rounded-md p-2"
          />
        </label>
        <label className="block mb-2">
          Category:
          <input
            type="text"
            name="category"
            value={newProduct.category}
            onChange={handleNewProductChange}
            className="border border-gray-300 rounded-md p-2"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create
        </button>
      </form>
      {/* Update Form */}
      {isEdit ? (
        <div className="">
          <h2 className="text-2xl font-bold mt-4">Update Product</h2>
          <form onSubmit={handleUpdateFormSubmit} className="mt-2">
            <label className="block mb-2">
              Name:
              <input
                type="text"
                name="name"
                value={currentProduct.name}
                onChange={handleCurrentProductChange}
                className="border border-gray-300 rounded-md p-2"
              />
            </label>
            <label className="block mb-2">
              Price:
              <input
                type="number"
                name="price"
                value={currentProduct.price}
                onChange={handleCurrentProductChange}
                className="border border-gray-300 rounded-md p-2"
              />
            </label>
            <label className="block mb-2">
              Quantity:
              <input
                type="number"
                name="quantity"
                value={currentProduct.quantity}
                onChange={handleCurrentProductChange}
                className="border border-gray-300 rounded-md p-2"
              />
            </label>
            <label className="block mb-2">
              Category:
              <input
                type="text"
                name="category"
                value={currentProduct.category}
                onChange={handleCurrentProductChange}
                className="border border-gray-300 rounded-md p-2"
              />
            </label>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Update
            </button>
          </form>
        </div>
      ) : (
        <div className="pointer-events-none opacity-50">
          <h2 className="text-2xl font-bold mt-4">Update Product</h2>
          <form onSubmit={handleUpdateFormSubmit} className="mt-2">
            <label className="block mb-2">
              Name:
              <input
                type="text"
                name="name"
                value={currentProduct.name}
                onChange={handleCurrentProductChange}
                className="border border-gray-300 rounded-md p-2"
              />
            </label>
            <label className="block mb-2">
              Price:
              <input
                type="number"
                name="price"
                value={currentProduct.price}
                onChange={handleCurrentProductChange}
                className="border border-gray-300 rounded-md p-2"
              />
            </label>
            <label className="block mb-2">
              Quantity:
              <input
                type="number"
                name="quantity"
                value={currentProduct.quantity}
                onChange={handleCurrentProductChange}
                className="border border-gray-300 rounded-md p-2"
              />
            </label>
            <label className="block mb-2">
              Category:
              <input
                type="text"
                name="category"
                value={currentProduct.category}
                onChange={handleCurrentProductChange}
                className="border border-gray-300 rounded-md p-2"
              />
            </label>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Update
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
