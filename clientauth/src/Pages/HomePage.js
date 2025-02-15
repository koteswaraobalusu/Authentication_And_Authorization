import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../Context/AuthContext'

const HomePage = () => {
  let [notes,setNotes]=useState([]);
  let {authTokens,logoutUser}=useContext(AuthContext);

  
  let getData= async ()=>{

    let response=await fetch('http://127.0.0.1:8000/api/notes/',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer '+String(authTokens.access)
      }
    })

    if(response.status===200){

      let data=await response.json()
      setNotes(data)
    }
    else if(response.statusText==='Unauthorized'){
      logoutUser()
      
    }

  }

  useEffect(
    ()=>{
      getData()
    },[]
  )

  


  
  return (
    <div>
        <h2>This is Home Page</h2>
       
        <ul>
          {
            notes.map((note)=><li key={note.id}>{note.body}</li>)
          }
        </ul>
       
      
    </div>
  )
}

export default HomePage
