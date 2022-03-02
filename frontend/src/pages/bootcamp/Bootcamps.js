import React, { useEffect, useState } from 'react';
import Filter from '../../components/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { getBootcamps, getBootcampsInRadius } from '../../actions/bootcampAction';
import BootcampBox from '../../components/BootcampBox';

const Bootcamps = ({ allBootcamps = false }) => {

	const bootcampParam = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [searchParams, setSearchParams] = useState({
		"miles": bootcampParam?.miles || "",
		"pincode": bootcampParam?.pincode || ""
	});

	const { miles, pincode } = searchParams;

	const { bootcamp } = useSelector((state) => (state));
	const {bootcamps} = bootcamp;

 
	useEffect(() => {
		if(!allBootcamps){
			dispatch(getBootcampsInRadius(pincode, miles));
		} else {
			setSearchParams({ miles: "", pincode: "" });
			dispatch(getBootcamps());
		}
		// eslint-disable-next-line
	}, [allBootcamps]);


	const handleChange = (e) => {
		setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(getBootcampsInRadius(pincode, miles));
		navigate(`/bootcamps/${pincode}/${miles}`);
	}

  return (
    <section className="browse my-5">
			<div className="container">
				<div className="row mt-5">
					{/* <!-- Sidebar --> */}
					<div className="col-md-4">
						<div className="card card-body mb-4">
							<h4 className="mb-3">By Location</h4>
							<form onSubmit={handleSubmit}> 
								<div className="row">
									<div className="col-md-6">
										<div className="form-group">
											<input type="text" className="form-control" name="miles" value={miles}
												onChange={handleChange} placeholder="Miles From" required />
										</div>
									</div>
									<div className="col-md-6">
										<div className="form-group">
											<input type="text" className="form-control" name="pincode"
												value={pincode} onChange={handleChange} placeholder="Enter Zipcode" required />
										</div>
									</div>
								</div>
								<input type="submit" value="Find Bootcamps"
									className="btn btn-primary btn-block" />
							</form>
						</div>

						<h4>Filter</h4>
						<Filter />
					</div>
					{/* <!-- Main col --> */}
					<div className="col-md-8">
						{/* <!-- Bootcamps --> */}
						{!bootcamp.loading ? (bootcamps.length === 0 && 
							<div className="card mb-3"><h5 className="card-header bg-danger text-white">No Bootcamps Availiable</h5></div> )
							:
							<h2>Loading...</h2>
						}
						{!bootcamp.loading && bootcamps?.map((bootcamp) => (
							<BootcampBox key={bootcamp._id} bootcamp={bootcamp} />
						))
							// :
							// <h2>Loading...</h2>
					 	}


						{/* <!-- Pagination --> */}
						<nav aria-label="Page navigation example">
							<ul className="pagination">
								<li className="page-item">
									<NavLink className="page-link" to="#">Previous</NavLink>
								</li>
								<li className="page-item"><NavLink className="page-link" to="#">1</NavLink></li>
								<li className="page-item"><NavLink className="page-link" to="#">2</NavLink></li>
								<li className="page-item"><NavLink className="page-link" to="#">3</NavLink></li>
								<li className="page-item">
									<NavLink className="page-link" to="#">Next</NavLink>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</div>
		</section>
  )
}

export default Bootcamps
