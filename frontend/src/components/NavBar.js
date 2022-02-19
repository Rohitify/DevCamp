import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../actions/authAction";

const NavBar = () => {
	const [showMenu, setShowMenu] = useState(false);
	const [showSubMenu, setShowSubMenu] = useState(false);
	const dispatch = useDispatch()

	const navigate = useNavigate();
  useEffect(() => {
    dispatch(logout());
    navigate("/");
  }, [])

	const handleLogout = () => {
		dispatch(logout());
	}

	const { auth } = useSelector(({ auth }) => ({ auth }));

	const authNav = () => {
		return (<>
			<li className="nav-item">
				<NavLink className="nav-link" to="/login"
					><i className="fas fa-sign-in-alt"></i> Login</NavLink>
			</li>
			<li className="nav-item">
				<NavLink className="nav-link" to="/register"
					><i className="fas fa-user-plus"></i> Register</NavLink>
			</li>
			</>)
	}
	
	const accountNav = () => {
		return(<>
			<li className={ showSubMenu ? "nav-item dropdown show" : "nav-item dropdown" }>
				<NavLink
					className="nav-link dropdown-toggle"
					to="#"
					id="navbarDropdown"
					role="button"
					data-toggle="dropdown"
					onClick={() => setShowSubMenu(!showSubMenu)}
				>
					<i className="fas fa-user"></i> Account
				</NavLink>
				<div className={ showSubMenu ? "dropdown-menu show" : "dropdown-menu" } role="menu" onClick={() => setShowSubMenu(!showSubMenu)} >
					{ (auth?.user?.role === "admin" || auth?.user?.role === "publisher") && 
					(<NavLink className="dropdown-item" to="/bootcamps/managebootcamplist">Manage Bootcamp</NavLink>)
					}
					<NavLink className="dropdown-item" to="/managereviews">Manage Reviews</NavLink>
					<NavLink className="dropdown-item" to="/manageaccount">Manage Account</NavLink>
					<div className="dropdown-divider"></div>
					<a className="dropdown-item" href="/" onClick={handleLogout}>
						<i className="fas fa-sign-out-alt"></i> Logout</a>
				</div>
			</li>
			</>)
	}

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary fixed-top">
			<div className="container">
				<NavLink className="navbar-brand" to="/"
					><i className="fas fa-laptop-code"></i> DevCamper</NavLink
				> 
				<button
					className={ showMenu ? "navbar-toggler collapsed" : "navbar-toggler" }
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					onClick={() => setShowMenu(!showMenu)}
				> {/* navbar-toggler collapsed  */}
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className={ showMenu ? "collapse navbar-collapse show" : "collapse navbar-collapse" } id="navbarSupportedContent">{/* collapse navbar-collapse show  */} 
					<ul className="navbar-nav ml-auto">
						{/* Auth Links */}
						{ auth?.isAuthenticated ? accountNav() : authNav()  }
						{/* General link  */}
						<li className="nav-item d-none d-md-block">
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
