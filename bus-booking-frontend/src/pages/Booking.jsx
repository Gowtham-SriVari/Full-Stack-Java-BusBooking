import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Booking() {

  const { busId } = useParams();

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [bus, setBus] = useState(null);

  const [passengerName, setPassengerName] =
    useState("");

  const [selectedSeats, setSelectedSeats] =
    useState([]);

  useEffect(() => {

    if (!user) {
      navigate("/login");
      return;
    }

    fetch(
      `http://localhost:8080/api/buses/${busId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setBus(data);
      })
      .catch((error) => {
        console.error("Error loading bus:", error);
      });

  }, [busId, navigate]);

  const selectSeat = (seatNumber) => {

    if (selectedSeats.includes(seatNumber)) {

      setSelectedSeats(
        selectedSeats.filter(
          (seat) => seat !== seatNumber
        )
      );

    } else {

      setSelectedSeats([
        ...selectedSeats,
        seatNumber
      ]);

    }
  };

  const totalAmount =
    bus
      ? bus.price * selectedSeats.length
      : 0;

  const bookTicket = async (e) => {

    e.preventDefault();

    if (selectedSeats.length === 0) {

      alert("Please select at least one seat");

      return;
    }

    const bookingData = {
      userId: user.id,
      busId: bus.id,
      passengerName: passengerName,
      seatNumbers: selectedSeats
    };

    console.log("Booking data:", bookingData);

    try {

      const response = await fetch(
        "http://localhost:8080/api/bookings",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(bookingData)
        }
      );

      const data = await response.json();

      if (response.ok) {

        alert(
          `Booking successful!\n\n` +
          `Seats: ${data.seatNumbers.join(", ")}\n` +
          `Total Amount: ₹${data.amount}`
        );

        navigate("/my-bookings");

      } else {

        alert(
          data.message || "Booking failed"
        );
      }

    } catch (error) {

      console.error("Booking error:", error);

      alert(
        "Unable to connect to the server"
      );
    }
  };

  if (!bus) {
    return (
      <div className="page-container">
        <h2>Loading bus details...</h2>
      </div>
    );
  }

  return (
    <div className="page-container">

      <div className="booking-container">

        <h2>Book Ticket</h2>

        <div className="bus-details">

          <h3>{bus.busName}</h3>

          <p>
            {bus.source} → {bus.destination}
          </p>

          <p>
            Ticket Price: ₹{bus.price}
          </p>

        </div>

        <form onSubmit={bookTicket}>

          <input
            type="text"
            placeholder="Passenger Name"
            value={passengerName}
            onChange={(e) =>
              setPassengerName(e.target.value)
            }
            required
          />

          <h3>Select Seats</h3>

          <div className="seat-container">

            {Array.from(
              { length: bus.totalSeats },
              (_, index) => {

                const seatNumber = index + 1;

                const isSelected =
                  selectedSeats.includes(
                    seatNumber
                  );

                return (

                  <button
                    type="button"
                    key={seatNumber}
                    className={
                      isSelected
                        ? "seat selected"
                        : "seat"
                    }
                    onClick={() =>
                      selectSeat(seatNumber)
                    }
                  >
                    {seatNumber}
                  </button>

                );
              }
            )}

          </div>

          <div className="booking-summary">

            <p>
              <strong>Selected Seats:</strong>{" "}

              {selectedSeats.length > 0
                ? selectedSeats.join(", ")
                : "None"}
            </p>

            <p>
              <strong>Number of Seats:</strong>{" "}
              {selectedSeats.length}
            </p>

            <p>
              <strong>Price per Seat:</strong>{" "}
              ₹{bus.price}
            </p>

            <h3>
              Total Amount: ₹{totalAmount}
            </h3>

          </div>

          <button
            type="submit"
            className="primary-button"
          >
            Confirm Booking
          </button>

        </form>

      </div>

    </div>
  );
}

export default Booking;