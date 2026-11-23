import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BusSearch from "./pages/BusSearch";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Admin from "./pages/Admin";

function App() {

  return (
    <>
      <Navbar />

      <Routes>

        {/* Website pages */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/search"
          element={<BusSearch />}
        />

        <Route
          path="/booking/:busId"
          element={<Booking />}
        />

        <Route
          path="/my-bookings"
          element={<MyBookings />}
        />


        {/* Admin pages */}

        <Route
          path="/admin/*"
          element={<Admin />}
        />

      </Routes>
    </>
  );
}

export default App;