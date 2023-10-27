import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {userProfile} from '../../../reducers/todoProfile'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYoutube, faFacebook } from "@fortawesome/free-brands-svg-icons"
import moment from 'moment'

function Userprofile() {
    const dispatch = useDispatch()
    const state = useSelector((state)=>state)
    useEffect(() => {
      // fetchProfile()
      dispatch(userProfile())
      const intervalId = setInterval(() => {
        dispatch(userProfile())
      }, 10000); // 10000 milliseconds = 10 seconds
      // Clear the interval when the component unmounts
      return () => {
        clearInterval(intervalId);
      };
    }, [dispatch])

  return (
    <div className='profile-page'>
        <h1>Profile</h1>
        <div className='card-profile'>
        <div className='flex justify-center text-xl'>
        <h2>Welcome {state?.profile?.data?.response?.fname} </h2>
        </div>
        <div className='flex justify-center'>
        <img src='https://media.tenor.com/zBc1XhcbTSoAAAAC/nyan-cat-rainbow.gif' alt='Profile PIC' className='rounded-full'/>
        </div>
        <div className='flex flex-col justify-start mt-3 p-2 text-lg'>
        <span>Email: {state?.profile?.data?.response?.email}</span>
        <span>Name: {state?.profile?.data?.response?.fname} {state?.profile?.data?.response?.lname}</span>
        <span>Create: {moment(state?.profile?.data?.response?.createdAt).format("YYYY-MM-DD HH:mm:ss")}</span>
        <span>Update: {moment(state?.profile?.data?.response?.updatedAt).format("YYYY-MM-DD HH:mm:ss")}</span>
        </div>
        <div className='flex justify-around text-xl '>
        <a href='/editprofile' className='hover-link' >edit</a>
        <a href='https://www.youtube.com/' rel="noreferrer" target="_blank" className='hover-link'><FontAwesomeIcon icon={faFacebook}/></a>
        <a href='https://www.youtube.com/' rel="noreferrer" target="_blank" className='hover-link'><FontAwesomeIcon icon={faYoutube}/></a>
        </div>
        </div>
        <footer className='flex justify-center items-center footer-slide-up'>
          ............................................................................................
        </footer>
    </div>
  )
}

export default Userprofile

