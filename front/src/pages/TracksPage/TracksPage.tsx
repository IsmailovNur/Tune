import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box, Typography, List, ListItem, ListItemText, Divider, Paper,
  IconButton
} from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchTracksByAlbum } from '../../entities/Music/musicThunk';
import { Spinner } from '../../shared/Spinner/Spinner';
import {
  addTrackToHistory
} from "../../entities/TrackHistory/trackHistoryThunk.ts";
import { selectUser } from "../../entities/User/userSlice.ts";
import { toast } from "react-toastify";

export const TracksPage = () => {
  const {albumId} = useParams<{ albumId: string }>();
  const dispatch = useAppDispatch();
  const {tracks, loading} = useAppSelector((state) => state.music);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (albumId) {
      dispatch(fetchTracksByAlbum(albumId));
    }
  }, [dispatch, albumId]);

  const onPlayClick = async (trackId: string, trackTitle: string) => {
    if (user) {
      try {
        await dispatch(addTrackToHistory(trackId)).unwrap();
        toast.success(`Track "${trackTitle}" added to history!`);
      } catch (e) {
        toast.error('Failed to add track to history!');
      }
    }
  };

  if (loading) return <Spinner isLoading />;

  const albumTitle = tracks[0]?.album?.title ?? 'Album';

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {albumTitle}
      </Typography>

      <Paper variant="outlined">
        <List disablePadding>
          {tracks.map((track, index) => (
            <div key={track._id}>
              <ListItem
                secondaryAction={
                  user && (
                    <IconButton edge="end" color="primary" onClick={() => onPlayClick(track._id, track.title)}>
                      <PlayCircleIcon />
                    </IconButton>
                  )
                }
              >
                <ListItemText
                  primary={`${track.trackNumber}. ${track.title}`}
                  secondary={`Duration: ${track.duration}`}
                />
              </ListItem>
              {index < tracks.length - 1 && <Divider />}
            </div>
          ))}
        </List>
      </Paper>
    </Box>
  );
};