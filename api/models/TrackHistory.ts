import { model, Schema, Types } from 'mongoose';
import { ITrackHistory } from '../types';

const TrackHistorySchema = new Schema<ITrackHistory>({
  user: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  track: {
    type: Types.ObjectId,
    ref: 'Track',
    required: true,
  },
  datetime: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export const TrackHistory = model<ITrackHistory>('TrackHistory', TrackHistorySchema);