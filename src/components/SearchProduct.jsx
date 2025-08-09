import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFullProduct, searchProducts } from "../store/slice/ProductSlice";
import { useNavigate } from "react-router-dom";

const SearchProduct = ({ setOpenMenu }) => {
  const [searchVal, setSearchVal] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { searchedProductList } = useSelector((state) => state.products);
  const handleSearch = async () => {
    dispatch(searchProducts(searchVal));
  };

  const openSearchProduct = async (id) => {
    setOpenMenu(false);
    dispatch(fetchFullProduct(id));
    setSearchVal("");
    navigate(`/fullPageProduct/${id}`);
  };

  useEffect(() => {
    handleSearch();
  }, [searchVal]);
  return (
    <div className="navbar-search">
      <input
        type="text"
        className="search-input"
        placeholder="Search products..."
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
      />
      <div className="searched-product-container">
        {searchedProductList?.length > 0
          ? searchedProductList?.map((product) => {
              return (
                <div
                  className="search-product-box"
                  onClick={() => openSearchProduct(product.id)}
                >
                  <div>
                    <p>{product.name}</p>
                  </div>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default SearchProduct;
