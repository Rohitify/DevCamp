import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updatePassword } from '../../actions/authAction';

const UpdatePassword = () => {
	const navigate = useNavigate();
	const { auth } = useSelector(state => state);

	const [passwordData, setPasswordData] = useState({
		currentPassword : "",
		newPassword : "",
		newPassword2 : ""
	});

	const { currentPassword, newPassword, newPassword2 } = passwordData;

	const dispatch = useDispatch();

	const handleChange = (e) => {
		setPasswordData({ ...passwordData, [e.target.name] : e.target.value });
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(updatePassword(passwordData));
		// res.then(() => navigate(-1, { replace: true })).catch((err) => console.error(err));
	}

  return (
    <section className="container mt-5">
			<div className="row">
				<div className="col-md-8 m-auto">
					<div className="card bg-white py-2 px-4">
						<div className="card-body">
							<h1 className="mb-2">Update Password</h1>
							{ auth.loading ? 
								<h2>Loading...</h2>
							:
								<form onSubmit={handleSubmit}>
									<div className="form-group">
										<label>Current Password</label>
										<input
											type="password"
											name="currentPassword"
											value={currentPassword}
											onChange={handleChange}
											className="form-control"
											placeholder="Current Password"
											minLength={6}
											required
										/>
									</div>
									<div className="form-group">
										<label>New Password</label>
										<input
											type="password"
											name="newPassword"
											value={newPassword}
											onChange={handleChange}
											className="form-control"
											placeholder="New Password"
											minLength={6}
											required
										/>
									</div>
									<div className="form-group">
										<label>Confirm New Password</label>
										<input
											type="password"
											name="newPassword2"
											value={newPassword2}
											onChange={handleChange}
											className="form-control"
											placeholder="Confirm New Password"
											minLength={6}
											required
										/>
									</div>
									<div className="form-group">
												<input
													type="submit"
													value="Update Password"
													className="btn btn-dark btn-block"
												/>
										</div>
								</form>
							}
						</div>
					</div>
				</div>
			</div>
		</section>
  )
}

export default UpdatePassword
