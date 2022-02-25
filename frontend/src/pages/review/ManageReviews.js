import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getReviews, setLoading } from '../../actions/reviewAction'

const ReviewRow = ({ review }) => {
	return(
		<tr>
			<td>{review?.title}</td>
			<td>{review.rating}</td>
			<td>
				<Link to={`editreview/${review?._id}`} className="btn btn-secondary">
						<i className="fas fa-pencil-alt"></i>
				</Link>
				<button className="btn btn-danger">
					<i className="fas fa-times"></i>
				</button>
			</td>
		</tr>
	)
}

const ManageReviews = () => {

	const dispatch = useDispatch();
	const {auth, review} = useSelector((state) => (state));
	const userId = auth.user?._id;
	const reviews = review.reviews;
	useEffect(() => {
		// dispatch(setLoading());
		dispatch(getReviews(null, userId));
	}, [userId]);

	// if(reviews.length === 0 && review.loading === false) {
	// 	return(
	// 		<div>
  //     	<section className="container mt-5">
	// 				No Reviews available
	// 			</section>
	// 		</div>
	// 	)
	// }

  return (
    <div>
      <section className="container mt-5">
			<div className="row">
				<div className="col-md-8 m-auto">
					<div className="card bg-white py-2 px-4">
						<div className="card-body">
							<h1 className="mb-4">Manage Reviews</h1>
							<table className="table table-striped">
								<thead>
									<tr>
										<th scope="col">Bootcamp</th>
										<th scope="col">Rating</th>
										<th scope="col"></th>
									</tr>
								</thead>
								<tbody>
									{ reviews.length === 0 && (!review.loading ? <tr><td className='text-center' colSpan={3}>No Reviews available</td></tr> : <tr><td>Loading...</td></tr> ) }
									{ reviews.map((review) => (<ReviewRow key={review._id} review={review} />)) }
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</section>
    </div>
  )
}

export default ManageReviews
