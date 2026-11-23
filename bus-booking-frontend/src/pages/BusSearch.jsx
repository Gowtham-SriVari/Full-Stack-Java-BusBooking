import { useState } from "react";
import { useNavigate } from "react-router-dom";

function BusSearch() {

  const navigate = useNavigate();

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  const [showSourceList, setShowSourceList] = useState(false);
  const [showDestinationList, setShowDestinationList] = useState(false);

  const [buses, setBuses] = useState([]);

  // Tamil Nadu districts
  const districts = [
    "Ariyalur",
    "Chengalpattu",
    "Chennai",
    "Coimbatore",
    "Cuddalore",
    "Dharmapuri",
    "Dindigul",
    "Erode",
    "Kallakurichi",
    "Kanchipuram",
    "Kanniyakumari",
    "Karur",
    "Krishnagiri",
    "Madurai",
    "Mayiladuthurai",
    "Nagapattinam",
    "Namakkal",
    "Perambalur",
    "Pudukkottai",
    "Ramanathapuram",
    "Ranipet",
    "Salem",
    "Sivaganga",
    "Tenkasi",
    "Thanjavur",
    "Theni",
    "Thoothukudi",
    "Tiruchirappalli",
    "Tirunelveli",
    "Tirupathur",
    "Tiruppur",
    "Tiruvallur",
    "Tiruvannamalai",
    "Tiruvarur",
    "Vellore",
    "Viluppuram",
    "Virudhunagar"
  ];

  const searchBuses = async (e) => {

    e.preventDefault();

    const response = await fetch(
      `http://localhost:8080/api/buses/search?source=${source}&destination=${destination}`
    );

    const data = await response.json();

    setBuses(data);
  };

  return (
    <div className="page-container">

      <h2>Search Buses🔎</h2>

      <form
        className="search-form"
        onSubmit={searchBuses}
      >

        {/* FROM */}
        <div className="district-select">

          <input
            type="text"
            placeholder="From"
            value={source}
            onClick={() => {
              setShowSourceList(true);
              setShowDestinationList(false);
            }}
            onChange={(e) => {
              setSource(e.target.value);
              setShowSourceList(true);
            }}
            required
          />

          {showSourceList && (
            <div className="district-dropdown">

              {districts
                .filter((district) =>
                  district
                    .toLowerCase()
                    .includes(source.toLowerCase())
                )
                .map((district) => (

                  <div
                    className="district-option"
                    key={district}
                    onClick={() => {
                      setSource(district);
                      setShowSourceList(false);
                    }}
                  >
                    {district}
                  </div>

                ))}

            </div>
          )}

        </div>


        {/* TO */}
        <div className="district-select">

          <input
            type="text"
            placeholder="To"
            value={destination}
            onClick={() => {
              setShowDestinationList(true);
              setShowSourceList(false);
            }}
            onChange={(e) => {
              setDestination(e.target.value);
              setShowDestinationList(true);
            }}
            required
          />

          {showDestinationList && (
            <div className="district-dropdown">

              {districts
                .filter((district) =>
                  district
                    .toLowerCase()
                    .includes(destination.toLowerCase())
                )
                .map((district) => (

                  <div
                    className="district-option"
                    key={district}
                    onClick={() => {
                      setDestination(district);
                      setShowDestinationList(false);
                    }}
                  >
                    {district}
                  </div>

                ))}

            </div>
          )}

        </div>


        <button type="submit">
          Search
        </button>

      </form>


      <div className="bus-list">

        {buses.length === 0 ? (
          <p>
            No buses found.
          </p>
        ) : (

          buses.map((bus) => (

            <div
              className="bus-card"
              key={bus.id}
            >

              <h3>{bus.busName}</h3>

              <p>
                Bus Number: {bus.busNumber}
              </p>

              <p>
                {bus.source} → {bus.destination}
              </p>

              <p>
                Departure: {bus.departureTime}
              </p>

              <p>
                Arrival: {bus.arrivalTime}
              </p>

              <p>
                Seats: {bus.totalSeats}
              </p>

              <h4>
                ₹{bus.price}
              </h4>

              <button
                onClick={() =>
                  navigate(`/booking/${bus.id}`)
                }
              >
                Book Now
              </button>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default BusSearch;