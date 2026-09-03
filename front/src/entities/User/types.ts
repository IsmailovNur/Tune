export type UserRole = "admin" | "user";

export interface User {
  _id: string;
  username: string;
  token: string;
  role: UserRole;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  name: string;
  message: string;
  _message: string;
}

export interface GlobalError {
  error: string
}