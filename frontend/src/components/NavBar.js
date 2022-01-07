import { NavLink } from "react-router-dom";

const NavBar = () => {
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
						<li className="nav-item">
							<NavLink className="nav-link" to="/login"
								><i className="fas fa-sign-in-alt"></i> Login</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/register"
								><i className="fas fa-user-plus"></i> Register</NavLink>
						</li>
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
