import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import Home from "./routes/Home";
import Favorites from "./routes/Favorites";
import Details from "./components/Details";

function App() {
  // router mappig each route mapped to a component
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/favorites",
      element: <Favorites />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/details",
      element: <Details />,
      errorElement: <ErrorPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
