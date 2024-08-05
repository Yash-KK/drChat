import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Server from "./pages/Server";
import createMuiTheme from "./theme/theme";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/explore/:categoryName",
    element: <Explore />,
  },
  {
    path: "/server/:serverId/:channelId?",
    element: <Server />,
  },
]);

function App() {
  const theme = createMuiTheme("light");
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />;
    </ThemeProvider>
  );
}

export default App;
