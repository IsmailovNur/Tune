import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { useNavigate } from "react-router-dom";
import React, { type ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AppRoutes } from "../../routing/routes.ts";
import { createAlbum, fetchArtists } from "../../entities/Music/musicThunk.ts";
import { artists } from "../../entities/Music/musicSlice.ts";

export const CreateAlbumPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const artistsData = useAppSelector(artists);

  const [album, setAlbum] = useState({
    title: "",
    artist: "",
    releaseYear: "",
    coverImage: null as File | null,
  });

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const submitHandler = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!album.title.trim()) {
      toast.error("Album title is required!");
      return;
    }

    if (!album.artist) {
      toast.error("Artist is required!");
      return;
    }

    if (!album.releaseYear) {
      toast.error("Release year is required!");
      return;
    }

    const releaseYear = Number(album.releaseYear);

    if (
      !Number.isInteger(releaseYear) ||
      releaseYear < 0
    ) {
      toast.error(
        "Release year must be a non-negative integer!"
      );
      return;
    }

    try {
      await dispatch(
        createAlbum({
          title: album.title.trim(),
          artist: album.artist,
          releaseYear,
          coverImage: album.coverImage,
        })
      ).unwrap();

      toast.success("Album created!");

      navigate(AppRoutes.main);
    } catch (error) {
      toast.error("Failed to create album!");
    }
  };

  const inputChangeHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const {name, value} = e.target;

    if (
      name === "releaseYear" &&
      value &&
      Number(value) < 0
    ) {
      return;
    }

    setAlbum((prevState) => ({
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
          Create new Album
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
            value={album.title}
            onChange={inputChangeHandler}
          />

          <FormControl fullWidth>
            <InputLabel>Artist</InputLabel>

            <Select
              value={album.artist}
              label="Artist"
              onChange={(e) =>
                setAlbum((prevState) => ({
                  ...prevState,
                  artist: e.target.value
                }))
              }
            >
              {artistsData.map((artist) => (
                <MenuItem
                  key={artist._id}
                  value={artist._id}
                >
                  {artist.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Release year"
            name="releaseYear"
            type="number"
            value={album.releaseYear}
            onChange={inputChangeHandler}
            slotProps={{
              htmlInput: {
                min: 0,
                step: 1,
              },
            }}
          />

          <Button
            component="label"
            variant="outlined"
          >
            Select cover image

            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) =>
                setAlbum((prevState) => ({
                  ...prevState,
                  coverImage:
                    e.target.files?.[0] || null
                }))
              }
            />
          </Button>

          {album.coverImage && (
            <Typography variant="body2">
              {album.coverImage.name}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
          >
            Add Album
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};