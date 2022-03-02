import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { addBootcampPhoto, deleteBootcamp, getBootcamp } from '../../actions/bootcampAction'
import BootcampBox from '../../components/BootcampBox'

const ManageBootcamp = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { bootcampId } = useParams();

	const [ bootcampImg, setBootcampImg ] = useState();
	// const [ imageURL, setImageURL ] = useState();
	
	useEffect(() => {
		dispatch(getBootcamp(bootcampId));
		// eslint-disable-next-line
	}, [bootcampId]);

	// useEffect(() => {
	// 	if(bootcampImg){
	// 		const newImageURL = URL.createObjectURL(bootcampImg);
	// 		setImageURL(newImageURL)
	// 	}
	// }, [bootcampImg]);

	const { bootcamp } = useSelector(({ bootcamp }) => ({ bootcamp }));
	const { current } = bootcamp;
	

	const handleChange = (e) => {
		setBootcampImg( e.target.files[0] )
	}

	const handleDelete = () => {
		const res = dispatch(deleteBootcamp(bootcampId));
		// navigate(-1, { replace: true });
		res.then((result) => {
			result && navigate(-1, { replace: true });
		});
	}

	const handleUploadImg = (e) => {
		e.preventDefault();
		dispatch(addBootcampPhoto(bootcampId, bootcampImg));
		setBootcampImg();
	}


  return (
    <section className="container mt-5">
			<div className="row">
				<div className="col-md-8 m-auto">
					<div className="card bg-white py-2 px-4">
						<div className="card-body">
							<h1 className="mb-4">Manage Bootcamp</h1>
							{ bootcamp.loading ? <h1>Loading...</h1> 
							:
								<>
								{ current && <BootcampBox bootcamp={current} /> }
								{/*
										<div className="col-md-4">
											<img src={imageURL} className="card-img" alt="..." />
										</div>
								*/}
								<form className="mb-4" onSubmit={handleUploadImg}>
									<div className="form-group">
										<div className="custom-file">
											<input type="file" name="photo" className="custom-file-input" id="photo"
												accept='image/*' onChange={handleChange} required
											/>
											<label className="custom-file-label" htmlFor="photo" > 
												{bootcampImg?.name || "Add Bootcamp Image"}
											</label>
										</div>
									</div>
									<input type="submit" 
										className="btn btn-light btn-block" value="Upload Image" />
								</form>
								<Link to={`editbootcamp`} className="btn btn-primary btn-block">Edit Bootcamp Details</Link>
								<Link to={`managecourses`} className="btn btn-secondary btn-block" >
									Manage Courses
								</Link>
								<button onClick={handleDelete} className="btn btn-danger btn-block">Remove Bootcamp</button>
								<p className="text-muted mt-5">
									* You can only add one bootcamp per account.
								</p>
								<p className="text-muted">
									* You must be affiliated with the bootcamp in some way in order
									to add it to DevCamper.
								</p>
								</>
							}
						</div>
					</div>
				</div>
			</div>
		</section>
  )
}

export default ManageBootcamp
