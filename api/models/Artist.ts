import { model, Schema } from 'mongoose';
import { IArtist } from "../types";

const ArtistSchema = new Schema<IArtist>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    default: null,
  },
  information: {
    type: String,
    default: null,
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export const Artist = model<IArtist>('Artist', ArtistSchema);