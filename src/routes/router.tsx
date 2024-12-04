import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Product from "../pages/Product";
import UsersList from "../ExerciseRoute/UsersList";
import UserDetailes from "../ExerciseRoute/UserDetailes";
import Errors from "../pages/Errors";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement:<Errors/>,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "products",
        element: <Product />,
      },
      {
        path: "users",
        element: <UsersList />,
        children:[
       
        ]
      },
      {
        path:'users/:id',
        element:<UserDetailes/>
      }
    ],
  },
]);
