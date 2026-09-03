import { Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import { AppRoutes } from "../../routing/routes.ts";
import { selectUser, unsetUser } from "../../entities/User/userSlice.ts";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { logoutUser } from "../../entities/User/userThunk.ts";

const AppHeader = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
    } catch (e) {
      console.log("Logout error", e);
    } finally {
      dispatch(unsetUser());
      navigate(AppRoutes.main);
    }
  };

  return (
    <Box component="header" sx={{mb: 2, borderBottom: '1px solid #fff'}}>
      <Container maxWidth='lg'>
        <Toolbar disableGutters sx={{
          justifyContent: 'space-between',
          flexWrap: 'wrap'
        }}>
          <Typography
            variant="h4"
            component={Link}
            to={AppRoutes.main}
            sx={{textDecoration: 'none', color: 'inherit', fontWeight: 'bold'}}
          >
            Tune
          </Typography>

          <Box sx={{display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap'}}>
            {user ? (
              <>
                <Typography variant="body1">Hello, {user.username}!</Typography>

                <Button
                  component={Link}
                  to={AppRoutes.createArtist}
                  color="inherit"
                >Add Artist</Button>

                <Button
                  component={Link}
                  to={AppRoutes.createAlbum}
                  color="inherit"
                >Add Album</Button>

                <Button
                  component={Link}
                  to={AppRoutes.createTrack}
                  color="inherit"
                >Add Track</Button>

                <Button
                  component={Link}
                  to={AppRoutes.trackHistory}
                  color="inherit">
                  Track History</Button>

                <Button color="inherit" onClick={logoutHandler}>Logout</Button>
              </>
            ) : (
              <>
                <Button component={Link} to={AppRoutes.login} color="inherit">
                  Sign In
                </Button>
                <Button component={Link} to={AppRoutes.register} color="inherit">
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </Box>
  );
};

export default AppHeader;