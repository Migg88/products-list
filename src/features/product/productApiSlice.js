import apiSlice from "../../app/api/apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchProducts: builder.query({
      query: ({page, limit}) => ({
        url: `/products?page=${page}&limit=${limit}`,
        method: 'GET'
      }),
      providesTags: (result = [], error, arg) =>
        result?.products ? result.products.map(({ id }) => ({ type: 'Product', id })) : [],
      onCacheEntryAdded: async (arg, { updateCachedData, dispatch }) => {
        try {
          const products = await updateCachedData((draft) => draft); 
          dispatch(setProducts(products)); 
        } catch {}
      },
    }),
  }),
});

export const {
  useFetchProductsQuery,
} = productsApiSlice;
