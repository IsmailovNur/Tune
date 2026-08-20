export interface Artist {
  _id: string;
  name: string;
  image?: string;
  information?: string;
}

export interface Album {
  _id: string;
  title: string;
  artist: Artist;
  releaseYear: number;
  coverImage?: string;
  tracksCount?: number;
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
}