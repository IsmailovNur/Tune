import { Container, Toolbar, Typography } from "@mui/material";
import { Link } from 'react-router-dom';

const AppHeader = () => {

  return (
    <header>
      <Container maxWidth='lg'>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{textDecoration: 'none', color: 'inherit', fontWeight: 'bold'}}
          >
            Music App
          </Typography>
        </Toolbar>
      </Container>
    </header>
  );
};

export default AppHeader;