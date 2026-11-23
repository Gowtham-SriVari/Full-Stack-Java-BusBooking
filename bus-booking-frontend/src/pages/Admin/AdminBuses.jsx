import { useEffect, useState } from "react";

const emptyBus = {
  busNumber: "",
  busName: "",
  source: "",
  destination: "",
  departureTime: "",
  arrivalTime: "",
  totalSeats: "",
  price: ""
};

function AdminBuses() {

  const [buses, setBuses] = useState([]);

  const [bus, setBus] = useState(emptyBus);

  const [editingId, setEditingId] =
    useState(null);

  const loadBuses = () => {

    fetch(
      "http://localhost:8080/api/admin/buses"
    )
      .then((response) => response.json())
      .then((data) => {

        setBuses(data);

      })
      .catch((error) => {

        console.error(
          "Error loading buses:",
          error
        );

      });
  };

  useEffect(() => {

    loadBuses();

  }, []);

  const handleChange = (e) => {

    setBus({
      ...bus,
      [e.target.name]: e.target.value
    });

  };

  const saveBus = async (e) => {

    e.preventDefault();

    const busData = {
      ...bus,
      totalSeats: Number(bus.totalSeats),
      price: Number(bus.price)
    };

    try {

      let response;

      if (editingId) {

        response = await fetch(
          `http://localhost:8080/api/admin/buses/${editingId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(busData)
          }
        );

      } else {

        response = await fetch(
          "http://localhost:8080/api/admin/buses",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(busData)
          }
        );

      }

      if (response.ok) {

        alert(
          editingId
            ? "Bus updated successfully"
            : "Bus added successfully"
        );

        setBus(emptyBus);
        setEditingId(null);

        loadBuses();

      } else {

        alert("Operation failed");

      }

    } catch (error) {

      console.error(error);

      alert("Server error");

    }
  };

  const editBus = (bus) => {

    setBus(bus);

    setEditingId(bus.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const deleteBus = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this bus?"
      );

    if (!confirmDelete) {
      return;
    }

    try {

      const response = await fetch(
        `http://localhost:8080/api/admin/buses/${id}`,
        {
          method: "DELETE"
        }
      );

      if (response.ok) {

        alert(
          "Bus deleted successfully"
        );

        loadBuses();

      } else {

        alert("Unable to delete bus");

      }

    } catch (error) {

      console.error(error);

      alert("Server error");

    }
  };

  const cancelEdit = () => {

    setBus(emptyBus);

    setEditingId(null);
  };

  return (
    <div className="admin-page">

      <h1>Bus Management</h1>

      <form
        className="admin-form"
        onSubmit={saveBus}
      >

        <h2>
          {editingId
            ? "Update Bus"
            : "Add New Bus"}
        </h2>

        <input
          name="busNumber"
          placeholder="Bus Number"
          value={bus.busNumber}
          onChange={handleChange}
          required
        />

        <input
          name="busName"
          placeholder="Bus Name"
          value={bus.busName}
          onChange={handleChange}
          required
        />

        <input
          name="source"
          placeholder="Source"
          value={bus.source}
          onChange={handleChange}
          required
        />

        <input
          name="destination"
          placeholder="Destination"
          value={bus.destination}
          onChange={handleChange}
          required
        />

        <input
          name="departureTime"
          placeholder="Departure Time"
          value={bus.departureTime}
          onChange={handleChange}
          required
        />

        <input
          name="arrivalTime"
          placeholder="Arrival Time"
          value={bus.arrivalTime}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="totalSeats"
          placeholder="Total Seats"
          value={bus.totalSeats}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Ticket Price"
          value={bus.price}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="primary-button"
        >
          {editingId
            ? "Update Bus"
            : "Add Bus"}
        </button>

        {editingId && (

          <button
            type="button"
            onClick={cancelEdit}
          >
            Cancel
          </button>

        )}

      </form>


      <h2>Available Buses</h2>

      <div className="admin-table-container">

        <table>

          <thead>

            <tr>
              <th>ID</th>
              <th>Bus Number</th>
              <th>Name</th>
              <th>Route</th>
              <th>Seats</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {buses.map((bus) => (

              <tr key={bus.id}>

                <td>{bus.id}</td>

                <td>
                  {bus.busNumber}
                </td>

                <td>
                  {bus.busName}
                </td>

                <td>
                  {bus.source}
                  {" → "}
                  {bus.destination}
                </td>

                <td>
                  {bus.totalSeats}
                </td>

                <td>
                  ₹{bus.price}
                </td>

                <td>

                  <button
                    onClick={() =>
                      editBus(bus)
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteBus(bus.id)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AdminBuses;