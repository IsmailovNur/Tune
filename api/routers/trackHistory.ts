import { Router } from 'express';
import { User } from "../models/User";
import { Track } from "../models/Track";
import { TrackHistory } from "../models/TrackHistory";
import { Album } from "../models/Album";
import { auth } from "../middlewares/auth";
import { Types } from "mongoose";
import { RequestWithUser } from "../types";

const trackHistoryRouter = Router();

trackHistoryRouter.post('/', auth, async (req: RequestWithUser, res) => {
  try {
    const {track} = req.body;

    if (typeof track !== "string" || !track.trim()) {
      return res.status(400).send({error: 'Track ID is required!'});
    }

    if (!Types.ObjectId.isValid(track)) {
      return res.status(400).send({error: 'Invalid track ID!'});
    }

    const existingTrack = await Track.findById(track);

    if (!existingTrack) {
      return res.status(404).send({error: 'Track not found!'});
    }

    const album = await Album.findById(existingTrack.album);

    if (!album) {
      return res.status(404).send({error: 'Album for this track not found!'});
    }

    const trackHistoryData = {
      user: req.user!._id,
      track: existingTrack._id,
      artist: album.artist,
    };

    const trackHistory = new TrackHistory(trackHistoryData);
    await trackHistory.save();
    return res.send(trackHistory);

  } catch (e) {
    if (e instanceof Error) {
      return res.status(400).send({error: e.message});
    }

    return res.status(500).send({error: 'Server error!'});
  }
});

trackHistoryRouter.get('/', auth, async (req: RequestWithUser, res) => {
  try {
    const history = await TrackHistory.find({
      user: req.user!._id
    })
      .sort({datetime: -1})
      .populate({
        path: 'track',
        select: 'title'
      })
      .populate({
        path: 'artist',
        select: 'name'
      });

    res.send(history);

  } catch (e) {
    if (e instanceof Error) {
      return res.status(400).send({error: e.message});
    }

    return res.status(500).send({error: 'Server error!'});
  }
});


export default trackHistoryRouter;