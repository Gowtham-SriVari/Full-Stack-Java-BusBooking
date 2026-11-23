import { useEffect, useState } from "react";

function MyBookings() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [bookings, setBookings] =
    useState([]);

  const loadBookings = async () => {

    const response = await fetch(
      `http://localhost:8080/api/bookings/user/${user.id}`
    );

    const data = await response.json();

    setBookings(data);
  };

  useEffect(() => {

    if (user) {
      loadBookings();
    }

  }, []);

  const cancelBooking = async (id) => {

    const response = await fetch(
      `http://localhost:8080/api/bookings/${id}/cancel`,
      {
        method: "PUT"
      }
    );

    if (response.ok) {

      alert("Booking cancelled");

      loadBookings();
    }
  };

  return (
    <div className="page-container">

      <h2>My Bookings</h2>

      {bookings.length === 0 ? (

        <p>
          You don't have any bookings.
        </p>

      ) : (

        bookings.map((booking) => (

          <div
            className="booking-card"
            key={booking.id}
          >

            <h3>
              {booking.bus.busName}
            </h3>

            <p>
              Route: {booking.bus.source}
              {" → "}
              {booking.bus.destination}
            </p>

            <p>
              Passenger:
              {" "}
              {booking.passengerName}
            </p>

            <p>
              Seat:
              {" "}
              {booking.seatNumbers}
            </p>

            <p>
              Amount:
              {" "}
              ₹{booking.amount}
            </p>

            <p>
              Status:
              {" "}
              {booking.status}
            </p>

            {booking.status === "BOOKED" && (

              <button
                onClick={() =>
                  cancelBooking(booking.id)
                }
              >
                Cancel Booking
              </button>

            )}

          </div>

        ))

      )}

    </div>
  );
}

export default MyBookings;