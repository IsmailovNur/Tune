import { model, Schema } from "mongoose";
import { IUser } from "../types";
import bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

UserSchema.pre("save", async function () {
  console.log("saved user");
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.set('toJSON', {
  transform: (doc, ret: Partial<IUser>) => {
    delete ret.password;
    return ret;
  },
});

export const User = model('User', UserSchema);