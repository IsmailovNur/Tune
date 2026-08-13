import { model, Schema, Types } from "mongoose";
import { ITrack } from "../types";

const TrackSchema = new Schema({
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
})

export const Track = model<ITrack>('Track', TrackSchema);