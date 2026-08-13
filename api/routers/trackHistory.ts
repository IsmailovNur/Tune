import { Router } from 'express';
import { User } from "../models/User";
import { Track } from "../models/Track";
import { TrackHistory } from "../models/TrackHistory";

const trackHistoryRouter = Router();

trackHistoryRouter.post('/', async (req, res) => {
  try {
    const token = req.get('Authorization');

    if (!token) {
      return res.status(401).send({ error: 'No token present!' });
    }

    const user = await User.findOne({ token });

    if (!user) {
      return res.status(401).send({ error: 'Wrong token!' });
    }

    const { track } = req.body;

    if (!track) {
      return res.status(400).send({ error: 'Track ID is required!' });
    }

    const existingTrack = await Track.findById(track);

    if (!existingTrack) {
      return res.status(404).send({ error: 'Track not found!' });
    }

    const trackHistoryData = {
      user: user._id,
      track: existingTrack._id,
    }

    const trackHistory = new TrackHistory(trackHistoryData);
    await trackHistory.save();

    return res.send(trackHistory);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(400).send({ error: e.message });
    }
    return res.status(500).send({ error: 'Server error!' });
  }
});

export default trackHistoryRouter;