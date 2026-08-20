import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Album, Artist, Track } from "./types.ts";
import axiosApi from "../../shared/axios/AxiosApi.ts";


export const fetchArtists = createAsyncThunk<Artist[]>(
  'music/fetchArtists',
  async () => {
    const response = await axiosApi.get<Artist[]>('/artists');
    return response.data;
  }
);

export const fetchAlbumsByArtist = createAsyncThunk<Album[], string>(
  'music/fetchAlbumByArtist',
  async (artistId) => {
    const response = await axiosApi.get<Album[]>(`/albums?artist=${artistId}`);
    return response.data;
  }
);

export const fetchTracksByAlbum = createAsyncThunk<Track[], string>(
  'music/fetchTracksByAlbum',
  async (albumId) => {
    const response = await axiosApi.get<Track[]>(`/tracks?album=${albumId}`);
    return response.data;
  }
);