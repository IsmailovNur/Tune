import { Router } from "express";
import { Track } from "../models/Track";
import { Album } from "../models/Album";

const tracksRouter = Router();

tracksRouter.get('/', async (req, res) => {
  try {
    const {album, artist} = req.query;

    const filterByAlbum = album ? {album: album as string} : {};

    if (artist) {
      const albums = await Album.find({ artist: artist as string });
      const albumIds = albums.map(a => a._id);

      const tracks = await Track.find({ album: { $in: albumIds } }).populate('album', 'title');
      return res.send(tracks);
    }

    const tracks = await Track.find(filterByAlbum).populate('album', 'title');
    return res.send(tracks);
  } catch (e) {
    return res.status(500).send({error: 'Server error!'});
  }

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