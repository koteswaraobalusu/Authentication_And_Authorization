import React, { useContext } from 'react'
import AuthContext from '../Context/AuthContext'


const SignupPage = () => {

  let {signupUser}=useContext(AuthContext)


  return (
    <div>
        <h1>Signup Page</h1>
      <form onSubmit={signupUser}>
            <input type='text' name='username' placeholder='Enter Username'/>
            <input type='password' name='password' placeholder='Enter Password'/>
            <input type='submit'/>
        </form>
    </div>
  )
}

export default SignupPage
