import { HydratedDocument, Types } from 'mongoose';
import { Request } from "express";

export type Role = "admin" | "user";

export interface IArtist {
  name: string;
  image?: string;
  information?: string;
  isPublished: boolean;
}

export interface IAlbum {
  title: string;
  artist: Types.ObjectId;
  releaseYear: number;
  coverImage?: string;
  isPublished: boolean;
}

export interface ITrack {
  title: string;
  album: Types.ObjectId;
  duration: string;
  trackNumber: number;
  isPublished: boolean;
}

export interface IUser {
  username: string;
  password: string;
  token: string;
  role: Role;

  checkPassword(password: string): Promise<boolean>;

  generateToken(): void;
}

export interface RequestWithUser extends Request {
  user?: HydratedDocument<IUser>;
}

export interface ITrackHistory {
  user: Types.ObjectId;
  track: Types.ObjectId;
  artist: Types.ObjectId;
  datetime: Date;
}