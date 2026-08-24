import { Router } from "express";
import { User } from "../models/User";
import mongoose from "mongoose";

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });

    user.generateToken();
    await user.save();
    res.send(user);

  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return res.status(500).send({error: 'Server error!'});
  }
});

usersRouter.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({username: req.body.username});

    if (!user) {
      return res.status(400).send({error: 'invalid username!'});
    }
    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(400).send({error: 'invalid password!'});
    }

    user.generateToken();
    await user.save();
    res.send(user);

  } catch (e) {
    if (e instanceof Error) {
      return res.status(400).send({error: e.message});
    }
    return res.status(500).send({error: 'Server error!'});
  }
});

export default usersRouter;

