import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as React from 'react';
import { type ChangeEvent, useState } from 'react';
import {
  Link as RouterLink,
  useNavigate
} from 'react-router-dom';
import {
  Box,
  Button,
  Link,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import { registerUser } from "../../entities/User/userThunk.ts";
import {
  selectRegisterError,
  selectRegisterLoading
} from "../../entities/User/userSlice.ts";
import { AppRoutes } from "../../routing/routes.ts";

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const RegisterLoading =
    useAppSelector(selectRegisterLoading);

  const RegisterError =
    useAppSelector(selectRegisterError);

  const [state, setState] = useState({
    username: '',
    password: '',
  });

  const inputChangeHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const {name, value} = e.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const submitHandler = async (
    e: React.SubmitEvent
  ) => {
    e.preventDefault();

    try {
      await dispatch(
        registerUser(state)
      ).unwrap();

      navigate(AppRoutes.main);
    } catch (error) {
      console.log(
        'RegisterPage Error',
        error
      );
    }
  };

  const getFieldError = (
    fieldName: string
  ) => {
    return RegisterError
      ?.errors[fieldName]
      ?.message;
  };

  return (
    <Box sx={{
      maxWidth: 400,
      mx: 'auto',
      mt: 4
    }}>
      <Paper sx={{p: 4}} variant="outlined">
        <Typography
          variant="h5"
          align="center"
          sx={{mb: 4}}
        >
          Sign Up
        </Typography>

        <Box
          component="form"
          onSubmit={submitHandler}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3
          }}
        >
          <TextField
            label="Username"
            name="username"
            value={state.username}
            onChange={inputChangeHandler}
            error={Boolean(
              getFieldError('username')
            )}
            helperText={
              getFieldError('username')
            }
          />

          <TextField
            type="password"
            label="Password"
            name="password"
            value={state.password}
            onChange={inputChangeHandler}
            error={Boolean(
              getFieldError('password')
            )}
            helperText={
              getFieldError('password')
            }
          />

          <Button
            type="submit"
            variant="contained"
            loading={RegisterLoading}
            disabled={
              !state.username.trim() ||
              !state.password.trim()
            }
          >
            Sign Up
          </Button>

          <Typography
            variant="body2"
            sx={{textAlign: 'center'}}
          >
            Already have an account?{' '}

            <Link
              component={RouterLink}
              to={AppRoutes.login}
              underline="hover"
              sx={{cursor: 'pointer'}}
            >
              Login now
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};