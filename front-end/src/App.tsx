import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Server from "./pages/Server";
import createMuiTheme from "./theme/theme";
import Login from "./pages/Login";
import AuthServiceProvider from "./components/context/AuthContext";
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
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  const theme = createMuiTheme("dark");
  return (
    <AuthServiceProvider>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />;
      </ThemeProvider>
    </AuthServiceProvider>
  );
}

export default App;
