import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import { CreateTipPage } from './pages/create-trip';
import { TripDetails } from './pages/trip-details';

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateTipPage />
  },
  {
    path: "/trips/:tripId",
    element: <TripDetails />
  }
])

export function App() {
  return (
    <RouterProvider router={router} />
  );
}