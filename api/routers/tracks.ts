import { Router } from "express";
import { Track } from "../models/Track";

const tracksRouter = Router();

tracksRouter.get('/', async (req, res) => {
});

tracksRouter.post('/', async (req, res) => {
  const {title, album, duration} = req.body;

  const track = new Track({title, album, duration});

  try {
    await track.save();
    res.send(track);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(400).send({error: e.message});
    }
    return res.status(500).send({error: 'Server error!'});
  }
});

export default tracksRouter;