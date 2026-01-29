import React from 'react'

import './Nav.css'
import { useNavigate,useLocation } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
const Nav = () => {
  const navigate = useNavigate();
  const location=useLocation();

  const [btn ,setBtn]=useState("Create");
  useEffect(()=>{
    if(location.pathname==="/create"){
      setBtn("Upload")
    }else{
      setBtn("Create")
    }
  },)

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(false);
    useEffect(() => {
    const loggedIn = localStorage.getItem("iLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    const fetchuser=async()=>{
      try {
        const res=await axios.get('http://localhost:1000/api/auth/me',{withCredentials:true})
        setUser(res.data)

      } catch (error) {
        
      console.log(error)
      }
    }
     if (isLoggedIn) {
    fetchuser();
  }
  }, []);
  const handlelogout = async () => {
  try {
    await axios.post(
      "http://localhost:1000/api/auth/logout", 
      {}, // empty body
      { withCredentials: true } // options
    );
    setIsLoggedIn(false);           // frontend state
    localStorage.removeItem("iLoggedIn"); // frontend flag remove
    navigate("/login");             // redirect
  } catch (error) {
    alert("Logout not working");
    console.log(error);
  }
};
const handleclick=()=>{
  navigate('/create')
  setBtn('Upload')
}

  return (
    <div className='container'>
        <nav className='navbar'>
            <h1 onClick={()=>navigate('/')}>MY BLOG</h1>
            {isLoggedIn ? (<div className='nav-links'>
            <button onClick={handlelogout}>Logout<br/>{user?user.name[0]:''}</button>
            <button onClick={handleclick}>{btn}</button></div>) : (
              <div className='nav-links'>
            <button onClick={() => navigate("/login", {state:{mode:'login'}})}>Log-in</button>
            <button onClick={() => navigate("/login",{state:{mode:'signup'}})}>Signup</button>
            </div>
            )}
            
        </nav>
        <Outlet/>
    </div>
  )
}

export default Nav