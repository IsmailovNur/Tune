import { Router } from 'express';
import { User } from "../models/User";
import { Track } from "../models/Track";
import { TrackHistory } from "../models/TrackHistory";
import { Album } from "../models/Album";

const trackHistoryRouter = Router();

trackHistoryRouter.post('/', async (req, res) => {
  try {
    const token = req.get('Authorization');

    if (!token) {
      return res.status(401).send({error: 'No token present!'});
    }

    const user = await User.findOne({token});

    if (!user) {
      return res.status(401).send({error: 'Wrong token!'});
    }

    const {track} = req.body;

    if (!track) {
      return res.status(400).send({error: 'Track ID is required!'});
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
      user: user._id,
      track: existingTrack._id,
      artist: album.artist,
    }

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

trackHistoryRouter.get('/', async (req, res) => {
  try {
    const token = req.get('Authorization');
    if (!token) {
      res.status(401).send({error: 'Unauthorized: No token provided'});
      return;
    }

    const user = await User.findOne({token});
    if (!user) {
      res.status(401).send({error: 'Unauthorized: Invalid token'});
      return;
    }

    const history = await TrackHistory.find({user: user._id})
      .sort({datetime: -1})
      .populate({path: 'track', select: 'title'})
      .populate({path: 'artist', select: 'name'});

    res.send(history);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(400).send({error: e.message});
    }
    return res.status(500).send({error: 'Server error!'});
  }
});


export default trackHistoryRouter;