import { Router } from "express";
import { Album } from "../models/Album";
import { upload } from "../multer";

const albumsRouter = Router();

albumsRouter.get('/', async (req, res) => {
  try {
    const {artist} = req.query;

    const filteredByArtist = artist ? {artist: artist as string} : {};

    const albums = await Album.find(filteredByArtist).populate('artist', 'name');
    return res.send(albums);
  } catch (e) {
    return res.status(500).send({error: 'Server error!'});
  }
});

albumsRouter.get('/:id', async (req, res) => {
  try {
    const {id} = req.params;

    const album = await Album.findById(id).populate('artist', 'name');

    if (!album) return res.status(404).send({error: 'Album not found'});

    return res.send(album);

  } catch (e) {
    return res.status(500).send({error: 'Server error!'});
  }
});

albumsRouter.post('/', upload.single('coverImage'), async (req, res) => {
  try {
    const {title, artist, releaseYear, coverImage} = req.body;
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

export default albumsRouter;