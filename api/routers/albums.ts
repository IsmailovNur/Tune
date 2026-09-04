import { Router } from "express";
import { Types } from "mongoose";
import { Album } from "../models/Album";
import { Artist } from "../models/Artist";
import { Track } from "../models/Track";
import { TrackHistory } from "../models/TrackHistory";
import { auth, authOptional } from "../middlewares/auth";
import { RequestWithUser, type IAlbum } from "../types";
import { permit } from "../middlewares/permit";
import { upload } from "../multer";

const albumsRouter = Router();

albumsRouter.get('/', authOptional, async (req: RequestWithUser, res) => {
  try {
    const {artist} = req.query;

    const filter: Record<string, unknown> = {};

    if (artist) {
      if (
        typeof artist !== "string" ||
        !Types.ObjectId.isValid(artist)
      ) {
        return res.status(400).send({
          error: "Invalid artist ID!"
        });
      }

      filter.artist = artist;
    }

    if (req.user?.role !== "admin") {
      filter.isPublished = true;
    }

    const albums = await Album.find(filter)
      .sort({releaseYear: -1})
      .populate('artist', 'name');

    const validAlbums = albums.filter((album) => album.artist);

    const albumsWithTrackCount = await Promise.all(
      validAlbums.map(async (album) => {
        const count = await Track.countDocuments({
          album: album._id
        });

        return {
          ...album.toObject(),
          tracksCount: count,
        };
      })
    );

    return res.send(albumsWithTrackCount);
  } catch (e) {
    return res.status(500).send({
      error: 'Server error!'
    });
  }
});

albumsRouter.get('/:id', authOptional, async (req: RequestWithUser, res) => {
  try {
    const {id} = req.params;

    if (!Types.ObjectId.isValid(id as string)) {
      return res.status(400).send({
        error: "Invalid album ID!"
      });
    }
    const filter: Record<string, unknown>  = {
      _id: id
    };

    if (req.user?.role !== "admin") {
      filter.isPublished = true;
    }

    const album = await Album
      .findOne(filter)
      .populate('artist', 'name');

    if (!album || !album.artist) {
      return res.status(404).send({
        error: 'Album not found'
      });
    }

    return res.send(album);
  } catch (e) {
    return res.status(500).send({
      error: 'Server error!'
    });
  }
});

albumsRouter.post(
  '/',
  auth,
  upload.single('coverImage'),
  async (req: RequestWithUser, res) => {
    try {
      const {title, artist, releaseYear} = req.body;

      if (typeof title !== "string" || !title.trim()) {
        return res.status(400).send({
          error: "Album title is required!"
        });
      }

      if (typeof artist !== "string" || !artist.trim()) {
        return res.status(400).send({
          error: "Artist is required!"
        });
      }

      if (!Types.ObjectId.isValid(artist)) {
        return res.status(400).send({
          error: "Invalid artist ID!"
        });
      }

      const existingArtist = await Artist.findById(artist);

      if (!existingArtist) {
        return res.status(404).send({
          error: "Artist not found!"
        });
      }

      const parsedReleaseYear = Number(releaseYear);

      if (
        !releaseYear ||
        !Number.isInteger(parsedReleaseYear) ||
        parsedReleaseYear < 0
      ) {
        return res.status(400).send({
          error: "Release year must be a non-negative integer!"
        });
      }

      const album = new Album({
        title: title.trim(),
        artist,
        releaseYear: parsedReleaseYear,
        coverImage: req.file
          ? 'images/' + req.file.filename
          : null,
      });

      await album.save();

      return res.send(album);
    } catch (e) {
      if (e instanceof Error) {
        return res.status(400).send({
          error: e.message
        });
      }

      return res.status(500).send({
        error: 'Server error!'
      });
    }
  }
);

albumsRouter.delete(
  '/:id',
  auth,
  permit("admin"),
  async (req: RequestWithUser, res) => {
    try {
      const {id} = req.params;

      if (!Types.ObjectId.isValid(id as string)) {
        return res.status(400).send({
          error: "Invalid album ID!"
        });
      }

      const album = await Album.findById(id);

      if (!album) {
        return res.status(404).send({
          error: "Album not found!"
        });
      }

      const tracks = await Track
        .find({album: id})
        .select("_id");

      const trackIds = tracks.map((track) => track._id);

      await TrackHistory.deleteMany({
        track: {$in: trackIds}
      });

      await Track.deleteMany({
        album: id
      });

      await album.deleteOne();

      return res.send({
        message: "Album deleted!"
      });
    } catch (e) {
      return res.status(500).send({
        error: "Server error!"
      });
    }
  }
);

albumsRouter.patch(
  '/:id/togglePublished',
  auth,
  permit("admin"),
  async (req: RequestWithUser, res) => {
    try {
      const {id} = req.params;

      if (!Types.ObjectId.isValid(id as string)) {
        return res.status(400).send({
          error: "Invalid album ID!"
        });
      }

      const album = await Album.findById(id);

      if (!album) {
        return res.status(404).send({
          error: "Album not found!"
        });
      }

      album.isPublished = !album.isPublished;

      await album.save();

      return res.send(album);
    } catch (e) {
      return res.status(500).send({
        error: "Server error!"
      });
    }
  }
);

export default albumsRouter;