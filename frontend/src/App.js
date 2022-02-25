import { Navigate, Route, Routes} from "react-router-dom";

import "./css/bootstrap.css";
import "./css/style.css";

import NavBar from "./components/NavBar";
import Showcase from "./components/Showcase";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ResetPassword from "./pages/auth/ResetPassword";
import Bootcamps from "./pages/bootcamp/Bootcamps";
import Bootcamp from "./pages/bootcamp/Bootcamp";
import Reviews from "./pages/review/Reviews";
// import './App.css';

import { Provider } from 'react-redux';
import store from './store';
import ManageBootcampList from "./pages/bootcamp/ManageBootcampList";
import ManageBootcamp from "./pages/bootcamp/ManageBootcamp";
import AddBootcamp from "./pages/bootcamp/AddBootcamp";
import ManageCourses from "./pages/course/ManageCourses";
import AddCourse from "./pages/course/AddCourse";
import ManageReviews from "./pages/review/ManageReviews";
import AddReview from "./pages/review/AddReview";
import ManageAccount from "./pages/auth/ManageAccount";
import UpdatePassword from "./pages/auth/UpdatePassword";
import RequireAuth from "./components/RequireAuth";

function App() {
  const allUser = ["admin", "publisher", "user"]
  return (
    <Provider store={store}>
          <NavBar />
        <Routes>
          <Route path="/" element={<Showcase />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/manageaccount" element={<RequireAuth roles={allUser}><ManageAccount /></RequireAuth>} />
          <Route path="/manageaccount/updatepassword" element={<RequireAuth roles={allUser}><UpdatePassword /></RequireAuth>} />
          <Route path="/bootcamps" element={<Bootcamps />} />
          <Route path="/bootcamp/:bootcampId" element={<Bootcamp />} />
          <Route path="/bootcamp/:bootcampId/reviews" element={<Reviews />} />
          <Route path="/bootcamps/managebootcamplist" element={<RequireAuth><ManageBootcampList /></RequireAuth>} />
          <Route path="/bootcamp/:bootcampId/managebootcamp" element={<RequireAuth><ManageBootcamp /></RequireAuth>} />
          <Route path="/bootcamp/:bootcampId/managebootcamp/managecourses" element={<RequireAuth><ManageCourses /></RequireAuth>} />
          <Route path="/bootcamp/:bootcampId/managebootcamp/managecourses/editcourse/:courseId" element={<RequireAuth><AddCourse editCourse={true} /></RequireAuth>} />
          <Route path="/bootcamp/:bootcampId/managebootcamp/managecourses/addcourse" element={<RequireAuth><AddCourse /></RequireAuth>} />
          <Route path="/bootcamp/addbootcamp" element={<RequireAuth><AddBootcamp /></RequireAuth>} />
          <Route path="/bootcamp/:bootcampId/managebootcamp/editbootcamp" element={<RequireAuth><AddBootcamp editBootcamp={true} /></RequireAuth>} />
          <Route path="/managereviews" element={<RequireAuth roles={allUser}><ManageReviews /></RequireAuth>} />
          <Route path="/bootcamp/:bootcampId/addreview" element={<RequireAuth roles={allUser}><AddReview /></RequireAuth>} />
          <Route path="/managereviews/editreview/:reviewId" element={<RequireAuth roles={allUser}><AddReview editReview={true} /></RequireAuth>} />
        </Routes>
    </Provider>
  );
}

export default App;
