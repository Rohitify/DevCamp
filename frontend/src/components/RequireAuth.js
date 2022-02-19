import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children, roles=["admin", "publisher"] }) => {
  const { auth } = useSelector(({ auth }) => ({ auth }));
  const { isAuthenticated, user } = auth;
  console.log(roles)
  const isRole = roles.includes(user?.role);
  console.log(isRole);

  if(isAuthenticated && isRole) {
    return children
  }

  return <Navigate to={`/`} replace />
}

export default RequireAuth