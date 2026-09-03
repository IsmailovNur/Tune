import { Router } from "express";
import { User } from "../models/User";
import mongoose from "mongoose";
import { auth} from "../middlewares/auth";
import { RequestWithUser } from "../types";

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
  try {
    const {username, password} = req.body;

    if (typeof username !== "string" || !username.trim()) {
      return res.status(400).send({error: "Username is required!"});
    }

    if (typeof password !== "string" || !password.trim()) {
      return res.status(400).send({error: "Password is required!"});
    }

    const user = new User({
      username: username.trim(),
      password,
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
    const {username, password} = req.body;

    if (typeof username !== "string" || !username.trim()) {
      return res.status(400).send({error: "Username is required!"});
    }

    if (typeof password !== "string" || !password.trim()) {
      return res.status(400).send({error: "Password is required!"});
    }

    const user = await User.findOne({
      username: username.trim()
    });

    if (!user) {
      return res.status(400).send({error: 'invalid username!'});
    }

    const isMatch = await user.checkPassword(password);

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

usersRouter.delete('/logout', auth, async (req: RequestWithUser, res) => {
  try {
    req.user!.generateToken();
    await req.user!.save();

    return res.send({
      message: "Logged out successfully!"
    });
  } catch (e) {
    return res.status(500).send({error: "Server error!"});
  }
});


export default usersRouter;

