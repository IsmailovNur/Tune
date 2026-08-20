import { Box, Button, Container, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { logout } from "../../entities/User/usersSlice";

const AppHeader = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.users.user);

  return (
    <header>
      <Container maxWidth='lg'>
        <Box sx={{display: 'flex', justifyContent: 'space-between', py: 2}}>
          <Typography variant="h6">Todo App</Typography>
          {user && (
            <Button color="inherit" onClick={() => dispatch(logout())}>
              Logout ({user.username})
            </Button>
          )}
        </Box>
      </Container>
    </header>
  );
};

export default AppHeader;