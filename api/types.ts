import { Types } from 'mongoose';

export interface IArtist {
  name: string;
  image?: string;
  information?: string;
}

export interface IAlbum {
  title: string;
  artist: Types.ObjectId;
  releaseYear: number;
  coverImage?: string;
}

export interface ITrack {
  title: string;
  album: Types.ObjectId;
  duration: string;
  trackNumber: number;
}

export interface IUser {
  username: string;
  password: string;
  token: string;
  role: "admin" | "user";
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export interface ITrackHistory {
  user: Types.ObjectId;
  track: Types.ObjectId;
  artist: Types.ObjectId;
  datetime: Date;
}