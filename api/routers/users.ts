import express from "express";
import { IUser } from "../types";
import { randomUUID } from "node:crypto";
import { User } from "../models/User";
import bcrypt from "bcrypt";

const usersRouter = express.Router();

usersRouter.post('/', async (req, res) => {
  const userData: IUser = {
    username: req.body.username,
    password: req.body.password,
    token: randomUUID()
  }

  try {
    const user = new User(userData);
    await user.save();
    res.send(user);

  } catch (e) {
    if (e instanceof Error) {
      return res.status(400).send({error: e.message});
    }
    return res.status(500).send({error: 'Server error!'});
  }
});

usersRouter.post('/sessions', async (req, res) => {
  const user = await User.findOne({username: req.body.username});

  if (!user) {
    return res.status(400).send({error: 'invalid username!'});
  }
  console.log(req.body.password)
  console.log(user.password)
  const isMatch = await bcrypt.compare(req.body.password, user.password);

  if (!isMatch) {
    return res.status(400).send({error: 'invalid password!'});
  }

  // user.token = randomUUID();
  // user.save();
  res.send({message: 'user logged in!', user});


});

export default usersRouter;

