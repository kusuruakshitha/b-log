import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="nav">
      <Link to="/" className="brand">
        Thiranex
      </Link>
      <nav className="nav-links">
        <NavLink to="/">Home</NavLink>
        {user && <NavLink to="/create">Create</NavLink>}
        {user && <NavLink to="/dashboard">Dashboard</NavLink>}
      </nav>
      <div className="nav-actions">
        {user ? (
          <>
            <span className="user-chip">{user.name}</span>
            <button type="button" className="ghost-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="ghost-button" to="/login">
              Login
            </Link>
            <Link className="primary-button" to="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
