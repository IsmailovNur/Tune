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
  console.log(name, image, description);

  if (!name) res.status(400).send({error: 'name is required'});

  const artistData = {name, image, description,};
  const artist = new Artist(artistData);

  try {
    await artist.save();
    res.send(artist);
  } catch (e) {
    if (e instanceof Error) {
      return  res.status(400).send({error: e.message});
    }
    return res.status(500);
  }


});

export default artistsRouter;