import { Router } from "express";
import { Album } from "../models/Album";

const albumsRouter = Router();


albumsRouter.get('/', async (req, res) => {
});

albumsRouter.get('/:id', async (req, res) => {
});

albumsRouter.post('/', async (req, res) => {

  const {title, artist, releaseYear, coverImage} = req.body;
  const album = new Album({
    title,
    artist,
    releaseYear,
    coverImage: coverImage || null,
  });

  try {
    await album.save();
    res.send(album);

  } catch (e) {
    if (e instanceof Error) {
      return res.status(400).send({error: e.message});
    }
    return res.status(500).send({error: 'Server error!'});
  }
});

export default albumsRouter;