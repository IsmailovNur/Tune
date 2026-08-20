import { Box, Container, Typography } from '@mui/material';
import AppHeader from "./widgets/AppHeader/AppHeader";
import { TodoItem } from "./entities/Todo/TodoItem";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./app/store";
import { useEffect } from "react";
import { fetchTodos } from "./entities/Todo/todosThunk";
import { AuthForm } from "./entities/User/AuthForm";
import { TodoForm } from "./entities/Todo/TodoForm";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.users.user);
  const todos = useSelector((state: RootState) => state.todos.items);

  useEffect(() => {
    if (user) {
      dispatch(fetchTodos());
    }
  }, [dispatch, user]);

  if (!user) {
    return <AuthForm />;
  }

  return (
    <>
      <AppHeader />
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ mb: 3 }}>
          TODOS
        </Typography>

        <TodoForm />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {todos.map((todo) => (
            <TodoItem key={todo._id} todo={todo} />
          ))}
        </Box>
      </Container>
    </>
  );
};

export default App;