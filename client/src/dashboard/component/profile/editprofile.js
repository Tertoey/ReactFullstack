import React, { useState } from 'react';
import {useSelector} from 'react-redux'
import '../../style/dashboard.css';

function Userprofile() {
    // const [profile, setProfile] = useState('')
    const [notify, setNotify] = useState('')
    const [time, setTime] = useState('')
    const state = useSelector((state)=>state)

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget)
        const jsondata = {
            fname: data.get('fname'),
            lname: data.get('lname'),
            id:state?.profile?.data?.response?._id
          }
          console.log(jsondata)
          async function postJSON(jsondata) {
            try {
              const response = await fetch("http://127.0.0.1:8080/editprofile", {
                method: "PATCH", // or 'PUT'
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(jsondata),
              });
              const result = await response.json();
              var minutes = Math.floor(10 * 60 * 1000);
              // const statusCode = result.headers;
              // const retryAfter = result.get('Retry-After');
              console.log(result);
              if(result.status==='ok'){
                alert(result.message)
                window.location='/profile'
              }if(result.status==='error'){
                alert(result.error)
              }
              if(result.statusCode===429){
                setNotify(result.error)
                const retry = window.lo
                console.log(retry)
              }
            } catch (error) {
              console.error("Error:", error);
            }
          }
          postJSON(jsondata);
      };
  return (
    <div>
        <h1 className='text-4xl'>Edit Profile</h1>
        <div className='flex justify-around'>
            <form onSubmit={handleSubmit} className='flex flex-col text-2xl p-4' >
              <div className='grid sm:grid-cols-2 gap-4'>
                <div className='flex flex-col'>
                <label>Firstname: </label>
                <input className='p-1' type='text' required name='fname' />
                </div>
                <div className='flex flex-col'>
                <label>Lastname: </label>
                <input className='p-1' type='text' required name='lname'/>
                </div>
              </div>
              <div className='flex flex-col mt-4'>
                <label>Email: </label>
                <input className='p-1' type='text'/>
              </div>
              <div className='grid sm:grid-cols-2 mt-4 gap-4'>
                <div className='flex flex-col'>
                <label>Phone number: </label>
                <input className='p-1' type='text'/>
                </div>
                <div className='flex flex-col'>
                <label>Home number: </label>
                <input className='p-1' type='text'/>
                </div>
              </div>
              <div className='flex flex-col mt-4'>
                <label>Address: </label>
                <input className='p-1' type='text' />
              </div>
              <div className='flex justify-between mr-2'>
                <p className='mt-4 text-red-600 underline '>{notify}{time}</p>
              <button className='mt-4 border-2 rounded-xl border-black w-28 hover:bg-blue-400'>Save</button>
              </div>
            </form>
        </div>
    </div>
  )
}

export default Userprofile