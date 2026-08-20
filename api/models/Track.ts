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
  },
})

export const Track = model<ITrack>('Track', TrackSchema);