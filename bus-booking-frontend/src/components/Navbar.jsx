import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {

    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="navbar">

      <div className="logo">
        <Link to="/">Holidays Bus Service</Link>
      </div>

      <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/search">Search Buses</Link>

        {user && (
          <Link to="/my-bookings">
            My Bookings
          </Link>
        )}

        {user?.role === "ADMIN" && (
          <Link to="/admin">
            Admin
          </Link>
        )}

        {!user ? (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>
          </>
        ) : (
          <button onClick={logout}>
            Logout
          </button>
        )}

      </div>

    </nav>
  );
}

export default Navbar;