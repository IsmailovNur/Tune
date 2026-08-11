import { Document, Types } from 'mongoose';

export interface IArtist extends Document {
  name: string;
  image?: string;
  information?: string;
}

export interface IAlbum extends Document {
  title: string;
  artist: Types.ObjectId;
  releaseYear: number;
  coverImage?: string;
}

export interface ITrack extends Document {
  title: string;
  album: Types.ObjectId;
  duration: string;
}