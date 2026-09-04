import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { useNavigate } from "react-router-dom";
import React, {
  type ChangeEvent,
  useEffect,
  useState
} from "react";
import { toast } from "react-toastify";
import {
  createTrack,
  fetchAlbums
} from "../../entities/Music/musicThunk.ts";
import { AppRoutes } from "../../routing/routes.ts";
import {
  albums,
  isLoading
} from "../../entities/Music/musicSlice.ts";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from "@mui/material";

export const CreateTrackPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const albumsData = useAppSelector(albums);
  const loading = useAppSelector(isLoading);

  const [track, setTrack] = useState({
    title: "",
    album: "",
    duration: "",
    trackNumber: "",
  });

  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);

  const submitHandler = async (
    e: React.SubmitEvent
  ) => {
    e.preventDefault();

    if (!track.title.trim()) {
      toast.error("Track title is required!");
      return;
    }

    if (!track.album) {
      toast.error("Album is required!");
      return;
    }

    if (!track.duration.trim()) {
      toast.error("Duration is required!");
      return;
    }

    const trackNumber = Number(track.trackNumber);

    if (
      !Number.isInteger(trackNumber) ||
      trackNumber < 1
    ) {
      toast.error(
        "Track number must be a positive integer!"
      );
      return;
    }

    try {
      await dispatch(
        createTrack({
          title: track.title.trim(),
          album: track.album,
          duration: track.duration.trim(),
          trackNumber,
        })
      ).unwrap();

      toast.success("Track created!");

      navigate(AppRoutes.main);
    } catch (error) {
      toast.error("Failed to create track!");
    }
  };

  const inputChangeHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const {name, value} = e.target;

    setTrack((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <Box sx={{maxWidth: 500, mx: "auto", mt: 4}}>
      <Paper sx={{p: 4}} variant="outlined">
        <Typography
          variant="h5"
          sx={{mb: 4}}
        >
          Add Track
        </Typography>

        <Box
          component="form"
          onSubmit={submitHandler}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3
          }}
        >
          <TextField
            label="Title"
            name="title"
            value={track.title}
            onChange={inputChangeHandler}
          />

          <FormControl fullWidth>
            <InputLabel>Album</InputLabel>

            <Select
              value={track.album}
              label="Album"
              onChange={(e) =>
                setTrack((prevState) => ({
                  ...prevState,
                  album: e.target.value
                }))
              }
              disabled={loading}
            >
              {albumsData.map((album) => (
                <MenuItem
                  key={album._id}
                  value={album._id}
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between"
                    }}
                  >
                    <Typography>
                      {album.title}
                    </Typography>

                    <Typography color="info">
                      {album.artist?.name ??
                        "Unknown Artist"}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Duration"
            name="duration"
            value={track.duration}
            onChange={inputChangeHandler}
          />

          <TextField
            label="Track number"
            name="trackNumber"
            type="number"
            value={track.trackNumber}
            onChange={inputChangeHandler}
            slotProps={{
              htmlInput: {
                min: 1,
                step: 1,
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            loading={loading}
          >
            Add Track
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};