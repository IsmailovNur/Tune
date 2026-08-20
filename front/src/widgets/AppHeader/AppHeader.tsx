import { Box, Container, Toolbar, Typography } from "@mui/material";
import { Link } from 'react-router-dom';

const AppHeader = () => {

  return (
    <Box component="header" sx={{ mb: 2 }}>
      <Container maxWidth='lg'>
        <Toolbar disableGutters >
          <Typography
            variant="h4"
            component={Link}
            to="/"
            sx={{textDecoration: 'none', color: 'inherit', fontWeight: 'bold'}}
          >
            Tune
          </Typography>
        </Toolbar>
      </Container>
    </Box>
  );
};

export default AppHeader;