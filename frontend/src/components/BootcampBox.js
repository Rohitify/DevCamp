import React from 'react';
import { Link} from 'react-router-dom';

const BootcampBox = ({ bootcamp, editBootcamp=false }) => {

  return (
    <div key={bootcamp._id} className="card mb-3">
      <div className="row no-gutters">
        <div className="col-md-4 my-auto">
          <img src={`http://localhost:5000/uploads/${bootcamp?.photo}`} className="card-img" alt="..." />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">
              <Link to={`/bootcamp/${bootcamp._id}`} >{bootcamp.name}
              </Link>
                { editBootcamp ? 
                  <Link to={`/bootcamp/${bootcamp._id}/managebootcamp`} className="float-right btn btn-secondary"><i className="fas fa-pencil-alt" aria-hidden="true"></i></Link>
                  :
                  <span className="float-right badge badge-success">
                    { bootcamp?.averageRating !== undefined ? bootcamp?.averageRating : 0 }
                  </span>
                }
              
            </h5>
            <span className="badge badge-dark mb-2">
              { bootcamp?.location?.city !== "" ?  <span>{bootcamp?.location?.city}, </span> : null }
              { bootcamp?.location?.state !== "" ?  <span>{bootcamp?.location?.state}, </span> : null }
              { bootcamp?.location?.country !== "" ?  bootcamp?.location?.country : null }
              {/* {bootcamp?.location?.city}, {bootcamp?.location?.state}, {bootcamp?.location?.country} */}
              </span>
            <p className="card-text">
              {bootcamp?.careers?.map((career, index) => {
                if(bootcamp.careers.length !== index+1){
                  return <span key={index}>{career}, </span>
                } else {
                  return <span key={index}>{career}</span>
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