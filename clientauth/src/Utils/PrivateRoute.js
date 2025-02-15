import React,{useContext} from 'react'
import { Navigate,Route,Routes } from 'react-router-dom'
import AuthContext from '../Context/AuthContext'


const PrivateRoute = ({ children }) => {
  let {user}=useContext(AuthContext)
  return (
    <>
      {user? children:<Navigate to='/login'/>}
    </>
  )

}

export default PrivateRoute
