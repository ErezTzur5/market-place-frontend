import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    category: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/api/products/${id}`)
      .then(() => {
        setProducts(products.filter((product) => product._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  // const handleUpdate = (id) => {
  //   axios
  //     .put(`http://localhost:3000/api/products/${id}`, newProduct)
  //     .then(() => {
  //       setProducts(
  //         products.map((product) => {
  //           if (product._id === id) {
  //             return { ...product, ...newProduct };
  //           }
  //           return product;
  //         })
  //       );
  //     })
  //     .catch((error) => {
  //       console.error("Error updating product:", error);
  //     });
  // };

  const handleUpdate = (id) => {
    const updatedProduct = [];

    axios
      .put(`http://localhost:3000/api/products/${id}`, updatedProduct)
      .then(() => {
        setProducts(
          products.map((product) => {
            if (product._id === id) {
              return { ...product, ...updatedProduct };
            }
            return product;
          })
        );
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "price" ? Number(value) : value;
    setNewProduct({
      ...newProduct,
      [name]: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/products", newProduct)
      .then((response) => {
        setProducts([...products, response.data]);
        setNewProduct({ name: "", price: "", category: "" });
      })
      .catch((error) => {
        console.error("Error creating product:", error);
      });
  };

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - ${product.price} - {product.category}
            <button onClick={() => handleDelete(product._id)}>Delete</button>
            <button onClick={() => handleUpdate(product._id)}>Update</button>
          </li>
        ))}
      </ul>

      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={newProduct.category}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default App;
