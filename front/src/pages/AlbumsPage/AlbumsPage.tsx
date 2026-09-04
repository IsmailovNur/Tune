import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { albums, isLoading } from "../../entities/Music/musicSlice.ts";
import { useEffect } from "react";
import {
  deleteAlbum,
  fetchAlbumsByArtist, toggleAlbumPublished
} from "../../entities/Music/musicThunk.ts";
import { Spinner } from "../../shared/Spinner/Spinner.tsx";
import {
  Box, Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia, Chip,
  Grid, Tooltip,
  Typography
} from "@mui/material";
import { apiURL } from "../../shared/axios/AxiosApi.ts";
import { selectUser } from "../../entities/User/userSlice.ts";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import PublishIcon from "@mui/icons-material/Publish";

export const AlbumsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {artistId} = useParams<{ artistId: string }>();
  const albumsData = useSelector(albums);

  const loading = useAppSelector(isLoading);
  const user = useAppSelector(selectUser);

  const isAdmin = user?.role === "admin";
  const artistName = albumsData[0]?.artist?.name ?? 'Artist';

  useEffect(() => {
    if (artistId) {
      dispatch(fetchAlbumsByArtist(artistId));
    }
  }, [dispatch, artistId]);

  const deleteHandler = async (id: string) => {
    try {
      await dispatch(deleteAlbum(id)).unwrap();

      toast.success("Album deleted!");

      if (artistId) {
        dispatch(fetchAlbumsByArtist(artistId));
      }
    } catch (e) {
      toast.error("Failed to delete album!");
    }
  };

  const publishHandler = async (id: string) => {
    try {
      await dispatch(toggleAlbumPublished(id)).unwrap();

      toast.success("Album published!");

      if (artistId) {
        dispatch(fetchAlbumsByArtist(artistId));
      }
    } catch (e) {
      toast.error("Failed to publish album!");
    }
  };


  if (loading) return <Spinner isLoading />;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {artistName}
      </Typography>

      <Grid container spacing={3}>
        {albumsData.map((album) => (
          <Grid size={{xs: 12, sm: 6, md: 3}} key={album._id}>
            <Card>
              <CardActionArea onClick={() => navigate(`/albums/${album._id}`)}>
                <CardMedia
                  component="img"
                  height="200"
                  image={album.coverImage ? `${apiURL}/${album.coverImage}` : '/images/no-image.svg'}
                  alt={album.title}
                  sx={{
                    p: 2,
                    objectFit: 'contain',
                    mx: 'auto',
                    width: '100%'
                  }}
                />
                <CardContent sx={{textAlign: "center"}}>
                  <Typography variant="h6">{album.title}</Typography>
                  <Typography color="text.secondary">Release year: {album.releaseYear}</Typography>
                  {album.tracksCount !== undefined && (
                    <Typography color="text.secondary">Tracks count: {album.tracksCount}</Typography>
                  )}
                  {isAdmin && !album.isPublished && (
                    <Box sx={{mt: 1}}>
                      <Chip
                        size="small"
                        label="Unpublised"
                      />
                    </Box>
                  )}
                </CardContent>
              </CardActionArea>

              {isAdmin && (
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    p: 1,
                    borderTop: "1px solid #fff",
                    justifyContent: "space-between"
                  }}
                >
                  <Tooltip title="Delete">
                    <Button
                      color="error"
                      size="small"
                      onClick={() =>
                        deleteHandler(album._id)
                      }
                    >
                      <DeleteIcon />
                    </Button>
                  </Tooltip>

                  {!album.isPublished && (
                    <Tooltip title="Publish">
                      <Button
                        size="small"
                        onClick={() =>
                          publishHandler(album._id)
                        }
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