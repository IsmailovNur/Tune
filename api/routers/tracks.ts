import { Router } from "express";
import { Track } from "../models/Track";
import { Album } from "../models/Album";
import { auth, authOptional } from "../middlewares/auth";
import { RequestWithUser } from "../types";
import { Types } from "mongoose";
import { permit } from "../middlewares/permit";

const tracksRouter = Router();

tracksRouter.get('/', authOptional, async (req, res) => {
  try {
    const {album, artist} = req.query;

    if (album) {
      const tracks = await Track.find({album: album as string})
        .sort({trackNumber: 1})
        .populate('album', 'title');
      return res.send(tracks);
    }

    if (artist) {
      const albums = await Album.find({artist: artist as string});
      const albumIds = albums.map(a => a._id);

      const tracks = await Track.find({album: {$in: albumIds}})
        .sort({trackNumber: 1})
        .populate('album', 'title');
      return res.send(tracks);
    }

    const tracks = await Track.find().sort({trackNumber: 1}).populate('album', 'title');
    return res.send(tracks);
  } catch (e) {
    return res.status(500).send({error: 'Server error!'});
  }

});

tracksRouter.post('/', auth, async (req: RequestWithUser, res) => {
  try {
    const {title, album, duration, trackNumber} = req.body;

    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).send({error: "Track title is required!"});
    }

    if (typeof album !== "string" || !album.trim()) {
      return res.status(400).send({error: "Album is required!"});
    }

    if (typeof duration !== "string" || !duration.trim()) {
      return res.status(400).send({error: "Duration is required!"});
    }

    const track = new Track({
      title: title.trim(),
      album,
      duration: duration.trim(),
      trackNumber,
    });


    await track.save();
    return res.send(track);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(400).send({error: e.message});
    }
    return res.status(500).send({error: 'Server error!'});
  }
});

tracksRouter.delete('/:id', auth, permit("admin"), async (req, res) => {
  try {
    const {id} = req.params;

    if (!Types.ObjectId.isValid(id as string)) {
      return res.status(400).send({error: "Invalid track ID!"});
    }
    const track = await Track.findByIdAndDelete(id);

    if (!track) {
      return res.status(404).send({error: "Track not found!"});
    }

    return res.send({
      message: "Track deleted!"
    });

  } catch (e) {
    return res.status(500).send({error: 'Server error!'});
  }
});

tracksRouter.patch('/:id', auth, permit("admin"), async (req: RequestWithUser, res) => {
  try {
    const {id} = req.params;

    if (!Types.ObjectId.isValid(id as string)) {
      return res.status(400).send({
        error: "Invalid track ID!"
      });
    }

    const track = await Track.findById(id);

    if (!track) {
      return res.status(404).send({error: "Track not found!"});
    }

    track.isPublished = !track.isPublished;
    await track.save();
    return res.send(track);

  } catch (e) {
    return res.status(500).send({error: "Server error!"});
  }
});


export default tracksRouter;