import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getBootcamps } from '../actions/bootcampAction';

const Filter = () => {
  const dispatch = useDispatch();
  const [ filterData, setFilterData ] = useState({
    careers: "",
    averageCost: "",
    averageRating: ""
  });

  const { careers, averageCost, averageRating } = filterData;

  const handleChange = (e) => {
		setFilterData({ ...filterData, [e.target.name] : e.target.value });
	}

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getBootcamps(`?careers[in]=${careers}&averageCost[lte]=${averageCost}&averageRating[gte]=${averageRating}`));
  }


  return (
    <>
      <form onSubmit={handleSubmit}> 
        <div className="form-group">
          <label> Career</label>
          <select name='careers' value={careers} onChange={handleChange} className="custom-select mb-2">
            <option defaultValue="Web Development">Web Development</option>
            <option value="Mobile Development">Mobile Development</option>
            <option value="UI/UX">UI/UX</option>
            <option value="Data Science">Data Science</option>
            <option value="Business">Business</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label> Rating</label>
          <select name='averageRating' value={averageRating} onChange={handleChange} className="custom-select mb-2">
            <option defaultValue="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
            <option value="6">6+</option>
            <option value="7">7+</option>
            <option value="8">8+</option>
            <option value="9">9+</option>
          </select>
        </div>

        <div className="form-group">
          <label> Budget</label>
          <select name='averageCost' value={averageCost} onChange={handleChange} className="custom-select mb-2">
            <option defaultValue="20000">$20,000</option>
            <option value="15000">$15,000</option>
            <option value="10000">$10,000</option>
            <option value="8000">$8,000</option>
            <option value="6000">$6,000</option>
            <option value="4000">$4,000</option>
            <option value="2000">$2,000</option>
          </select>
        </div>
        <input
          type="submit"
          value="Find Bootcamps"
          className="btn btn-primary btn-block"
        />
      </form>
    </>
  )
}

export default Filter;