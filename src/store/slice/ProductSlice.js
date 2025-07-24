import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import toast from "react-hot-toast";
import jsonProductsData from "../../admin/data/products.json";

export const products_list = [
  {
    id: 1,
    name: "Wireless Mouse",
    review: 4.2,
    price: 499.99,
    quantity: 1,
    category: "Electronics",
  },
  {
    id: 2,
    name: "Bluetooth Speaker",
    review: 4.2,
    price: 1299.5,
    quantity: 1,
    category: "Electronics",
  },
  {
    id: 3,
    name: "Gaming Keyboard",
    review: 3.2,
    price: 2499.0,
    quantity: 1,
    category: "Electronics",
  },
  {
    id: 4,
    name: "USB-C Charger",
    review: 4.6,
    price: 799.0,
    quantity: 1,
    category: "Electronics",
  },
  {
    id: 5,
    name: "Smart LED Bulb",
    review: 4.8,
    price: 349.75,
    quantity: 1,
    category: "Electronics",
  },
  {
    id: 6,
    name: "Noise Cancelling Headphones",
    review: 4.2,
    price: 4599.99,
    quantity: 1,
    category: "Electronics",
  },
  {
    id: 7,
    name: "External Hard Drive",
    review: 4.1,
    price: 3799.0,
    quantity: 1,
    category: "Electronics",
  },
  {
    id: 8,
    name: "Portable SSD",
    review: 4.3,
    price: 6999.99,
    quantity: 1,
    category: "Electronics",
  },
  {
    id: 9,
    name: "Fitness Band",
    review: 4.9,
    price: 1599.0,
    quantity: 1,
    category: "Electronics",
  },
  {
    id: 10,
    name: "Webcam HD",
    review: 2.2,
    price: 1099.5,
    quantity: 1,
    category: "Electronics",
  },
  {
    id: "B001",
    name: "Baby Romper Set",
    review: 3.9,
    price: 699,
    quantity: 90,
    image: "https://example.com/images/baby_romper.jpg",
    category: "Baby",
    description: "2-pack of short-sleeve cotton rompers with fun prints.",
  },
  {
    id: "B002",
    name: "Baby Wool Sweater",
    review: 3.9,
    price: 899,
    quantity: 40,
    image: "https://example.com/images/baby_sweater.jpg",
    category: "Baby",
    description: "Hand-knit wool sweater for infants aged 0-2 years.",
  },
  {
    id: "B003",
    name: "Baby Booties",
    review: 3.9,
    price: 299,
    quantity: 100,
    image: "https://example.com/images/baby_booties.jpg",
    category: "Baby",
    description: "Warm fleece booties with Velcro strap.",
  },
  {
    id: "B004",
    name: "Baby Onesie",
    review: 3.9,
    price: 499,
    quantity: 120,
    image: "https://example.com/images/baby_onesie.jpg",
    category: "Baby",
    description: "Cotton onesie with snap buttons for quick diaper changes.",
  },
  {
    id: "B005",
    name: "Baby Bib Set",
    review: 3.9,
    price: 199,
    quantity: 200,
    image: "https://example.com/images/baby_bib.jpg",
    category: "Baby",
    description: "Pack of 3 waterproof baby bibs with cartoon prints.",
  },
  {
    id: "B006",
    name: "Baby Sleeping Bag",
    review: 3.9,
    price: 1099,
    quantity: 25,
    image: "https://example.com/images/baby_sleep_bag.jpg",
    category: "Baby",
    description: "Quilted sleeping bag with zip and soft lining.",
  },
  {
    id: "B007",
    name: "Baby Cap and Mittens",
    review: 3.9,
    price: 299,
    quantity: 140,
    image: "https://example.com/images/baby_mittens.jpg",
    category: "Baby",
    description: "Cotton cap and mitten set to keep baby warm.",
  },
  {
    id: "B008",
    name: "Baby Frock",
    review: 3.9,
    price: 699,
    quantity: 80,
    image: "https://example.com/images/baby_frock.jpg",
    category: "Baby",
    description: "Floral frock with puff sleeves and bow tie.",
  },
  {
    id: "B009",
    name: "Baby Diaper Cover",
    review: 3.9,
    price: 249,
    quantity: 160,
    image: "https://example.com/images/baby_diaper_cover.jpg",
    category: "Baby",
    description: "Reusable diaper cover made of waterproof fabric.",
  },
  {
    id: "B010",
    name: "Baby Night Suit",
    review: 3.9,
    price: 599,
    quantity: 90,
    image: "https://example.com/images/baby_night_suit.jpg",
    category: "Baby",
    description: "2-piece cotton pajama set for babies 6-18 months.",
  },
  {
    id: "W001",
    name: "Women's Summer Dress",
    review: 3.9,
    price: 1299,
    quantity: 85,
    image: "/womenclothing.jpg",
    category: "Women",
    description: "Knee-length floral dress, ideal for summer outings.",
  },
  {
    id: "W002",
    name: "Women's Leggings",
    review: 3.9,
    price: 599,
    quantity: 200,
    image: "/womenclothing.jpg",
    category: "Women",
    description: "High-waisted leggings with moisture-wicking fabric.",
  },
  {
    id: "W003",
    name: "Women's Kurti",
    review: 3.9,
    price: 999,
    quantity: 120,
    image: "/womenclothing.jpg",
    category: "Women",
    description: "Printed cotton kurti with 3/4 sleeves and round neck.",
  },
  {
    id: "W004",
    name: "Women's Denim Jacket",
    review: 3.9,
    price: 1499,
    quantity: 50,
    image: "/womenclothing.jpg",
    category: "Women",
    description: "Cropped denim jacket with distressed detailing.",
  },
  {
    id: "W005",
    name: "Women's Saree",
    review: 3.9,
    price: 1999,
    quantity: 30,
    image: "/womenclothing.jpg",
    category: "Women",
    description: "Silk blend saree with contrast border and blouse piece.",
  },
  {
    id: "W006",
    name: "Women's Palazzo Pants",
    review: 3.9,
    price: 699,
    quantity: 95,
    image: "https://example.com/images/women_palazzo.jpg",
    category: "Women",
    description: "Wide-leg palazzos with elastic waistband and prints.",
  },
  {
    id: "W007",
    name: "Women's Crop Top",
    review: 3.9,
    price: 499,
    quantity: 160,
    image: "https://example.com/images/women_crop.jpg",
    category: "Women",
    description: "Stretchable cotton crop top with cap sleeves.",
  },
  {
    id: "W008",
    name: "Women's Night Suit",
    review: 3.9,
    price: 999,
    quantity: 100,
    image: "https://example.com/images/women_night_suit.jpg",
    category: "Women",
    description: "Two-piece cotton nightwear set with fun prints.",
  },
  {
    id: "W009",
    name: "Women's Sports Bra",
    review: 3.9,
    price: 799,
    quantity: 70,
    image: "https://example.com/images/women_sports_bra.jpg",
    category: "Women",
    description: "High-impact sports bra with padded cups and racerback.",
  },
  {
    id: "W010",
    name: "Women's Dupatta",
    review: 3.9,
    price: 349,
    quantity: 150,
    image: "https://example.com/images/women_dupatta.jpg",
    category: "Women",
    description: "Soft chiffon dupatta with printed border.",
  },
];

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  return products_list;
});

