import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  Album,
  AlbumMutation,
  Artist,
  ArtistMutation,
  Track, TrackMutation
} from "./types.ts";
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

export const createArtist = createAsyncThunk<void, ArtistMutation>(
  'music/createArtist',
  async (artistMutation) => {
    await axiosApi.post('/artists', artistMutation);
  }
);

export const createAlbum = createAsyncThunk<void, AlbumMutation>(
  'music/createAlbum',
  async (albumMutation) => {
    const formData = new FormData();

    formData.append('title', albumMutation.title);
    formData.append('artist', albumMutation.artist);
    formData.append('releaseYear', albumMutation.releaseYear.toString());

    if (albumMutation.coverImage) formData.append('coverImage', albumMutation.coverImage);

    await axiosApi.post('/albums', formData);
  }
);

export const createTrack = createAsyncThunk<void, TrackMutation>(
  'music/createTrack',
  async (trackMutation) => {
    await axiosApi.post('/tracks', trackMutation);
  }
);

export const deleteArtist = createAsyncThunk<void, string>(
  'music/deleteArtist',
  async (artistId) => {
    await axiosApi.delete(`/artists/${artistId}`);
  }
);

export const deleteAlbum = createAsyncThunk<void, string>(
  'music/deleteAlbum',
  async (albumId) => {
    await axiosApi.delete(`/albums/${albumId}`);
  }
);

export const deleteTrack = createAsyncThunk<void, string>(
  'music/deleteTrack',
  async (trackId) => {
    await axiosApi.delete(`/tracks/${trackId}`);
  }
);

export const toggleArtistPublished = createAsyncThunk<void, string>(
  'music/toggleArtistPublished',
  async (artistId) => {
    await axiosApi.patch(
      `/artists/${artistId}/togglePublished`
    );
  }
);

export const toggleAlbumPublished = createAsyncThunk<void, string>(
  'music/toggleAlbumPublished',
  async (albumId) => {
    await axiosApi.patch(
      `/albums/${albumId}/togglePublished`
    );
  }
);

export const toggleTrackPublished = createAsyncThunk<void, string>(
  'music/toggleTrackPublished',
  async (trackId) => {
    await axiosApi.patch(
      `/tracks/${trackId}/togglePublished`
    );
  }
);


