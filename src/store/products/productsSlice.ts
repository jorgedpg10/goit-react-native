import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Product {
  id: number;
  title: string;
  brand: string;
}

interface ProductsState {
  items: Product[];
  status: 'inactive' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  currentPage: number;
}

export const fetchProducts = createAsyncThunk<Product[], number>(
  'products/fetchProducts',
  async (page, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`);
      return response.data.products;
    } catch (error) {
      // Check if the error is an AxiosError and has a response property
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);


const initialState: ProductsState = {
  items: [],
  status: 'inactive',
  error: null,
  currentPage: 1,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setPage } = productsSlice.actions;

