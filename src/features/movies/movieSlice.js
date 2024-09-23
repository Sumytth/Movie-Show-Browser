import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from '../../common/apis/movieApi';
import { APIKey } from '../../common/apis/MovieApiKey';

// Async thunk to fetch movies
export const fetchAsyncMovies = createAsyncThunk(
  'movies/fetchAsyncMovies',
  async (term) => {
    const response = await movieApi.get(`?apiKey=${APIKey}&s=${term}&type=movie`);
    return response.data;
  }
);

// Async thunk to fetch shows
export const fetchAsyncShows = createAsyncThunk(
  'movies/fetchAsyncShows',
  async (term) => {
    const response = await movieApi.get(`?apiKey=${APIKey}&s=${term}&type=series`);
    return response.data;
  }
);

// Async thunk to fetch Movie or Show Detail
export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  'movies/fetchAsyncMovieOrShowDetail',
  async (id) => {  
    const response = await movieApi.get(`?apiKey=${APIKey}&i=${id}&Plot=full`);
    return response.data;
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectedMovieOrShow: {},
  loading: false,  // Add loading state
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectedMovieOrShow = {};
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncMovies.pending, (state) => {
        state.loading = true;  // Set loading to true when the fetch starts
      })
      .addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
        state.loading = false;  // Set loading to false when the fetch is fulfilled
        state.movies = payload;
      })
      .addCase(fetchAsyncShows.pending, (state) => {
        state.loading = true;  // Set loading to true when the fetch starts
      })
      .addCase(fetchAsyncShows.fulfilled, (state, { payload }) => {
        state.loading = false;  // Set loading to false when the fetch is fulfilled
        state.shows = payload;
      })
      .addCase(fetchAsyncMovieOrShowDetail.fulfilled, (state, { payload }) => {
        state.selectedMovieOrShow = payload;
      })
      .addCase(fetchAsyncMovies.rejected, (state) => {
        state.loading = false;  // Set loading to false when the fetch is rejected
      })
      .addCase(fetchAsyncShows.rejected, (state) => {
        state.loading = false;  // Set loading to false when the fetch is rejected
      });
  }
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;

export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selectedMovieOrShow;
export const selectLoading = (state) => state.movies.loading;  // Selector for loading state

export default movieSlice.reducer;
