import type { Album, Artist, Track } from "./types.ts";
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAlbumsByArtist,
  fetchArtists,
  fetchTracksByAlbum
} from "./musicThunk.ts";

interface MusicState {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
  loading: boolean;
}

const initialState: MusicState = {
  artists: [],
  albums: [],
  tracks: [],
  loading: false,
}

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder
      .addCase(fetchArtists.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArtists.fulfilled, (state, action) => {
        state.loading = false;
        state.artists = action.payload;
      })
      .addCase(fetchArtists.rejected, (state) => {
        state.loading = false;
      })

      .addCase(fetchAlbumsByArtist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAlbumsByArtist.fulfilled, (state, action) => {
        state.loading = false;
        state.albums = action.payload;
      })
      .addCase(fetchAlbumsByArtist.rejected, (state) => {
        state.loading = false;
      })

      .addCase(fetchTracksByAlbum.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTracksByAlbum.fulfilled, (state, action) => {
        state.loading = false;
        state.tracks = action.payload;
      })
      .addCase(fetchTracksByAlbum.rejected, (state) => {
        state.loading = false;
      })
  },

  selectors: {
    artists: state => state.artists,
    albums: state => state.albums,
    tracks: state => state.tracks,
    isLoading: state => state.loading,
  }
})


export const musicReducer = musicSlice.reducer;
export const {artists, albums, tracks, isLoading} = musicSlice.selectors;