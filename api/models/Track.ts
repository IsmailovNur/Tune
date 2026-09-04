import { model, Schema, Types } from "mongoose";
import { ITrack } from "../types";

const TrackSchema = new Schema<ITrack>({
  title: {
    type: String,
    required: true,
  },
  album: {
    type: Types.ObjectId,
    required: true,
    ref: 'Album',
  },
  duration: {
    type: String,
    required: true,
  },
  trackNumber: {
    type: Number,
    required: true,
    min: 1,
    validate: {
      validator: Number.isInteger,
      message: "Track number must be a positive integer!",
    },
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
});

TrackSchema.index(
  {album: 1, trackNumber: 1},
  {unique: true}
);

export const Track = model<ITrack>('Track', TrackSchema);