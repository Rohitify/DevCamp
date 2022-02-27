import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Showcase = () => {
	const [searchParams, setSearchParams] = useState({
		"miles": "",
		"pincode": ""
	});

	const { miles, pincode } = searchParams;

	const navigate = useNavigate();

	const handleChange = (e) => {
		setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		navigate(`/bootcamps/${pincode}/${miles}`);
	}

  return (
    <section className="showcase">
			<div className="dark-overlay">
				<div className="showcase-inner container">
					<h1 className="display-4">Find a Code Bootcamp</h1>
					<p className="lead">
						Find, rate and read reviews on coding bootcamps
					</p>
					<form onSubmit={handleSubmit}>
						<div className="row">
							<div className="col-md-6">
								<div className="form-group">
									<input
										type="text"
										className="form-control"
										name="miles"
										value={miles}
										onChange={handleChange}
										placeholder="Miles From"
										required
									/>
								</div>
							</div>
							<div className="col-md-6">
								<div className="form-group">
									<input
										type="text"
										className="form-control"
										name="pincode"
										value={pincode}
										onChange={handleChange}
										placeholder="Enter Pincode"
										required
									/>
								</div>
							</div>
						</div>
						<input
							type="submit"
							value="Find Bootcamps"
							className="btn btn-primary btn-block"
						/>
					</form>
				</div>
			</div>
		</section>
  )
}

export default Showcase
