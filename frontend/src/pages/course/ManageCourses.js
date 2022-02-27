import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { deleteCourse, getCourses } from '../../actions/courseAction';
import BootcampBox from '../../components/BootcampBox';
import ManageNoneCourses from './ManageNoneCourses';

const CourseRow = ({ course, handleDelete }) => {
	return(
		<tr>
			<td>{course.title}</td>
			<td>
				<Link to={`editcourse/${course._id}`} className="btn btn-secondary"> 
					<i className="fas fa-pencil-alt"></i>
				</Link>
				<button className="btn btn-danger" onClick={() => handleDelete(course._id)}>
					<i className="fas fa-times"></i>
				</button>
			</td>
		</tr>
	)
}

const NoCourses = ({ loading = false }) => {
	return(
		<tr>
			<td colSpan={2}>
				<div className="card-body">
					<p className="lead text-center">
						{ loading ? "Loading..." :
						"You have not yet added any courses"
						}
					</p>
				</div>
			</td>
		</tr>
	)
}

const ManageCourses = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { bootcamp, course } = useSelector((state) => (state));
	const { current } = bootcamp;
	const { courses } = course;

	useEffect(() => {
		dispatch(getCourses(current._id))
	}, [current]);

	const handleDelete = (courseId) => {
		dispatch(deleteCourse(current._id, courseId));
	}

  return (
    <div>
      <section className="container mt-5">
			<div className="row">
				<div className="col-md-8 m-auto">
					<div className="card bg-white py-2 px-4">
						<div className="card-body">
							<button
								className="btn btn-link text-secondary my-3"
								onClick={() => navigate(-1)}
							>
									<i className="fas fa-chevron-left"></i> Manage Bootcamp
							</button>
							<h1 className="mb-4">Manage Courses</h1>
							{ current && <BootcampBox bootcamp={current} /> }

							<Link to={`addcourse`} className="btn btn-primary btn-block mb-4">
								Add Bootcamp Course
							</Link>
							<table className="table table-striped">
								<thead>
									<tr>
										<th scope="col">Title</th>
										<th scope="col">Action</th>
									</tr>
								</thead>
								<tbody>
									{ !course.loading 
									? (courses.length ? 
											courses.map((course) => <CourseRow key={course._id} course={course} handleDelete={handleDelete} />)
										: <NoCourses />) 
									:
									<NoCourses loading={true} />
									}
									
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

export default ManageCourses
