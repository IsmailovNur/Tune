import { configureStore } from '@reduxjs/toolkit';
import { musicReducer } from '../entities/Music/musicSlice';
import { userReducer } from "../entities/User/userSlice.ts";
import {
  trackHistoryReducer
} from "../entities/TrackHistory/trackHistorySlice.ts";

export const store = configureStore({
  reducer: {
    music: musicReducer,
    user: userReducer,
    trackHistory: trackHistoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;