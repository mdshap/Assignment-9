import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Root from "./components/Layouts/Root.jsx";
import Login from "./components/Pages/UserManagement/Login.jsx";
import Register from "./components/Pages/UserManagement/Register.jsx";
import Home from "./components/Pages/Home/Home.jsx";
import PrivateRoute from "./components/Privateroute/PrivateRoute.jsx";
import GameDetails from "./components/Pages/Game/GameDetails.jsx";
import Profile from "./components/Pages/UserManagement/Profile.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "game-details/:id",
        element: (
          <PrivateRoute>
            <GameDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "user-profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);
