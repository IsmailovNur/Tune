import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { useNavigate } from "react-router-dom";
import React, { type ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createTrack,
  fetchAlbumsByArtist
} from "../../entities/Music/musicThunk.ts";
import { AppRoutes } from "../../routing/routes.ts";
import { albums } from "../../entities/Music/musicSlice.ts";
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
  console.log(albumsData);

  const [track, setTrack] = useState({
    title: "",
    album: "",
    duration: "",
    trackNumber: "",
  });

  useEffect(() => {
    dispatch(fetchAlbumsByArtist(""));
  }, [dispatch]);

  const submitHandler = async (e: React.SubmitEvent) => {
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

    if (!track.trackNumber) {
      toast.error("Track number is required!");
      return;
    }

    try {
      await dispatch(
        createTrack({
          title: track.title,
          album: track.album,
          duration: track.duration,
          trackNumber: Number(track.trackNumber),
        })
      ).unwrap();

      toast.success("Track created!");
      navigate(AppRoutes.main);

    } catch (error) {
      toast.error("Failed to create album!");
    }
  }

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setTrack((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }


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

          <FormControl>
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
            >
              {albumsData.map((album) => (
                <MenuItem
                  key={album._id}
                  value={album._id}
                >
                  <Box sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between"
                  }}>
                    <Typography>{album.title}</Typography>
                    <Typography color="info">{album!.artist.name}</Typography>
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
          />

          <Button
            type="submit"
            variant="contained"
          >
            Add Track
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};