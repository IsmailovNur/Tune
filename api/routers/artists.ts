import { Router } from "express";
import { Artist } from "../models/Artist";
import { RequestWithUser } from "../types";
import { auth, authOptional } from "../middlewares/auth";
import { permit } from "../middlewares/permit";
import { Types } from "mongoose";

const artistsRouter = Router();

artistsRouter.get('/', authOptional, async (req: RequestWithUser, res) => {
  try {
    const filter = req.user?.role === "admin" ? {} : {isPublished: true};

    const artists = await Artist.find(filter);
    res.send(artists);

  } catch (e) {
    return res.status(500).send({error: 'Server error!'});
  }
});


artistsRouter.post('/', auth, async (req: RequestWithUser, res) => {
  try {
    const {name, image, information} = req.body;

    if (typeof name !== "string" || !name.trim()) {
      return res.status(400).send({error: "Artist name is required!"});
    }

    const artist = new Artist({
      name: name.trim(),
      image: image?.trim(),
      information: information?.trim(),
    });

    await artist.save();
    return res.send(artist);

  } catch (e) {
    if (e instanceof Error) {
      return res.status(400).send({error: e.message});
    }
    return res.status(500).send({error: 'Server error!'});
  }
});

artistsRouter.delete('/:id', auth, permit("admin"), async (req: RequestWithUser, res) => {
  try {
    const {id} = req.params;

    if (!Types.ObjectId.isValid(id as string)) {
      return res.status(400).send({error: "Invalid artist ID!"});
    }

    const artist = await Artist.findByIdAndDelete(id);

    if (!artist) {
      return res.status(404).send({error: "Artist not found!"});
    }

    return res.send({message: "Artist deleted!"});

  } catch (e) {
    return res.status(500).send({error: "Server error!"});
  }
});

artistsRouter.patch('/:id/togglePublised', auth, permit("admin"), async (req: RequestWithUser, res) => {

  try {
    const {id} = req.params;

    if (!Types.ObjectId.isValid(id as string)) {
      return res.status(400).send({error: "Invalid artist ID!"});
    }

    const artist = await Artist.findById(id);

    if (!artist) {
      return res.status(404).send({error: "Artist not found!"});
    }

    artist.isPublished = !artist.isPublished;
    await artist.save();
    return res.send(artist);

  } catch (e) {
    return res.status(500).send({error: "Server error!"});
  }
})


export default artistsRouter;