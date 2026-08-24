import { configureStore } from '@reduxjs/toolkit';
import { musicReducer } from '../entities/Music/musicSlice';
import { userReducer } from "../entities/User/userSlice.ts";

export const store = configureStore({
  reducer: {
    music: musicReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;