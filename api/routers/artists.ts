import { Router } from "express";
import { Artist } from "../models/Artist";

const artistsRouter = Router();

artistsRouter.get('/', async (req, res) => {
  try {
    const artists = await Artist.find();
    res.send(artists);
  } catch (e) {
    return res.status(500).send({error: 'Server error!'});
  }
});

artistsRouter.post('/', async (req, res) => {
  const {name, image, information} = req.body;

  const artist = new Artist({name, image, information});

  try {
    await artist.save();
    res.send(artist);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(400).send({error: e.message});
    }
    return res.status(500).send({error: 'Server error!'});
  }
});

export default artistsRouter;