import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate} from 'react-router-dom'
import { createBootcamp, updateBootcamp } from '../../actions/bootcampAction';

const AddBootcamp = ({ editBootcamp = false }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { bootcamp } = useSelector(({bootcamp}) => ({bootcamp}))
	let currentBootcamp = bootcamp?.current;

	const [ bootcampData, setBootcampData ] = useState({
			name: currentBootcamp?.name || "",
			address: currentBootcamp?.address || "",
			description: currentBootcamp?.description || "",
			website: currentBootcamp?.website || "",
			phone: currentBootcamp?.phone || "",
			email: currentBootcamp?.email || "",
			housing: currentBootcamp?.housing || false,
			jobAssistance: currentBootcamp?.jobAssistance || false,
			jobGuarantee: currentBootcamp?.jobGuarantee || false,
			careers : currentBootcamp?.careers || []
	});

	const { name, address, description, website, phone, email, housing, jobAssistance, jobGuarantee, careers } = bootcampData;

	const handleChange = (e) => {
		const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
		setBootcampData({ ...bootcampData, [e.target.name] : value });
	}

	if(careers.includes('')){
		let careersData = careers.filter(career => career !== "");
		setBootcampData({ ...bootcampData, careers : careersData });
	}

	const handleSelect = (e) => {
		let careersValue;
		const isIncluded = careers.includes(e.target.value);
		if(isIncluded){
			careersValue = careers.filter(career => career !== e.target.value)
		}
		else{
			careersValue = [ ...careers, e.target.value];
		}
		setBootcampData({ ...bootcampData, [e.target.name] : careersValue });
	}
 
	const handleSubmit = async (e) => {
		e.preventDefault();
		if(editBootcamp === true){
			await dispatch(updateBootcamp(currentBootcamp._id, bootcampData));
			await navigate(`/bootcamp/${currentBootcamp?._id}/managebootcamp`, { replace : true });
		} else {
			await dispatch(createBootcamp(bootcampData));
			await navigate(`/bootcamp/${currentBootcamp?._id}/managebootcamp`, { replace : true });
		}
		// res.then((bootcampId) => navigate(`/bootcamp/${bootcampId}/managebootcamp`, { replace : true }));
		// await navigate(`/bootcamp/${currentBootcamp?._id}/managebootcamp`, { replace : true });
	}

	

  return (
    <section className="container mt-4">
			<h1 className="mb-2">{editBootcamp ? "Edit" : "Add"} Bootcamp</h1>
			<p>
				Important: You must be affiliated with a bootcamp to add to DevCamper
			</p>
			{ bootcamp.loading ? <h1>{editBootcamp ? "Updating" : "Creating"} Bootcamp...</h1> 
			:

			<form onSubmit={handleSubmit}>
				<div className="row">
					<div className="col-md-6">
						<div className="card bg-white py-2 px-4">
							<div className="card-body">
								<h3>Location & Contact</h3>
								<p className="text-muted">
									If multiple locations, use the main or largest
								</p>
								<div className="form-group">
									<label>Name</label>
									<input
										type="text"
										name="name"
										value={name}
										onChange={handleChange}
										className="form-control"
										placeholder="Bootcamp Name"
										required
									/>
								</div>
								<div className="form-group">
									<label>Address</label>
									<input
										type="text"
										name="address"
										value={address}
										onChange={handleChange}
										className="form-control"
										placeholder="Full Address"
										required
									/>
									<small className="form-text text-muted"
										>Street, city, state, etc</small
									>
								</div>
								<div className="form-group">
									<label>Phone Number</label>
									<input
										type="text"
										name="phone"
										value={phone}
										onChange={handleChange}
										className="form-control"
										placeholder="Phone"
									/>
								</div>
								<div className="form-group">
									<label>Email</label>
									<input
										type="text"
										name="email"
										value={email}
										onChange={handleChange}
										className="form-control"
										placeholder="Contact Email"
									/>
								</div>
								<div className="form-group">
									<label>Website</label>
									<input
										type="text"
										name="website"
										value={website}
										onChange={handleChange}
										className="form-control"
										placeholder="Website URL"
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-6">
						<div className="card bg-white py-2 px-4">
							<div className="card-body">
								<h3>Other Info</h3>
								<div className="form-group">
									<label>Description</label>
									<textarea
										name="description"
										rows="5"
										className="form-control"
										value={description}
										onChange={handleChange}
										placeholder="Description (What you offer, etc)"
										maxLength="500"
										required
									></textarea>
									<small className="form-text text-muted"
										>No more than 500 characters</small
									>
								</div>
								<div className="form-group">
									<label>Careers</label>
									<select name="careers" value={careers} onChange={handleSelect} className="custom-select" multiple required>
										{/* <option defaultChecked>Select all that apply</option> */}
										<option value="Web Development">Web Development</option>
										<option value="Mobile Development" 
											>Mobile Development</option
										>
										<option value="UI/UX">UI/UX</option>
										<option value="Data Science">Data Science</option>
										<option value="Business">Business</option>
										<option value="Other">Other</option>
									</select>
								</div>
								<div className="form-check">
									<input
										className="form-check-input"
										type="checkbox"
										name="housing"
										onChange={handleChange}
										checked={housing}
										id="housing"
									/>
									<label className="form-check-label" htmlFor="housing">
										Housing
									</label>
								</div>
								<div className="form-check">
									<input
										className="form-check-input"
										type="checkbox"
										name="jobAssistance"
										onChange={handleChange}
										checked={jobAssistance}
										id="jobAssistance"
									/>
									<label className="form-check-label" htmlFor="jobAssistance">
										Job Assistance
									</label>
								</div>
								<div className="form-check">
									<input
										className="form-check-input"
										type="checkbox"
										name="jobGuarantee"
										onChange={handleChange}
										checked={jobGuarantee}
										id="jobGuarantee"
									/>
									<label className="form-check-label" htmlFor="jobGuarantee">
										Job Guarantee
									</label>
								</div>
								{/* <div className="form-check">
									<input
										className="form-check-input"
										type="checkbox"
										name="acceptGi"
										value={acceptGi}
										onChange={handleChange}
										id="acceptGi"
									/>
									<label className="form-check-label" for="acceptGi">
										Accepts GI Bill
									</label>
								</div> */}
								<p className="text-muted my-4">
									*After you add the bootcamp, you can add the specific courses
									offered
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="form-group">
					<input
						type="submit"
						value={editBootcamp ? "Update Bootcamp" : "Create Bootcamp"}
						className="btn btn-success btn-block my-4"
					/>
				</div>
			</form>
			}
					<button className="btn btn-danger btn-block mb-4"
						onClick={() => navigate(-1, { replace: true })}
					>Go Back</button>
		</section>
  )
}

export default AddBootcamp
