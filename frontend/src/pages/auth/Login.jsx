import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <section className="form mt-5">
			<div className="container">
				<div className="row">
					<div className="col-md-6 m-auto">
						<div className="card bg-white p-4 mb-4">
							<div className="card-body">
								<h1><i className="fas fa-sign-in-alt"></i> Login</h1>
								<p> 
									Log in to list your bootcamp or rate, review and favorite
									bootcamps
								</p>
								<form>
									<div className="form-group">
										<label for="email">Email Address</label>
										<input
											type="email"
											name="email"
											className="form-control"
											placeholder="Enter email"
											required
										/>
									</div>
									<div className="form-group mb-4">
										<label for="password">Password</label>
										<input
											type="password"
											name="password"
											className="form-control"
											placeholder="Enter password"
											required
										/>
									</div>
									<div className="form-group">
										<input
											type="submit"
											value="Login"
											className="btn btn-primary btn-block"
										/>
									</div>
								</form>
								<p>	Forgot Password? <Link to="/resetpassword">Reset Password</Link></p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
  )
}

export default Login
