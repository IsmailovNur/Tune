import type { Album, Artist, Track } from "./types.ts";
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAlbums,
  fetchAlbumsByArtist,
  fetchArtists,
  fetchTracksByAlbum,
  deleteArtist,
  deleteAlbum,
  deleteTrack
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
};

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.pending, (state) => {
        state.loading = true;
        state.artists = [];
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
        state.albums = [];
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
        state.tracks = [];
      })
      .addCase(fetchTracksByAlbum.fulfilled, (state, action) => {
        state.loading = false;
        state.tracks = action.payload;
      })
      .addCase(fetchTracksByAlbum.rejected, (state) => {
        state.loading = false;
      })

      .addCase(fetchAlbums.pending, (state) => {
        state.loading = true;
        state.albums = [];
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.loading = false;
        state.albums = action.payload;
      })
      .addCase(fetchAlbums.rejected, (state) => {
        state.loading = false;
      })

      .addCase(deleteArtist.fulfilled, (state) => {
        state.albums = [];
        state.tracks = [];
      })

      .addCase(deleteAlbum.fulfilled, (state) => {
        state.tracks = [];
      })

      .addCase(deleteTrack.fulfilled, (state) => {
        state.tracks = [];
      });
  },

  selectors: {
    artists: state => state.artists,
    albums: state => state.albums,
    tracks: state => state.tracks,
    isLoading: state => state.loading,
  }
});

export const musicReducer = musicSlice.reducer;

export const {
  artists,
  albums,
  tracks,
  isLoading
} = musicSlice.selectors;