import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { createCourse, getCourse, updateCourse } from '../../actions/courseAction';

const AddCourse = ({ editCourse = false }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { courseId } = useParams();

	const { bootcamp, course } = useSelector((state) => state);
	const bootcampName = bootcamp.current?.name;
	const bootcampId = bootcamp.current?._id;
	const current = course.current;

	const [ courseDetails, setCourseDetails ] = useState({
		title : "",
		weeks: "",
		tuition: "",
		minimumSkill: "beginner",
		description: "",
		scholarshipAvailable: false
	});

	const { title, weeks, tuition, minimumSkill, description, scholarshipAvailable } = courseDetails;

	useEffect(() => {
		if(current) {
			const { title, weeks, tuition, minimumSkill, description, scholarshipAvailable } = current;
			setCourseDetails({ title, weeks, tuition, minimumSkill, description, scholarshipAvailable })
		} else{
			courseId && dispatch(getCourse(bootcampId, courseId));
		}
		// eslint-disable-next-line
	}, [courseId, current]);

	const handleChange = (e) => {
		const valueData = e.target.type === "checkbox" ? e.target.checked : e.target.value
		setCourseDetails({ ...courseDetails, [e.target.name] : valueData });
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const res = editCourse ? dispatch(updateCourse(bootcampId, courseId, courseDetails)) : dispatch(createCourse(bootcampId, courseDetails));
		res.then((result) => navigate(-1, { replace: true }));
		// navigate(-1, { replace: true });
	}

  return (
    <section className="container mt-5">
			<div className="row">
				<div className="col-md-8 m-auto">
					<div className="card bg-white py-2 px-4">
						<div className="card-body">
							<button
								className="btn btn-link text-secondary my-3"
								onClick={() => navigate(-1, { replace: true })}
							>
									<i className="fas fa-chevron-left"></i> Manage Courses
							</button>
							<h1 className="mb-2">{bootcampName}</h1>
							<h3 className="text-primary mb-4">{ editCourse ? "Edit" : "Add" } Course</h3>
							{ course.loading ? <h1>Loading...</h1> 
								:
							<form onSubmit={handleSubmit}>
								<div className="form-group">
									<label>Course Title</label>
									<input
										type="text"
										name="title"
										value={title}
										onChange={handleChange}
										className="form-control"
										placeholder="Title"
										required
									/>
								</div>
								<div className="form-group">
									<label>Duration</label>
									<input
										type="number"
										name="weeks"
										value={weeks}
										onChange={handleChange}
										placeholder="Duration"
										className="form-control"
										required
									/>
									<small className="form-text text-muted"
										>Enter number of weeks course lasts</small
									>
								</div>
								<div className="form-group">
									<label>Course Tuition</label>
									<input
										type="number"
										name="tuition"
										value={tuition}
										onChange={handleChange}
										placeholder="Tuition"
										className="form-control"
										required
									/>
									<small className="form-text text-muted">USD Currency</small>
								</div>
								<div className="form-group">
									<label>Minimum Skill Required</label>
									<select name="minimumSkill" value={minimumSkill} onChange={handleChange} className="form-control" required>
										<option value="beginner">Beginner (Any)</option>
										<option value="intermediate">Intermediate</option>
										<option value="advanced">Advanced</option>
									</select>
								</div>
								<div className="form-group">
									<textarea
										name="description"
										value={description}
										onChange={handleChange}
										rows="5"
										className="form-control"
										placeholder="Course description summary"
										maxLength="500"
										required
									></textarea>
									<small className="form-text text-muted"
										>No more than 500 characters</small
									>
								</div>
								<div className="form-check">
									<input
										className="form-check-input"
										type="checkbox"
										name="scholarshipAvailable"
										id="scholarshipAvailable"
										checked={scholarshipAvailable}
										onChange={handleChange}
									/>
									<label className="form-check-label" htmlFor="scholarshipAvailable">
										Scholarship Available
									</label>
								</div>
								<div className="form-group mt-4">
									<input
										type="submit"
										value={ editCourse ? "Update Course" : "Create Course" }
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
  )
}

export default AddCourse
