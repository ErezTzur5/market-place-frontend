import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchProducts, createProduct } from "../components/AxiosUtils";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";

function ProductsPage() {
  const location = useLocation();

  // State variables
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(9); // Products per page

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

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setSearchQuery(searchParams.get("search") || "");
    setSortField(searchParams.get("sortField") || null);
    setSortOrder(searchParams.get("sortOrder") || "asc");
    setMinPrice(parseInt(searchParams.get("minPrice")) || 0);
    setMaxPrice(parseInt(searchParams.get("maxPrice")) || 2000);
    setCurrentPage(parseInt(searchParams.get("page")) || 1);
  }, [location.search]);

  const handleSearchChange = (e) => {
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery); // Update searchQuery state with the new value from the input field
    setCurrentPage(1); // Reset currentPage to 1 when performing a new search
    updateURLParams({ search: newSearchQuery, page: 1 }); // Update URL parameters with the new search query and reset page to 1
  };

  const handleSort = (field) => {
    const newSortOrder =
      sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newSortOrder);
    updateURLParams({ sortField: field, sortOrder: newSortOrder, page: 1 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdProduct = await createProduct(newProduct);
      setProducts([...products, createdProduct]);
      setNewProduct({
        name: "",
        price: "",
        quantity: "",
        category: "",
      });
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const updateURLParams = (params) => {
    const searchParams = new URLSearchParams(location.search);
    Object.keys(params).forEach((key) => {
      if (params[key]) {
        searchParams.set(key, params[key]);
      } else {
        searchParams.delete(key);
      }
    });
    const newSearch = searchParams.toString();
    const newPath = `${location.pathname}${newSearch ? `?${newSearch}` : ""}`;
    window.history.replaceState({}, "", newPath);
  };

  // Filtered products based on search, price, and sort
  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((product) => product.price >= minPrice && product.price <= maxPrice)
    .sort((a, b) => {
      if (sortField === "price") {
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
      } else if (sortField === "category") {
        return sortOrder === "asc"
          ? a.category.localeCompare(b.category)
          : b.category.localeCompare(a.category);
      }
      return 0;
    });

  // Pagination logic
  const indexOfLastProduct = currentPage * perPage;
  const indexOfFirstProduct = indexOfLastProduct - perPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    updateURLParams({ page: pageNumber });
  };

  return (
    <>
      <div className="container mx-auto bg-gray-100 my-[3rem] rounded-lg shadow-sm shadow-slate-400 p-[3rem] flex flex-col justify-center items-center">
        <div className="nested-div">
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
            Sort by Price{" "}
            {sortOrder === "asc" && sortField === "price" ? "↑" : "↓"}
          </button>
          <button
            onClick={() => handleSort("category")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sort by Category{" "}
            {sortOrder === "asc" && sortField === "category" ? "↑" : "↓"}
          </button>
        </div>
        <div className="flex items-center  mt-4 w-[50%]">
          <label className="mr-4">Price Range:</label>
          <Slider
            min={0}
            max={2000} // Adjust max value based on your product prices
            value={[minPrice, maxPrice]}
            onChange={(value) => {
              setMinPrice(value[0]);
              setMaxPrice(value[1]);
              updateURLParams({
                minPrice: value[0],
                maxPrice: value[1],
                page: 1,
              });
            }}
            range
          />
          <Tooltip
            overlay={`${minPrice} - ${maxPrice}`}
            placement="top"
            align={{ offset: [0, -5] }}
          >
            <span className="ml-2 text-gray-600">
              (${minPrice} - ${maxPrice})
            </span>
          </Tooltip>
        </div>
        <div className="w-[80%]">
          <ul className="mt-4 grid grid-cols-3 grid-rows-3 ">
            {currentProducts.map((product) => (
              <li
                key={product._id}
                className="border-b border-gray-300 py-2 hover:bg-gray-200 flex justify-between h-[20vh] w-[50%] flex-col"
              >
                <Link to={`/product/${product._id}`} className="cursor-pointer">
                  <h1>
                    {product.name.length > 20
                      ? `${product.name.slice(0, 20)}...`
                      : product.name}
                  </h1>
                </Link>
                <p>Price - ${product.price} </p>
                <p>Units - {product.quantity}</p>
                <p>Category - {product.category}</p>
              </li>
            ))}
          </ul>
          {/* Pagination */}
          <div className="mt-4 flex justify-center">
            {Array.from(
              { length: Math.ceil(filteredProducts.length / perPage) },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`px-3 py-1 mx-1 rounded ${
                    currentPage === i + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              )
            )}
          </div>
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
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2"
            />
          </label>
          <label className="block mb-2">
            Price:
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2"
            />
          </label>
          <label className="block mb-2">
            Quantity:
            <input
              type="number"
              name="quantity"
              value={newProduct.quantity}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2"
            />
          </label>
          <label className="block mb-2">
            Category:
            <input
              type="text"
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Create
          </button>
        </form>
      </div>
    </>
  );
}

export default ProductsPage;
