import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getBootcamp } from '../actions/bootcampAction';

const BootcampBox = ({ bootcamp }) => {

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(getBootcamp(bootcamp._id));
  }

  return (
    <div key={bootcamp._id} className="card mb-3">
      <div className="row no-gutters">
        <div className="col-md-4">
          <img src="" className="card-img" alt="..." />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">
              <NavLink to={`/bootcamp/${bootcamp._id}`} onClick={handleClick}>{bootcamp.name}
                <span className="float-right badge badge-success">
                  { bootcamp?.averageRating !== undefined ? bootcamp?.averageRating : 0 }
                </span>
              </NavLink>
            </h5>
            <span className="badge badge-dark mb-2">
              { bootcamp?.location?.city !== "" ?  <span>{bootcamp?.location?.city}, </span> : null }
              { bootcamp?.location?.state !== "" ?  <span>{bootcamp?.location?.state}, </span> : null }
              { bootcamp?.location?.country !== "" ?  bootcamp?.location?.country : null }
              {/* {bootcamp?.location?.city}, {bootcamp?.location?.state}, {bootcamp?.location?.country} */}
              </span>
            <p className="card-text">
              {bootcamp.careers.map((career, index) => {
                if(bootcamp.careers.length !== index+1){
                  return <span>{career}, </span>
                } else {
                  return <span>{career}</span>
                }
              })}
              {/* Web Development, UI/UX, Mobile Development */}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BootcampBox