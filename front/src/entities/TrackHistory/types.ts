export interface TrackHistory {
  _id: string;
  user: string;
  track: {
    _id: string;
    title: string;
  } | null;
  artist: {
    _id: string;
    name: string;
  } | null;
  datetime: string;
}