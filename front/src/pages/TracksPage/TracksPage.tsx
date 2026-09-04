import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Tooltip,
  Typography
} from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  deleteTrack,
  fetchTracksByAlbum,
  toggleTrackPublished
} from '../../entities/Music/musicThunk';
import { Spinner } from '../../shared/Spinner/Spinner';
import {
  addTrackToHistory
} from "../../entities/TrackHistory/trackHistoryThunk.ts";
import { selectUser } from "../../entities/User/userSlice.ts";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import PublishIcon from "@mui/icons-material/Publish";

export const TracksPage = () => {
  const {albumId} = useParams<{ albumId: string }>();
  const dispatch = useAppDispatch();
  const {tracks, loading} = useAppSelector((state) => state.music);
  const user = useAppSelector(selectUser);

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (albumId) {
      dispatch(fetchTracksByAlbum(albumId));
    }
  }, [dispatch, albumId]);

  const albumTitle = tracks[0]?.album?.title ?? 'Album';


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

  const deleteHandler = async (id: string) => {
    try {
      await dispatch(deleteTrack(id)).unwrap();

      toast.success("Track deleted!");

      if (albumId) {
        dispatch(fetchTracksByAlbum(albumId));
      }
    } catch (e) {
      toast.error("Failed to delete track!");
    }
  };

  const publishHandler = async (id: string) => {
    try {
      await dispatch(
        toggleTrackPublished(id)
      ).unwrap();

      toast.success("Track published!");

      if (albumId) {
        dispatch(fetchTracksByAlbum(albumId));
      }
    } catch (e) {
      toast.error("Failed to publish track!");
    }
  };


  if (loading) return <Spinner isLoading />;


  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {albumTitle}
      </Typography>

      <Paper variant="outlined">
        <List disablePadding>
          {tracks.map((track, index) => (
            <Box key={track._id}>
              <ListItem
                secondaryAction={
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1
                    }}
                  >
                    {user && (
                      <IconButton
                        edge="end"
                        color="primary"
                        onClick={() =>
                          onPlayClick(
                            track._id,
                            track.title
                          )
                        }
                      >
                        <PlayCircleIcon />
                      </IconButton>
                    )}

                    {isAdmin && (
                      <>
                        <Tooltip title="Delete">
                          <Button
                            color="error"
                            size="small"
                            onClick={() =>
                              deleteHandler(track._id)
                            }
                          >
                            <DeleteIcon />
                          </Button>
                        </Tooltip>

                        {!track.isPublished && (
                          <Tooltip title="Publish">
                            <Button
                              size="small"
                              onClick={() =>
                                publishHandler(track._id)
                              }
                            >
                              <PublishIcon />
                            </Button>
                          </Tooltip>
                        )}
                      </>
                    )}
                  </Box>
                }
              >
                <ListItemText
                  primary={
                    <Box>
                      <Typography variant="body1">
                        {track.trackNumber}. {track.title}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        Duration: {track.duration}
                      </Typography>

                      {isAdmin && !track.isPublished && (
                        <Box sx={{mt: 1}}>
                          <Chip size="small" label="Unpublished" />
                        </Box>
                      )}
                    </Box>
                  }
                />
              </ListItem>
              {index < tracks.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </Paper>


    </Box>

  )
    ;
};