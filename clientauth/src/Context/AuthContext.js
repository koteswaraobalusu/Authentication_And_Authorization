import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';

const AuthContext=createContext();

export default AuthContext;

export const AuthProvider=({children})=>{

    let [user,setUser]=useState(()=>localStorage.getItem('authtokens')? jwtDecode(localStorage.getItem('authtokens')):null);
    let [authTokens,setauthTokens]=useState(()=>localStorage.getItem('authtokens')? JSON.parse(localStorage.getItem('authtokens')):null);
    let [loading,setLoading]=useState(false)
    let navigate=useNavigate()

    let signupUser=async (e)=>{
        e.preventDefault()

        let response=await fetch('http://127.0.0.1:8000/api/create/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value,'password':e.target.password.value})
        })

        if(response.status===201){
            

            let response=await fetch('http://127.0.0.1:8000/api/token/',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({'username':e.target.username.value,'password':e.target.password.value})
            })
            if(response.status===200){
                let data=await response.json()
                setauthTokens(data)
                setUser(jwtDecode(data.access))
                localStorage.setItem('authtokens',JSON.stringify(data))
                navigate('/')
    
            }
            else{
                alert('Something went wrong')
            }


        }



    }

























    let loginUser=async (e)=>{
        e.preventDefault()
        

        let response=await fetch('http://127.0.0.1:8000/api/token/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value,'password':e.target.password.value})
        })
        if(response.status===200){
            let data=await response.json()
            setauthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authtokens',JSON.stringify(data))
            navigate('/')

        }
        else{
            alert('Something went wrong')
        }
        
    }

    let logoutUser=()=>{

        setUser(null)
        setauthTokens(null)
        localStorage.removeItem('authtokens')
        navigate('/login')
    }


    let updateToken=async ()=>{
        console.log('Token updated')
        

        let response=await fetch('http://127.0.0.1:8000/api/token/refresh/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authTokens.refresh})
        })

        if(response.status===200){

            let data=await response.json()
            setauthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authtokens',JSON.stringify(data))
        }
        else{
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }

    }


    useEffect(
        ()=>{

            if(loading){
                updateToken()
            }
    
            let fourmins=1000*60*4

            let interval=setInterval(
                ()=>{
                    if(authTokens){
                        updateToken()
                    }
                },fourmins
            )
            return ()=>clearInterval(interval)

        },[authTokens,loading]
    )

    let contextData={
        authTokens:authTokens,
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser,
        signupUser:signupUser

    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
    
}