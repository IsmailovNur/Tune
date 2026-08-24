import { createSlice } from '@reduxjs/toolkit';
import { fetchTrackHistory } from './trackHistoryThunk';
import type { TrackHistory } from "./types.ts";

interface TrackHistoryState {
  history: TrackHistory[];
  loading: boolean;
}

const initialState: TrackHistoryState = {
  history: [],
  loading: false,
};

const trackHistorySlice = createSlice({
  name: 'trackHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrackHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTrackHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
      })
      .addCase(fetchTrackHistory.rejected, (state) => {
        state.loading = false;
      });
  },
  selectors: {
    selectHistory: (state) => state.history,
    selectHistoryLoading: (state) => state.loading,
  },
});

export const trackHistoryReducer = trackHistorySlice.reducer;
export const { selectHistory, selectHistoryLoading } = trackHistorySlice.selectors;