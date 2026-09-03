import { Router } from "express";
import { Album } from "../models/Album";
import { upload } from "../multer";
import { Track } from "../models/Track";
import { RequestWithUser } from "../types";
import { auth, authOptional } from "../middlewares/auth";
import { Types } from "mongoose";
import { permit } from "../middlewares/permit";

const albumsRouter = Router();

albumsRouter.get('/', authOptional, async (req: RequestWithUser, res) => {
  try {
    const {artist} = req.query;

    const filter = artist ? {artist: artist as string} : {};

    const albums = await Album.find(filter)
      .sort({releaseYear: -1})
      .populate('artist', 'name');

    const albumsWithTrackCount = await Promise.all(
      albums.map(async (album) => {
        const count = await Track.countDocuments({album: album._id});
        return {
          ...album.toObject(),
          tracksCount: count,
        };
      })
    );

    return res.send(albumsWithTrackCount);
  } catch (e) {
    return res.status(500).send({error: 'Server error!'});
  }
});

albumsRouter.get('/:id', authOptional, async (req, res) => {
  try {
    const {id} = req.params;
    const album = await Album.findById(id).populate('artist', 'name');

    if (!album) return res.status(404).send({error: 'Album not found'});

    return res.send(album);
  } catch (e) {
    return res.status(500).send({error: 'Server error!'});
  }
});

albumsRouter.post('/', auth, upload.single('coverImage'), async (req, res) => {
  try {
    const {title, artist, releaseYear} = req.body;

    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).send({error: "Album title is required!"});
    }

    if (typeof artist !== "string" || !artist.trim()) {
      return res.status(400).send({error: "Artist is required!"});
    }

    const album = new Album({
      title,
      artist,
      releaseYear,
      coverImage: req.file ? 'images/' + req.file.filename : null,
    });

    await album.save();
    res.send(album);

  } catch (e) {
    if (e instanceof Error) {
      return res.status(400).send({error: e.message});
    }
    return res.status(500).send({error: 'Server error!'});
  }
});

albumsRouter.delete('/:id', auth, permit("admin"), async (req: RequestWithUser, res) => {
  try {
    const {id} = req.params;

    if (!Types.ObjectId.isValid(id as string)) {
      return res.status(400).send({error: "Invalid album ID!"});
    }

    const album = await Album.findByIdAndDelete(id);

    if (!album) {
      return res.status(404).send({error: "Album not found!"});
    }

    return res.send({
      message: "Album deleted!"
    });

  } catch (e) {
    return res.status(500).send({error: "Server error!"});
  }
});

albumsRouter.patch('/:id/togglePublished', auth, permit("admin"), async (req: RequestWithUser, res) => {
  try {
    const {id} = req.params;

    if (!Types.ObjectId.isValid(id as string)) {
      return res.status(400).send({error: "Invalid album ID!"});
    }

    const album = await Album.findById(id);

    if (!album) {
      return res.status(404).send({error: "Album not found!"});
    }

    album.isPublished = !album.isPublished;
    await album.save();
    return res.send(album);

  } catch (e) {
    return res.status(500).send({error: "Server error!"});
  }
})


export default albumsRouter;