import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchArtists } from "../../entities/Music/musicThunk.ts";
import { Spinner } from "../../shared/Spinner/Spinner.tsx";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from "@mui/material";
import { apiURL } from "../../shared/axios/AxiosApi.ts";
import { artists, isLoading } from "../../entities/Music/musicSlice.ts";

export const ArtistsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const artistsData = useAppSelector(artists);
  const loading = useAppSelector(isLoading);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  if (loading) return <Spinner isLoading />;

  return (
    <Grid container spacing={3}>
      {artistsData.map((artist) => (
        <Grid key={artist._id} size={{xs: 12, sm: 6, md: 3}}>
          <Card>
            <CardActionArea onClick={() => navigate(`/artists/${artist._id}`)}>
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
                <Typography variant="h6" align="center">
                  {artist.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
