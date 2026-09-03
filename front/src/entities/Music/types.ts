export interface Artist {
  _id: string;
  name: string;
  image?: string | null;
  information?: string | null;
  isPublished: boolean;
}

export interface Album {
  _id: string;
  title: string;
  artist: Artist;
  releaseYear: number;
  coverImage?: string | null;
  tracksCount?: number;
  isPublished: boolean;
}

export interface Track {
  _id: string;
  title: string;
  duration: string;
  trackNumber: number;
  album: {
    _id: string;
    title: string;
    artist: string;
  };
  isPublished: boolean;
}

export interface ArtistMutation {
  name: string;
  image: string;
  information: string;
}

export interface AlbumMutation {
  title: string;
  artist: string;
  releaseYear: number;
  coverImage: File | null;
}

export interface TrackMutation {
  title: string;
  album: string;
  duration: string;
  trackNumber: number;
}