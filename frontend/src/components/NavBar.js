import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../actions/authAction";

const NavBar = () => {
	const dispatch = useDispatch()
	const handleLogout = () => {
		dispatch(logout());
	}

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary fixed-top">
			<div className="container">
				<NavLink className="navbar-brand" to="/"
					><i className="fas fa-laptop-code"></i> DevCamper</NavLink
				> 
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav ml-auto">
						{/* Auth Links */}
						<li className="nav-item">
							<NavLink className="nav-link" to="/login"
								><i className="fas fa-sign-in-alt"></i> Login</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/register"
								><i className="fas fa-user-plus"></i> Register</NavLink>
						</li>
						<li className="nav-item" onClick={handleLogout}>
							<NavLink className="nav-link" to="/login"
								><i className="fas fa-sign-out-alt"></i> Logout</NavLink>
						</li>
						{/* Account link  */}
						<li className="nav-item dropdown">
							<NavLink
								className="nav-link dropdown-toggle"
								to="#"
								id="navbarDropdown"
								role="button"
								data-toggle="dropdown"
							>
								<i className="fas fa-user"></i> Account
							</NavLink>
							<div className="dropdown-menu" role="menu">
								<NavLink className="dropdown-item" to="manage-bootcamp.html"
									>Manage Bootcamp</NavLink>
								<NavLink className="dropdown-item" to="manage-reviews.html"
									>Manage Reviews</NavLink>
								<NavLink className="dropdown-item" to="manage-account.html"
									>Manage Account</NavLink>
								<div className="dropdown-divider"></div>
								<NavLink className="dropdown-item" to="login.html"
									><i className="fas fa-sign-out-alt"></i> Logout</NavLink>
							</div>
						</li>
						{/* General link  */}
						<li className="nav-item d-none d-sm-block">
							<NavLink className="nav-link" to="#">|</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/bootcamps">Browse Bootcamps</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
  )
}

export default NavBar;
