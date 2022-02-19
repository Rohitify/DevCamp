import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Route } from 'react-router-dom';

const PrivateRoute = ({ element : Element, ...rest }) => {
  const { auth } = useSelector(({ auth }) => ({ auth }));
  const { isAuthenticated } = auth;
  return (
    <Route {...rest} render={ props => isAuthenticated ? (<Element {...props} />) : (
      <Navigate to={`/`} />
    ) } />
  )
}

export default PrivateRoute