import * as React from 'react';
import { type ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loginUser } from '../../entities/User/userThunk';
import {
  selectLoginError,
  selectLoginLoading
} from '../../entities/User/userSlice';
import {
  Alert,
  Box,
  Button,
  Link,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import { AppRoutes } from "../../routing/routes.ts";
import { Link as RouterLink, useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const LoginLoading = useAppSelector(selectLoginLoading);
  const LoginError = useAppSelector(selectLoginError);

  const [state, setState] = useState({
    username: '',
    password: '',
  });

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState((prevState) => ({...prevState, [name]: value}));
  };

  const submitHandler = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(state)).unwrap();
      navigate(AppRoutes.main);
    } catch (error) {
      console.log('LoginPage Error', error);
    }
  };

  return (
    <Box sx={{maxWidth: 400, mx: 'auto', mt: 4}}>
      <Paper sx={{p: 4}} variant="outlined">
        <Typography variant="h5" align="center" sx={{mb: 4}}>
          Sign In
        </Typography>
        {LoginError && (
          <Alert severity="error" sx={{mb: 2}}>
            {LoginError.error}
          </Alert>
        )}

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
          />

          <TextField
            type="password"
            label="Password"
            name="password"
            value={state.password}
            onChange={inputChangeHandler}
          />

          <Button
            type="submit"
            variant="contained"
            loading={LoginLoading}
          >
            Sign In
          </Button>

          <Typography variant="body2" sx={{textAlign: 'center'}}>
            Don't have an account?{' '}
            <Link
              component={RouterLink}
              to={AppRoutes.register}
              underline="hover"
              sx={{cursor: 'pointer'}}
            >
              Register now
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};