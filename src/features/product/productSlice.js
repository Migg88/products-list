import { createSlice } from "@reduxjs/toolkit";
import { productsApiSlice } from "./productApiSlice";

const initialState = {
    products: []
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(productsApiSlice.endpoints.fetchProducts.matchPending, (state) => {
            state.loading = true;
        });
        builder.addMatcher(productsApiSlice.endpoints.fetchProducts.matchFulfilled, (state, action) => {
            state.products = [...state.products, ...action.payload.products];
            state.loading = false;
        });
        builder.addMatcher(productsApiSlice.endpoints.fetchProducts.matchRejected, (state) => {
            state.loading = false;
        });
    }
})

export const { addProduct } = productsSlice.actions;
export default productsSlice.reducer;