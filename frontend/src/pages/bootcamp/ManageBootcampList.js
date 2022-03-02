import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBootcamps } from '../../actions/bootcampAction';
import BootcampBox from '../../components/BootcampBox';

const ManageBootcampList = () => {

  const { auth, bootcamp } = useSelector((state) => (state));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBootcamps(`?user=${auth?.user?._id}`));
    // eslint-disable-next-line
  }, [auth]);


  return (
    <section className="container mt-5">
			<div className="row">
				<div className="col-md-8 m-auto">
					<div className="card bg-white py-2 px-4">
						<div className="card-body">
							<h1 className="mb-2">Manage Bootcamp</h1>
              {/* <!-- Bootcamps --> */}
              { !bootcamp.loading && bootcamp.bootcamps?.map((bootcamp) => (
                <BootcampBox key={bootcamp._id} bootcamp={bootcamp} editBootcamp={true} />
              )) }
              { !bootcamp.loading ? (bootcamp.bootcamps.length === 0 &&
                <p className="lead text-center">
                  You have not yet added a bootcamp
                </p>)
                :
                <h2 className="text-muted text-center">
                  Loading...
                </h2>
              }
              { !bootcamp.loading && (bootcamp.bootcamps.length === 0 || auth?.user?.role === "admin") && 
							  (<Link to="/bootcamp/addbootcamp" className="btn btn-primary btn-block" >Add Bootcamp</Link>)
              }
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

export default ManageBootcampList