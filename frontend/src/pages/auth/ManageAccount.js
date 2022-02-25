import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateDetails } from '../../actions/authAction';

const ManageAccount = () => {
	const { user } = useSelector((state) => state.auth);
	// const { name, email } = auth.user;
	const dispatch = useDispatch();

	const [ userDetails, setUserDetails ] = useState({
		name: user.name || "",
		email: user.email || ""
	});

	const { name, email } = userDetails;

	const handleChange = (e) => {
		setUserDetails({ ...userDetails, [e.target.name] : e.target.value });
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(userDetails);
		dispatch(updateDetails(userDetails));
	}

  return (
    <div>
      <section className="container mt-5">
			<div className="row">
				<div className="col-md-8 m-auto">
					<div className="card bg-white py-2 px-4">
						<div className="card-body">
							<h1 className="mb-2">Manage Account</h1>
							<form onSubmit={handleSubmit}>
								<div className="form-group">
									<label>Name</label>
									<input
										type="text"
										name="name"
										className="form-control"
										placeholder="Name"
										value={name}
										onChange={handleChange}
									/>
								</div>
								<div className="form-group">
									<label>Email</label>
									<input
										type="email"
										name="email"
										className="form-control"
										placeholder="Email"
										value={email}
										onChange={handleChange}
									/>
								</div>
								<div className="form-group">
									<div className="row">
										<div className="col-md-6">
											<input
												type="submit"
												value="Save"
												className="btn btn-success btn-block"
											/>
										</div>
										<div className="col-md-6">
											<Link
												to={`updatepassword`}
												className="btn btn-secondary btn-block">
													Update Password
											</Link>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
    </div>
  )
}

export default ManageAccount
