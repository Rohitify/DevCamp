import React from 'react'
import { useSelector } from 'react-redux'

const Alert = () => {
  const { alerts } = useSelector(state => state);
  return (
    alerts.length > 0 && alerts.map((alert) => (
        <div key={alert.id} className={`alert alert-${alert.type} sticky-top container mt-1`} role="alert">
          <i className='fas fa-info-circle'>{alert.msg}</i>
        </div>
    ))
  )
}

export default Alert;