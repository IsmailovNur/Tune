import { createRoot } from "react-dom/client";
import App from "./App";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { addInterceptors } from "./shared/axios/AxiosApi";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

addInterceptors(store.getState);

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={darkTheme}>
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  </ThemeProvider>
);
