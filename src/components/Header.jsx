import { signOut } from 'firebase/auth';
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';

const Header = () => {

  const navigate =useNavigate();

  const user = useSelector((store)=>store.user);

  const handleSignOut =()=>{
      signOut(auth).then(() => {
        // Sign-out successful.
        navigate('/login');
      }).catch((error) => {
        // An error happened.
      });
   
  }
  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-1 flex justify-between'>
        <img src='https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png' 
        alt='logo'
        className='w-44'/>
         {user &&  <div className='flex'>
        <img alt='user-icon' src='https://i.pinimg.com/474x/30/db/47/30db479e1558c3ed46b4ed23b3cd98ae.jpg' className='w-6 h-6 mt-6'/> 
    
        {/* <svg class="w-4 h-4 m-6  text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path fill-rule="evenodd" d="M18.425 10.271C19.499 8.967 18.57 7 16.88 7H7.12c-1.69 0-2.618 1.967-1.544 3.271l4.881 5.927a2 2 0 0 0 3.088 0l4.88-5.927Z" clip-rule="evenodd"/>
        </svg> */}
  
        <span className='mt-6'>{user?.displayName}</span>
        <button className='font-black cursor-pointer ml-4' onClick={handleSignOut}>
            Sign Out
          </button>
        
        
        </div>
        }
        <div>

        </div>
    </div>
  )
}

export default Header