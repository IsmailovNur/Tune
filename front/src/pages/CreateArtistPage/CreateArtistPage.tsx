import { useAppDispatch } from "../../app/hooks.ts";
import { useNavigate } from "react-router-dom";
import React, { type ChangeEvent, useState } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { createArtist } from "../../entities/Music/musicThunk.ts";
import { AppRoutes } from "../../routing/routes.ts";

export const CreateArtistPage = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [artist, setArtist] = useState({
    name: "",
    image: "",
    information: "",
  });

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setArtist((prev) => ({...prev, [name]: value}));
  }

  const submitHandler = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!artist.name.trim()) {
      toast.error("Artist name is required!");
      return;
    }

    setLoading(true);

    try {
      await dispatch(createArtist(artist)).unwrap();

      toast.success("Artist created!");

      navigate(AppRoutes.main);
    } catch (e) {
      toast.error("Failed to create artist!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{maxWidth: 500, mx: "auto", mt: 4}}>
      <Paper sx={{p: 4}} variant="outlined">

        <Typography
          variant="h5"
          sx={{mb: 4}}
        >
          Add new Artist
        </Typography>

        <Box
          component="form"
          onSubmit={submitHandler}
          sx={{display: "flex", flexDirection: "column", gap: 3}}
        >
          <TextField
            label="Name"
            name="name"
            value={artist.name}
            onChange={inputChangeHandler}
          />

          <TextField
            label="Image"
            name="image"
            value={artist.image}
            onChange={inputChangeHandler}
          />

          <TextField
            label="Information"
            name="information"
            value={artist.information}
            onChange={inputChangeHandler}
            multiline
            rows={4}
          />

          <Button
            type="submit"
            variant="contained"
            loading={loading}
          >
            Add Artist
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
