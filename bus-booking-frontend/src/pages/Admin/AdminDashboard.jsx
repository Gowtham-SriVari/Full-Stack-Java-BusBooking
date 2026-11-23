import { useEffect, useState } from "react";

function AdminDashboard() {

  const [dashboard, setDashboard] =
    useState({
      totalUsers: 0,
      totalBuses: 0,
      totalBookings: 0,
      totalRevenue: 0
    });

  useEffect(() => {

    fetch(
      "http://localhost:8080/api/admin/dashboard"
    )
      .then((response) => response.json())
      .then((data) => {

        setDashboard(data);

      })
      .catch((error) => {

        console.error(
          "Dashboard error:",
          error
        );

      });

  }, []);

  return (
    <div className="admin-page">

      <h1>Admin Dashboard</h1>

      <div className="dashboard-grid">

        <div className="dashboard-card">
          <h3>Total Users</h3>
          <p>{dashboard.totalUsers}</p>
        </div>

        <div className="dashboard-card">
          <h3>Total Buses</h3>
          <p>{dashboard.totalBuses}</p>
        </div>

        <div className="dashboard-card">
          <h3>Total Bookings</h3>
          <p>{dashboard.totalBookings}</p>
        </div>

        <div className="dashboard-card">
          <h3>Total Revenue</h3>
          <p>
            ₹{dashboard.totalRevenue}
          </p>
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;