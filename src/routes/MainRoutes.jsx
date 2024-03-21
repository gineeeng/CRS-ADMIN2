import Welcome from "../pages/Welcome";
import Accident from "../pages/Accident";
import Crime from "../pages/Crime";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import User from "../pages/User";
import FindUser from "../pages/FindUser";
import Arson from "../pages/Arson";
import Hazards from "../pages/Hazards";

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
        path: "accident",
        element: <Accident />,
      },
      {
        path: "arson",
        element: <Arson />,
      },
      {
        path: "hazard",
        element: <Hazards />,
      },
      {
        path: "crime",
        element: <Crime />,
      },
      {
        path: "user",
        element: <User />,
      },
      {
        path: "user/:id",
        element: <FindUser/>,
      },
    ],
  },
]