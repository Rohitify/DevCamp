import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { createReview, getReview, updateReview } from '../../actions/reviewAction';

const AddReview = ({ editReview = false }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { reviewId } = useParams();

	const { bootcamp, review } = useSelector((state) => state);
	const bootcampId = bootcamp.current?._id;
	const current = review.current;

	const [ reviewDetails, setReviewDetails ] = useState({
		title: "",
		text: "",
		rating: 8
	});
	const { title, text, rating } = reviewDetails;

	useEffect(() => {
		if(current) {
			const { title, text, rating } = current
			setReviewDetails({ title, text, rating });
		} else{
			reviewId && dispatch(getReview(reviewId));
		}
		// eslint-disable-next-line
	}, [current, reviewId]);
	
	const handleChange = (e) => {
		setReviewDetails({ ...reviewDetails, [e.target.name] : e.target.value });
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		if(editReview){
			await dispatch(updateReview(reviewId, reviewDetails));
			await navigate(-1, {replace: true});
		} else {
			await dispatch(createReview(bootcampId, reviewDetails));
			await navigate(`/bootcamp/${bootcampId}/reviews`, {replace: true});
		}
	}


  return (
    <div>
      <section className="container mt-5">
			<div className="row">
				<div className="col-md-8 m-auto">
					<div className="card bg-white py-2 px-4">
						<div className="card-body">
							<button className="btn btn-link text-secondary my-3" onClick={() => navigate(-1, {replace: true})}>
								<i className="fas fa-chevron-left"></i> Bootcamp Info
							</button>
							<h1 className="mb-2">DevWorks Bootcamp</h1>
							<h3 className="text-primary mb-4">{editReview ? "Update" : "Add"} a Review</h3>
							<p>
								You must have attended and graduated this bootcamp to review
							</p>
							{ review.loading ? <h1>Form loading...</h1> 
							: 
								<form onSubmit={handleSubmit}>
									<div className="form-group">
										<label htmlFor="rating" >Rating: <span className="text-primary">{rating}</span></label>
										<input
											type="range"
											className="custom-range"
											min="1"
											max="10"
											step="1"
											name="rating"
											value={rating}
											onChange={handleChange}
											id="rating"
											required
										/>
									</div>
									<div className="form-group">
										<input
											type="text"
											name="title"
											value={title}
											onChange={handleChange}
											className="form-control"
											placeholder="Review title"
											maxLength={100}
											required
										/>
									</div>
									<div className="form-group">
										<textarea
											name="text"
											rows="10"
											value={text}
											onChange={handleChange}
											className="form-control"
											placeholder="Your review"
											maxLength={1000}
											required
										></textarea>
									</div>
									<div className="form-group">
										<input
											type="submit"
											value={editReview ? "Update Review" : "Add Review"}
											className="btn btn-dark btn-block"
										/>
									</div>
								</form>
							}
						</div>
					</div>
				</div>
			</div>
		</section>
    </div>
  )
}

export default AddReview
