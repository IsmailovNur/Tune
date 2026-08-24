import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../shared/axios/AxiosApi';
import type { TrackHistory } from "./types.ts";

export const addTrackToHistory = createAsyncThunk<void, string>(
  'trackHistory/addTrack',
  async (trackId) => {
    await axiosApi.post('/track_history', { track: trackId });
  }
);

export const fetchTrackHistory = createAsyncThunk<TrackHistory[]>(
  'trackHistory/fetchHistory',
  async () => {
    const response = await axiosApi.get<TrackHistory[]>('/track_history');
    return response.data;
  }
);