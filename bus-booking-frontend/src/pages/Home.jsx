import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {

  const [buses, setBuses] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    fetch("http://localhost:8080/api/buses")
      .then((response) => response.json())
      .then((data) => {

        setBuses(data);

      })
      .catch((error) => {

        console.error(
          "Error fetching buses:",
          error
        );

      });

  }, []);

  return (
    <div className="home-page">

      <section className="hero-section">
<img src="src/assets/hero.png" alt="hero.img" />

        <h1>
          Welcome to Bus Booking System
        </h1>

        <p>
          Book your bus tickets quickly and easily.
        </p>

        <button
          onClick={() => navigate("/search")}
          className="primary-button"
        >
          <button>Search Buses</button>
        </button>

      </section>


      <section className="available-buses">

        <h2>
          Available Buses
        </h2>

        {buses.length === 0 ? (

          <p>
            No buses available at the moment.
          </p>

        ) : (

          <div className="bus-grid">

            {buses.map((bus) => (

              <div
                className="bus-card"
                key={bus.id}
              >

                <h3>
                  {bus.busName}
                </h3>

                <p>
                  <strong>
                    Bus Number:
                  </strong>{" "}
                  {bus.busNumber}
                </p>

                <p>
                  <strong>
                    Route:
                  </strong>{" "}
                  {bus.source} → {bus.destination}
                </p>

                <p>
                  <strong>
                    Departure:
                  </strong>{" "}
                  {bus.departureTime}
                </p>

                <p>
                  <strong>
                    Arrival:
                  </strong>{" "}
                  {bus.arrivalTime}
                </p>

                <p>
                  <strong>
                    Seats:
                  </strong>{" "}
                  {bus.totalSeats}
                </p>

                <p className="bus-price">
                  ₹{bus.price}
                </p>

                <button
                  className="primary-button"
                  onClick={() =>
                    navigate(`/booking/${bus.id}`)
                  }
                >
                  Book Now
                </button>

              </div>

            ))}

          </div>

        )}

      </section>

    </div>
  );
}

export default Home;