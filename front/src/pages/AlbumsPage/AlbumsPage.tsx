import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { albums, isLoading } from "../../entities/Music/musicSlice.ts";
import { useEffect } from "react";
import { fetchAlbumsByArtist } from "../../entities/Music/musicThunk.ts";
import { Spinner } from "../../shared/Spinner/Spinner.tsx";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from "@mui/material";
import { apiURL } from "../../shared/axios/AxiosApi.ts";

export const AlbumsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {artistId} = useParams<{ artistId: string }>();
  const albumsData = useSelector(albums);
  const loading = useAppSelector(isLoading);

  useEffect(() => {
    if (artistId) {
      dispatch(fetchAlbumsByArtist(artistId));
    }
  }, [dispatch, artistId]);

  if (loading) return <Spinner isLoading />;
  const artistName = albumsData[0]?.artist?.name ?? 'Артист';

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
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};