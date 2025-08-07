// src/components/AppInitializer.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { setProducts } from "../../redux/slices/productsSlice";
// import productsData from "../../data/products.json";

const AppInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(setProducts(productsData));
    // Add other global initializations here (e.g., load user, settings)
  }, [dispatch]);

  return null; // This component doesn't render anything
};

export default AppInitializer;
