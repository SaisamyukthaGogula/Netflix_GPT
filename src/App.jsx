import { useEffect } from "react"
import Body from "./components/Body"
import Login from "./components/Login"
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Browse from "./components/Browse"
import { auth} from './utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from './utils/userSlice';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
const dispatch =useDispatch();
  useEffect(()=>{
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const {uid, email, displayName} = user;
          dispatch(addUser({uid:uid, email: email, displayName: displayName}));
        } else {
          // User is signed out
          dispatch(removeUser());
        }
      })
},[]);


const appRouter = createBrowserRouter([
  {path:"/",
  element:<Body/>
  },
  {
    path:"/login",
    element:<Login />
  },
  {
    path:"/browse",
    element: <Browse /> 
  }

])
  return (<RouterProvider router={appRouter}/>)
}

export default App
