import { model, Schema, Types } from "mongoose";
import { IAlbum } from "../types";

const AlbumSchema = new Schema<IAlbum>({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: Types.ObjectId,
    required: true,
    ref: "Artist",
  },
  releaseYear: {
    type: Number,
    required: true,
  },
  coverImage: {
    type: String,
    default: null,
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
});


export const Album = model<IAlbum>('Album', AlbumSchema);