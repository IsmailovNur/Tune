import { Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import { AppRoutes } from "../../routing/routes.ts";
import { selectUser, unsetUser } from "../../entities/User/userSlice.ts";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";

const AppHeader = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  return (
    <Box component="header" sx={{mb: 2, borderBottom: '1px solid #fff'}} >
      <Container maxWidth='lg'>
        <Toolbar disableGutters sx={{justifyContent: 'space-between', flexWrap: 'wrap'}}>
          <Typography
            variant="h4"
            component={Link}
            to={AppRoutes.main}
            sx={{textDecoration: 'none', color: 'inherit', fontWeight: 'bold'}}
          >
            Tune
          </Typography>

          <Box>
            {user ? (
              <>
                <Typography variant="body1">Hello, {user.username}!</Typography>
                <Button color="inherit" onClick={() => dispatch(unsetUser())}>
                  Logout
                </Button>
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