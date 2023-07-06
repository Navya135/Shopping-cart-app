import { createContext, useContext, useReducer, useEffect, useState } from "react";
import axios from "axios";
import { cartReducer, productReducer } from "./Reducers";

const Cart = createContext();

const Context = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        const fetchedProducts = response.data && response.data.products;
        console.log("Fetched products:", fetchedProducts);
        setProducts(fetchedProducts);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    console.log("Products updated:", products);
  }, [products]);

  const [state, dispatch] = useReducer(cartReducer, {
    products: [],
    cart: [],
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });

  useEffect(() => {
    if (products.length > 0) {
      console.log("Initializing products:", products);
      dispatch({ type: "INITIALIZE_PRODUCTS", payload: products });
    }
  }, [products]);

  console.log("State:", state);

  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>
  );
};

export const CartState = () => {
  return useContext(Cart);
};

export default Context;
