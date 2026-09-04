import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  deleteArtist,
  fetchArtists,
  toggleArtistPublished
} from "../../entities/Music/musicThunk.ts";
import { Spinner } from "../../shared/Spinner/Spinner.tsx";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Tooltip,
  Typography
} from "@mui/material";
import { apiURL } from "../../shared/axios/AxiosApi.ts";
import { artists, isLoading } from "../../entities/Music/musicSlice.ts";
import { selectUser } from "../../entities/User/userSlice.ts";
import { toast } from "react-toastify";
import PublishIcon from '@mui/icons-material/Publish';
import DeleteIcon from '@mui/icons-material/Delete';

export const ArtistsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const artistsData = useAppSelector(artists);
  const loading = useAppSelector(isLoading);

  const user = useAppSelector(selectUser);
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const deleteHandler = async (id: string) => {
    try {
      await dispatch(deleteArtist(id)).unwrap();

      toast.success("Artist deleted successfully!");

      dispatch(fetchArtists());
    } catch (e) {
      toast.error("Failed to delete artist!");
    }
  };

  const publishHandler = async (id: string) => {
    try {
      await dispatch(toggleArtistPublished(id)).unwrap();

      toast.success("Artist published successfully!");

      dispatch(fetchArtists());
    } catch (e) {
      toast.error("Failed to publish artist!");
    }
  };

  if (loading) return <Spinner isLoading />;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Artists
      </Typography>
      <Grid container spacing={3}>

        {artistsData.map((artist) => (
          <Grid key={artist._id} size={{
            xs: 12,
            sm: 6,
            md: 3
          }} sx={{display: 'flex'}}>
            <Card sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              maxHeight: '500px'
            }}>
              <CardActionArea
                onClick={() => navigate(`/artists/${artist._id}`)}
                sx={{flexGrow: 1,}}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={artist.image ? `${apiURL}/${artist.image}` : '/images/no-image.svg'}
                  alt={artist.name}
                  sx={{
                    p: 2,
                    objectFit: 'contain',
                    mx: 'auto',
                    width: '100%'
                  }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    align="center"
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      wordBreak: 'break-word'
                    }}
                  >
                    {artist.name}
                  </Typography>

                  {isAdmin && !artist.isPublished && (
                    <Box sx={{mt: 1, textAlign: 'center'}}>
                      <Chip
                        size="small"
                        label="Unpublished"
                      />
                    </Box>
                  )}
                </CardContent>
              </CardActionArea>

              {isAdmin && (
                <Box sx={{
                  display: "flex",
                  gap: 1,
                  p: 1,
                  borderTop: "1px solid #fff",
                  justifyContent: "space-between",
                  marginTop: "auto"
                }}>
                  <Tooltip title="Delete">
                    <Button
                      color="error"
                      size="small"
                      onClick={() => deleteHandler(artist._id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </Tooltip>

                  {!artist.isPublished && (
                    <Tooltip title="Publish">
                      <Button
                        size="small"
                        onClick={() => publishHandler(artist._id)}
                      >
                        <PublishIcon />
                      </Button>
                    </Tooltip>
                  )}
                </Box>
              )}

            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>

  );
};
