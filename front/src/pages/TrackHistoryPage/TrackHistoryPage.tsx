import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../../entities/User/userSlice';
import { fetchTrackHistory } from '../../entities/TrackHistory/trackHistoryThunk';
import { selectHistory, selectHistoryLoading } from '../../entities/TrackHistory/trackHistorySlice';
import { Spinner } from '../../shared/Spinner/Spinner';
import { Box, Typography, List, ListItem, ListItemText, Divider, Paper } from '@mui/material';
import { AppRoutes } from "../../routing/routes.ts";

export const TrackHistoryPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const history = useAppSelector(selectHistory);
  const loading = useAppSelector(selectHistoryLoading);

  useEffect(() => {
    if (!user) {
      navigate(AppRoutes.login);
    } else {
      dispatch(fetchTrackHistory());
    }
  }, [user, dispatch, navigate]);

  if (loading) return <Spinner isLoading />;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Track History
      </Typography>

      <Paper variant="outlined">
        <List disablePadding>
          {history.map((item, index) => (
            <div key={item._id}>
              <ListItem>
                <ListItemText
                  primary={`${item.artist?.name || 'Unknown Artist'} — ${item.tracks?.title || 'Unknown Track'}`}
                  secondary={new Date(item.datetime).toLocaleString()}
                />
              </ListItem>
              {index < history.length - 1 && <Divider />}
            </div>
          ))}
        </List>
      </Paper>
    </Box>
  );
};