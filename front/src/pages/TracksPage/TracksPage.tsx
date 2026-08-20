import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemText, Divider, Paper } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchTracksByAlbum } from '../../entities/Music/musicThunk';
import { Spinner } from '../../shared/Spinner/Spinner';

export const TracksPage = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const dispatch = useAppDispatch();
  const { tracks, loading } = useAppSelector((state) => state.music);

  useEffect(() => {
    if (albumId) {
      dispatch(fetchTracksByAlbum(albumId));
    }
  }, [dispatch, albumId]);

  if (loading) return <Spinner isLoading />;

  const albumTitle = tracks[0]?.album?.title ?? 'Альбом';

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {albumTitle}
      </Typography>

      <Paper variant="outlined">
        <List disablePadding>
          {tracks.map((track, index) => (
            <div key={track._id}>
              <ListItem>
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