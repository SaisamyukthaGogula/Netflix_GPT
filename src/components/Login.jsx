import React, { useState, useRef } from 'react'
import Header from './Header'
import ValidationCheck from '../utils/Validation';
import {createUserWithEmailAndPassword , signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
 
  const [isUser, setIsUser]=useState(true);
 
  const name = useRef(null);
  const email = useRef(null);
  const password =useRef(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch =useDispatch();

  const handleClick =()=>{
    setIsUser(!isUser);
    
  }
  const handleButtonClick =()=>{
    const res = ValidationCheck(email.current.value, password.current.value);
    setMessage(res);
    if(message) return;
        {!isUser ? 
        // SignUp logic
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value, photoURL: "https://example.com/jane-q-user/profile.jpg"
          }).then(() => {
            // Profile updated!
            const {uid : uid, email: email, displayName : displayName} = auth.currentUser;
            dispatch(addUser({uid : uid, email: email, displayName : displayName}))
            navigate("/browse");
          }).catch((error) => {
            // An error occurred
            setMessage(error)
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setMessage(errorCode+''+errorMessage)
        })
      : 
        // SignIn logic
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setMessage(errorCode+''+errorMessage);
        });
        }
  }



  return (
    <div>
      <Header />
        <div className='absolute'>
        <img src='https://assets.nflxext.com/ffe/siteui/vlv3/8200f588-2e93-4c95-8eab-ebba17821657/web/IN-en-20250616-TRIFECTA-perspective_9cbc87b2-d9bb-4fa8-9f8f-a4fe8fc72545_large.jpg'
        alt='bg-Img'
     
        />
        </div>
          <form onSubmit={(e)=>e.preventDefault() }className='w-3/12 absolute p-12  bg-black/75 my-46 mx-auto right-0 left-0 rounded-lg bg-opacity-80 text-white'>
            <h1 className='text-3xl font-bold text-white my-2'>{isUser ? "Sign In" : "Sign Up"}</h1>
            {!isUser && <input type='name' ref={name} placeholder='Full Name' className='p-2 my-3 w-full border-1 rounded-md' />}
            <input type='email' ref={email} placeholder='Email or Mobile Number' className='p-2 my-3 w-full border-1 rounded-md'/>
            <input type='password' ref={password} placeholder='Password' className='p-2 my-3  w-full border-1 rounded-md'/>
            
            {/* {message !== null && <p className='text-red-600 p-2 m-2 '>Please Enter Valid {message}</p>} */}
            <p className='text-red-500'>{message}</p>
            <button onClick={handleButtonClick} className='p-2 my-4  text-black bg-red-600 w-full cursor-pointer rounded-md'>
            {isUser ? "Sign In" : "Sign Up"}</button>

            

            {isUser ? <p className='text-white cursor-pointer' onClick={handleClick}> New to Netflix? <span className='font-bold'>Sign Up</span></p> 
            : <p className='text-white cursor-pointer' onClick={handleClick}> Already a User? <span className='font-bold'>Sign In</span></p>}
          </form>
    </div>
  )
}

export default Login