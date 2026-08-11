import { Router } from "express";
import { Artist } from "../models/Artist";

const artistsRouter = Router();

artistsRouter.get('/', async (req, res) => {
  try {
    const artists = await Artist.find();
    res.send(artists);
  } catch {
    res.status(500);
  }
});

artistsRouter.post('/', async (req, res) => {
  const {name, image, description} = req.body;

  if (!name) res.status(400).send({error: 'name is required'});

  const artist = new Artist({name, image, description,});

  try {
    await artist.save();
    res.send(artist);
  } catch (e) {
    return res.status(500).send({ error: 'Server error!' });
  }
});

export default artistsRouter;