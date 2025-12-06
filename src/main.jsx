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
import AuthProvider from "./components/Authentication/AuthProvider.jsx";
import ErrorPage from "./components/Pages/ErrorPage.jsx";
import AllGames from "./components/Pages/Game/AllGames.jsx";
import UserInformation from "./components/Pages/UserManagement/UserInformation.jsx";
import ForgotPassword from "./components/Pages/UserManagement/ForgetPassword.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
        handle: { title: "Home | Game Hub" },
      },
      {
        path: "login",
        Component: Login,
        handle: { title: "Login | Game Hub" },
      },
      {
        path: "register",
        Component: Register,
        handle: { title: "Register | Game Hub" },
      },
      {
        path: 'forget-password',
        Component: ForgotPassword,
        handle: { title: "Reset Password | Game Hub" },
      },
      {
        path: "all-games",
        Component: AllGames,
        handle: { title: "All Games | Game Hub" },
      },
      {
        path: "game-details/:id",
        element: (
          <PrivateRoute>
            <GameDetails />
          </PrivateRoute>
        ),
        handle: { title: "Game Details | Game Hub" },
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <UserInformation/>
          </PrivateRoute>
        ),
        handle: { title: "Profile | Game Hub" },
      },
      {
    path: '*',
    Component: ErrorPage

  },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  </StrictMode>
);
