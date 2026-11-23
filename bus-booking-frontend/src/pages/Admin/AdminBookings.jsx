import { useEffect, useState } from "react";

function AdminBookings() {

  const [bookings, setBookings] =
    useState([]);

  const loadBookings = () => {

    fetch(
      "http://localhost:8080/api/admin/bookings"
    )
      .then((response) => response.json())
      .then((data) => {

        setBookings(data);

      })
      .catch((error) => {

        console.error(
          "Error loading bookings:",
          error
        );

      });
  };

  useEffect(() => {

    loadBookings();

  }, []);

  const cancelBooking = async (id) => {

    const confirmCancel =
      window.confirm(
        "Cancel this booking?"
      );

    if (!confirmCancel) {
      return;
    }

    try {

      const response = await fetch(
        `http://localhost:8080/api/admin/bookings/${id}/cancel`,
        {
          method: "PUT"
        }
      );

      if (response.ok) {

        alert(
          "Booking cancelled successfully"
        );

        loadBookings();

      } else {

        alert(
          "Unable to cancel booking"
        );

      }

    } catch (error) {

      console.error(error);

      alert("Server error");

    }
  };

  return (
    <div className="admin-page">

      <h1>Booking Management</h1>

      <div className="admin-table-container">

        <table>

          <thead>

            <tr>
              <th>ID</th>
              <th>Passenger</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {bookings.map((booking) => (

              <tr key={booking.id}>

                <td>
                  {booking.id}
                </td>

                <td>
                  {booking.passengerName}
                </td>

                <td>
                  ₹{booking.amount}
                </td>

                <td>
                  {booking.status}
                </td>

                <td>

                  {booking.status === "BOOKED" && (

                    <button
                      onClick={() =>
                        cancelBooking(
                          booking.id
                        )
                      }
                    >
                      Cancel
                    </button>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AdminBookings;