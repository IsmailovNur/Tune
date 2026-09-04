import { Router } from "express";
import { Types } from "mongoose";
import { Track } from "../models/Track";
import { Album } from "../models/Album";
import { auth, authOptional } from "../middlewares/auth";
import { type ITrack, RequestWithUser } from "../types";
import { permit } from "../middlewares/permit";
import { TrackHistory } from "../models/TrackHistory";

const tracksRouter = Router();

tracksRouter.get('/', authOptional, async (req: RequestWithUser, res) => {
  try {
    const {album, artist} = req.query;

    const filter: Record<string, unknown> = {};

    if (req.user?.role !== "admin") {
      filter.isPublished = true;
    }

    if (album) {
      if (
        typeof album !== "string" ||
        !Types.ObjectId.isValid(album)
      ) {
        return res.status(400).send({
          error: "Invalid album ID!"
        });
      }

      filter.album = album as unknown as ITrack["album"];
    }

    if (artist) {
      if (
        typeof artist !== "string" ||
        !Types.ObjectId.isValid(artist)
      ) {
        return res.status(400).send({
          error: "Invalid artist ID!"
        });
      }

      const albums = await Album
        .find({artist})
        .select("_id");

      if (!albums.length) {
        return res.send([]);
      }

      filter.album = {
        $in: albums.map((item) => item._id)
      } as unknown as ITrack["album"];
    }

    const tracks = await Track
      .find(filter)
      .sort({trackNumber: 1})
      .populate('album', 'title');

    const validTracks = tracks.filter(
      (track) => track.album
    );

    if (req.user?.role !== "admin") {
      const publishedAlbumIds = await Album
        .find({
          _id: {
            $in: validTracks.map(
              (track) => (track.album as unknown as { _id: Types.ObjectId })._id
            )
          },
          isPublished: true,
        })
        .select("_id");

      const publishedIds = new Set(
        publishedAlbumIds.map(
          (item) => item._id.toString()
        )
      );

      const publishedTracks = validTracks.filter(
        (track) =>
          publishedIds.has(
            (track.album as unknown as { _id: Types.ObjectId })._id.toString()
          )
      );

      return res.send(publishedTracks);
    }

    return res.send(validTracks);
  } catch (e) {
    return res.status(500).send({
      error: 'Server error!'
    });
  }
});

tracksRouter.post(
  '/',
  auth,
  async (req: RequestWithUser, res) => {
    try {
      const {
        title,
        album,
        duration,
        trackNumber
      } = req.body;

      if (
        typeof title !== "string" ||
        !title.trim()
      ) {
        return res.status(400).send({
          error: "Track title is required!"
        });
      }

      if (
        typeof album !== "string" ||
        !album.trim()
      ) {
        return res.status(400).send({
          error: "Album is required!"
        });
      }

      if (!Types.ObjectId.isValid(album)) {
        return res.status(400).send({
          error: "Invalid album ID!"
        });
      }

      const existingAlbum = await Album.findById(album);

      if (!existingAlbum) {
        return res.status(404).send({
          error: "Album not found!"
        });
      }

      if (
        typeof duration !== "string" ||
        !duration.trim()
      ) {
        return res.status(400).send({
          error: "Duration is required!"
        });
      }

      const parsedTrackNumber = Number(trackNumber);

      if (
        !Number.isInteger(parsedTrackNumber) ||
        parsedTrackNumber < 1
      ) {
        return res.status(400).send({
          error: "Track number must be a positive integer!"
        });
      }

      const track = new Track({
        title: title.trim(),
        album,
        duration: duration.trim(),
        trackNumber: parsedTrackNumber,
      });

      await track.save();

      return res.send(track);
    } catch (e) {
      if (
        e instanceof Error &&
        "code" in e &&
        (e as { code?: number }).code === 11000
      ) {
        return res.status(400).send({
          error:
            "This track number is already used in the album!"
        });
      }

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

tracksRouter.delete(
  '/:id',
  auth,
  permit("admin"),
  async (req, res) => {
    try {
      const {id} = req.params;

      if (!Types.ObjectId.isValid(id as string)) {
        return res.status(400).send({
          error: "Invalid track ID!"
        });
      }

      const track = await Track.findById(id);

      if (!track) {
        return res.status(404).send({
          error: "Track not found!"
        });
      }

      await TrackHistory.deleteMany({
        track: id
      });

      await track.deleteOne();

      return res.send({
        message: "Track deleted!"
      });
    } catch (e) {
      return res.status(500).send({
        error: 'Server error!'
      });
    }
  }
);

tracksRouter.patch(
  '/:id/togglePublished',
  auth,
  permit("admin"),
  async (req: RequestWithUser, res) => {
    try {
      const {id} = req.params;

      if (!Types.ObjectId.isValid(id as string)) {
        return res.status(400).send({
          error: "Invalid track ID!"
        });
      }

      const track = await Track.findById(id);

      if (!track) {
        return res.status(404).send({
          error: "Track not found!"
        });
      }

      track.isPublished = !track.isPublished;

      await track.save();

      return res.send(track);
    } catch (e) {
      return res.status(500).send({
        error: "Server error!"
      });
    }
  }
);

export default tracksRouter;