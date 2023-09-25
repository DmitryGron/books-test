import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Book, SearchState } from "../../types/types";

const initialState: SearchState = {
  loading: false,
  error: null,
  searchTerm: "",
  results: [],
  totalItems: 0,
  currentPage: 1, // Initialize currentPage to 1
  resultsPerPage: 10, // You can adjust the number of results per page
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    setTotalItems: (state, action: PayloadAction<number>) => {
      state.totalItems = action.payload;
    },
    searchSuccess: (state, action: PayloadAction<Book[]>) => {
      state.loading = false;
      const { resultsPerPage } = state;
      const newResults = action.payload;

      // Calculate the total number of pages
      const totalPages = Math.ceil(newResults.length / resultsPerPage);

      // Split the results into pages
      const pages: Book[][] = [];
      for (let i = 0; i < totalPages; i++) {
        const start = i * resultsPerPage;
        const end = start + resultsPerPage;
        const page = newResults.slice(start, end);
        pages.push(page);
      }

      state.results = pages;
    },
    searchError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const {
  startLoading,
  searchSuccess,
  searchError,
  setSearchTerm,
  setCurrentPage,
  setTotalItems,
} = searchSlice.actions;

export default searchSlice.reducer;
