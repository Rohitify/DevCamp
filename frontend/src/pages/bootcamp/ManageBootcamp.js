import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getBootcamp } from '../../actions/bootcampAction'
import BootcampBox from '../../components/BootcampBox'

const ManageBootcamp = () => {

	const dispatch = useDispatch();
	const { bootcampId } = useParams();
	
	useEffect(() => {
		dispatch(getBootcamp(bootcampId));
		// dispatch(getCourses(bootcampId));
	}, [bootcampId]);

	const { bootcamp } = useSelector(({ bootcamp }) => ({ bootcamp }));
	const { current } = bootcamp;

  return (
    <section className="container mt-5">
			<div className="row">
				<div className="col-md-8 m-auto">
					<div className="card bg-white py-2 px-4">
						<div className="card-body">
							<h1 className="mb-4">Manage Bootcamp</h1>
							{ current && <BootcampBox bootcamp={current} /> }
							
							<form className="mb-4">
								<div className="form-group">
									<div className="custom-file">
										<input type="file" name="photo" className="custom-file-input" id="photo" />
										<label className="custom-file-label" htmlFor="photo" >Add Bootcamp Image 
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
							<Link to="#" className="btn btn-danger btn-block">Remove Bootcamp</Link>
							<p className="text-muted mt-5">
								* You can only add one bootcamp per account.
							</p>
							<p className="text-muted">
								* You must be affiliated with the bootcamp in some way in order
								to add it to DevCamper.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
  )
}

export default ManageBootcamp
