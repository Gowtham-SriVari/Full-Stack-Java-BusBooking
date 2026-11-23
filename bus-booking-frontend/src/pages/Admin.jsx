import { Link, Routes, Route } from "react-router-dom";

import AdminDashboard from "./admin/AdminDashboard.jsx";
import AdminBuses from "./admin/AdminBuses.jsx";
import AdminUsers from "./admin/AdminUsers.jsx";
import AdminBookings from "./admin/AdminBookings.jsx";

function Admin() {
  return (
    <div className="admin-layout">

      <aside className="admin-sidebar">

        <h2>Admin Panel</h2>

        <Link to="/admin">
          Dashboard
        </Link>

        <Link to="/admin/buses">
          Manage Buses
        </Link>

        <Link to="/admin/users">
          Manage Users
        </Link>

        <Link to="/admin/bookings">
          Manage Bookings
        </Link>

        <Link to="/">
          Back to Website
        </Link>

      </aside>

      <main className="admin-content">

        <Routes>

          <Route
            path="/"
            element={<AdminDashboard />}
          />

          <Route
            path="/buses"
            element={<AdminBuses />}
          />

          <Route
            path="/users"
            element={<AdminUsers />}
          />

          <Route
            path="/bookings"
            element={<AdminBookings />}
          />

        </Routes>

      </main>

    </div>
  );
}

export default Admin;