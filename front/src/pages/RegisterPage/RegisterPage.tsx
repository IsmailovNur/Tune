import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import { type ChangeEvent, useState } from "react";
import { registerUser } from "../../entities/User/userThunk.ts";
import {
  selectRegisterError,
  selectRegisterLoading
} from "../../entities/User/userSlice.ts";
import { AppRoutes } from "../../routing/routes.ts";

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const RegisterLoading = useAppSelector(selectRegisterLoading);
  const RegisterError = useAppSelector(selectRegisterError);

  const [state, setState] = useState({
    username: '',
    password: '',
  });

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState((prevState) => ({...prevState, [name]: value}));
  };

  const submitHandler = async (e: SubmitEvent) => {
    e.preventDefault();
    try {
      await dispatch(registerUser(state)).unwrap();
      navigate(AppRoutes.main);
    } catch (error) {
      console.log('RegisterPage Error', error);
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return RegisterError?.errors[fieldName].message;
    } catch (error) {
      return undefined;
    }
  }

  return (
    <Box sx={{maxWidth: 400, mx: 'auto', mt: 4}}>
      <Paper sx={{p: 4}} variant="outlined">

        <Typography variant="h5" align="center" gutterBottom>
          Sign Up
        </Typography>

        <Box
          component="form"
          onSubmit={submitHandler}
          sx={{display: 'flex', flexDirection: 'column', gap: 3}}
        >
          <TextField
            label="Username"
            name="username"
            value={state.username}
            onChange={inputChangeHandler}
            error={Boolean(getFieldError('username'))}
            helperText={getFieldError('username')}
          />
          <TextField
            type="password"
            label="Password"
            name="password"
            value={state.password}
            onChange={inputChangeHandler}
            error={Boolean(getFieldError('password'))}
            helperText={getFieldError('password')}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={RegisterLoading}
          >
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};