export const fetchFullProduct = createAsyncThunk(
  "products/fullPage",
  async (id) => {
    const data = products_list.find((x) => x.id === id);
    return data;
  }
);

export const loadJsonProducts = createAsyncThunk(
  "products/loadJsonProducts",
  async () => {
    const products = jsonProductsData;
    const categories = [
      ...new Set(products.map((p) => p.category).filter(Boolean)),
    ];
    return { products, categories };
  }
);

export const loadJsonProductsById = createAsyncThunk(
  "products/loadJsonProductsById",
  async (id) => {
    const product = jsonProductsData.find((p) => p.id === id);
    if (!product) throw new Error("Product not found");
    return product;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    FullProduct: [],
    searchedProductList: [],
    jsonProducts: [],
    categories: [],
    //Productpage category
    ProductCategories: [],
    jsonProductsById: null,
    isLoading: false,
    isError: false,
    toastMessage: "",
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    updateProduct: (state, action) => {
      const updated = action.payload;
      const index = state.products.findIndex((p) => p.id === updated.id);
      if (index !== -1) {
        state.products[index] = updated;
      }
      toast.success("Product updated successfully!");
    },
    addCategory: (state, action) => {
      const newCategory = action.payload;
      if (!state.categories.includes(newCategory)) {
        state.categories.push(newCategory);
      }
    },
    sortBy: (state, action) => {
      switch (action.payload) {
        case "price":
          state.products = [...state.products].sort(
            (a, b) => a.price - b.price
          );
          toast.success("Product sorted by price");
          break;
        case "name":
          state.products = [...state.products].sort((a, b) =>
            a.name.toUpperCase().localeCompare(b.name.toUpperCase())
          );
          toast.success("Product sorted by name");
          break;
      }
    },
    filterByCategory: (state, action) => {
      const filterCategoryVal = action.payload;
      if (filterCategoryVal.length > 0) {
        state.products = products_list.filter((x) =>
          filterCategoryVal.includes(x.category)
        );
      } else {
        state.products = products_list;
      }
    },
    searchProducts: (state, action) => {
      const searchVal = action.payload.toLowerCase();
      state.searchedProductList = searchVal
        ? state.products.filter((item) =>
            item.name.toLowerCase().includes(searchVal)
          )
        : [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Load dummy list
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const temp = action.payload.map((p) => p.category);
        const cat = [...new Set(temp)];

        state.ProductCategories = cat;
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.toastMessage = action.error.message || "Failed to fetch products";
      })

      // Load full dummy product
      .addCase(fetchFullProduct.fulfilled, (state, action) => {
        state.FullProduct = action.payload;
      })

      // Load from JSON
      .addCase(loadJsonProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadJsonProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jsonProducts = action.payload.products;
        state.categories = action.payload.categories;
      })
      .addCase(loadJsonProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.toastMessage =
          action.error.message || "Failed to load JSON products";
      })

      // Load JSON product by ID
      .addCase(loadJsonProductsById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadJsonProductsById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jsonProductsById = action.payload;
      })
      .addCase(loadJsonProductsById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.toastMessage =
          action.error.message || "Failed to load product by ID";
      });
  },
});

export const {
  setProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  sortBy,
  searchProducts,
  addCategory,
  filterByCategory,
} = productSlice.actions;

export default productSlice.reducer;
