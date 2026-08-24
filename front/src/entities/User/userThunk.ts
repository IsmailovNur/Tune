import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  LoginMutation,
  RegisterMutation,
  User,
  ValidationError
} from "./types.ts";
import axiosApi from "../../shared/axios/AxiosApi.ts";
import { isAxiosError } from "axios";


export const registerUser = createAsyncThunk<User, RegisterMutation, {
  rejectValue: ValidationError
}>(
  'user/register',
  async (registerMutation, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post<User>('/users', registerMutation);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);

export const loginUser = createAsyncThunk<User, LoginMutation>(
  'user/login',
  async (loginMutation) => {
    const response = await axiosApi.post<{
      message: string;
      user: User
    }>('/users/sessions', loginMutation);

    return response.data.user;
  }
);