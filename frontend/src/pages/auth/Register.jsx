import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../actions/authAction';

const Register = () => {

	const [ user, setUser ] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
		role: "user"
	});

	const { name, email, password, password2, role } = user;

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const storedData = useSelector( ({ auth }) => ({ auth }) );
	const auth = storedData.auth;

	useEffect(() => {
		if(auth?.isAuthenticated){
			navigate("/", { replace : true });
		}
		// eslint-disable-next-line
	}, [auth]);

	const handleChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });

	}

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(register(user));
	}

  return (
    <section className="form mt-5">
			<div className="container">
				<div className="row">
					<div className="col-md-6 m-auto">
						<div className="card bg-white p-4 mb-4">
							<div className="card-body">
								<h1><i className="fas fa-user-plus"></i> Register</h1>
								<p>
									Register to list your bootcamp or rate, review and favorite
									bootcamps
								</p>
								<form onSubmit={handleSubmit}> 
									<div className="form-group">
										<label htmlFor="name">Name</label>
										<input
											type="text"
											name="name"
											value={name}
											onChange={handleChange}
											className="form-control"
											placeholder="Enter full name"
											required
										/>
									</div>
									<div className="form-group">
										<label htmlFor="email">Email Address</label>
										<input
											type="email"
											name="email"
											value={email}
											onChange={handleChange}
											className="form-control"
											placeholder="Enter email"
											required
										/>
									</div>
									<div className="form-group">
										<label htmlFor="password">Password</label>
										<input
											type="password"
											name="password"
											value={password}
											onChange={handleChange}
											className="form-control"
											placeholder="Enter password"
											minLength={6}
											required
										/>
									</div>
									<div className="form-group mb-4">
										<label htmlFor="password2">Confirm Password</label>
										<input
											type="password"
											name="password2"
											value={password2}
											onChange={handleChange}
											className="form-control"
											placeholder="Confirm password"
											minLength={6}
											required
										/>
									</div>

									<div className="card card-body mb-3">
										<h5>User Role</h5>
										<div className="form-check">
											<input
												className="form-check-input"
												type="radio"
												name="role"
												value="user"
												onChange={handleChange}
												checked
											/>
											<label className="form-check-label">
												Regular User (Browse, Write reviews, etc)
											</label>
										</div>
										<div className="form-check">
											<input
												className="form-check-input"
												type="radio"
												name="role"
												value="publisher"
												onChange={handleChange}
											/>
											<label className="form-check-label">
												Bootcamp Publisher
											</label>
										</div>
									</div>
									<p className="text-danger">
										* You must be affiliated with the bootcamp in some way in
										order to add it to DevCamper.
									</p>
									<div className="form-group">
										<input
											type="submit"
											value="Register"
											className="btn btn-primary btn-block"
										/>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
  )
}

export default Register
