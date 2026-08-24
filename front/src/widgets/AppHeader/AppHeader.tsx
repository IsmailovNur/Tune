import { Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import { AppRoutes } from "../../routing/routes.ts";

const AppHeader = () => {

  return (
    <Box component="header" sx={{mb: 2}}>
      <Container maxWidth='lg'>
        <Toolbar disableGutters sx={{justifyContent: 'space-between'}}>
          <Typography
            variant="h4"
            component={Link}
            to={AppRoutes.main}
            sx={{textDecoration: 'none', color: 'inherit', fontWeight: 'bold'}}
          >
            Tune
          </Typography>

          <Box>
            <Button component={Link} to={AppRoutes.register} color="inherit">
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </Box>
  );
};

export default AppHeader;