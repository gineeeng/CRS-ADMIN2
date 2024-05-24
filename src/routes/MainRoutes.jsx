import Welcome from "../pages/Welcome";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import User from "../pages/User";
import FindUser from "../pages/FindUser";
import Archive from "../pages/Archive";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";

export const mainRoutes = [
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
    children: [
      {
        path: "",
        element: <Welcome/>,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "user",
        element: <User />,
      },
      {
        path: "user/:id",
        element: <FindUser/>,
      },
      {
        path: "archive",
        element: <Archive/>,
      },
      {
        path: "settings",
        element: <Settings/>,
      },
    ],
  },
]