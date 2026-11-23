import { useEffect, useState } from "react";

function AdminUsers() {

  const [users, setUsers] = useState([]);

  useEffect(() => {

    fetch(
      "http://localhost:8080/api/admin/users"
    )
      .then((response) => response.json())
      .then((data) => {

        setUsers(data);

      })
      .catch((error) => {

        console.error(
          "Error loading users:",
          error
        );

      });

  }, []);

  return (
    <div className="admin-page">

      <h1>User Management</h1>

      <div className="admin-table-container">

        <table>

          <thead>

            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr key={user.id}>

                <td>{user.id}</td>

                <td>{user.name}</td>

                <td>{user.email}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AdminUsers;