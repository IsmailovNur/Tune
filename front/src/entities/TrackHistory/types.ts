export interface TrackHistory {
  _id: string;
  user: string;
  tracks: {
    _id: string;
    title: string;
  };
  artist: {
    _id: string;
    name: string;
  };
  datetime: string;
}