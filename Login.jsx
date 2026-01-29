import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useNavigate,useLocation} from 'react-router-dom'
 import { toast } from 'react-toastify';
const Login = () => {
    const navigate = useNavigate();
    const location=useLocation();
    
    const [active ,setActive] = useState('login')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
     useEffect(() => {
        if (location.state?.mode) {
            setActive(location.state.mode)
        }
    }, [location])
    const handlesubmit=async(e)=>{
        e.preventDefault();
        try {
            if(active==='signup'){
                const res=await axios.post('http://localhost:1000/api/auth/signup',{name,email,password},{withCredentials:true})
            if(res.data.success){
                toast("signup successfull please login")
                setActive('login')
                setEmail('')
                setPassword('')
            }else{
                toast(res.data.message)
            }
            }
            if(active === 'login'){
            const res = await axios.post(
             'http://localhost:1000/api/auth/login',
             { email, password },
            { withCredentials: true }
          );
            if (res.data.success) {
            localStorage.setItem("iLoggedIn", "true");
            console.log("FULL RESPONSE:", res.data)
            navigate('/')   // force navigation
            toast("login success")
            }

               
            else{
                toast("invalid  credentials")
            }}
        } catch (error) {
            toast("something went wrong")
        }
            }
            
    
  return (
    <div>
        <form onSubmit={handlesubmit}>
        {active === 'login' ? <h2>Log-in</h2> : <h2>Sign-up</h2>}
        {active ==='signup' &&  <input type='text' placeholder='enter the name' onChange={e=>setName(e.target.value)} value={name}/>}
        <input type='email' placeholder='enter the email' onChange={e=>setEmail(e.target.value)} value={email}/>
        <input type='password' placeholder='enter the password'  onChange={e=>setPassword(e.target.value)} value={password}/>
        {active ==='login'? <button type='submit'>Log-in</button> : <button  type='submit'>Sign-up</button>}
        {active==='login'? <p>dont register please <span onClick={()=>setActive('signup')} style={{cursor:'pointer', color:'blue'}}>signup</span></p>: <p>already registered please <span style={{cursor:'pointer', color:'blue'}} onClick={()=>setActive('login')}>login</span></p>}
        </form>
    </div>
  )
}

export default Login