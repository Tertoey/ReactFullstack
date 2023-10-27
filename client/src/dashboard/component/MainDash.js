import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {fetchSensor} from '../../reducers/todoApi'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import {useSelector, useDispatch} from 'react-redux'
import '../style/dashboard.css';

function MainDash() {
  const [data, setData] = useState('');
  const [am319, setAm319] = useState('');
  const dispatch = useDispatch()
  const state = useSelector((state)=>state)

  async function fetchData() {
    try {
      const res = await fetch("http://127.0.0.1:8080/warehouseflow");
      const json = await res.json();
      setData(json);
      console.log(json)
    } catch (err) {
      console.log(err)
    }
  }

  async function fetchAM319() {
    try {
      const res = await fetch("http://127.0.0.1:8080/am319");
      const json = await res.json();
      setAm319(json);
      // console.log(am319)
    } catch (err) {
      console.log(err)
    }
  }

  async function authen() {
    try{
        const token = localStorage.getItem('token')
        const response = await fetch("http://127.0.0.1:8080/authen",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                // 'Authorization':`Bearer ${localStorage["Token"]}`
                'Authorization':'Bearer '+ token
            },
        })
        const result = await response.json()
        if(result.status==='ok'){

        }else{
            alert('Auth Failed')
            localStorage.removeItem('token')
            window.location = '/'
        }
    }catch(error){
        console.log(error)
    }
  }

  useEffect(() => {
    authen();
    fetchData();
    fetchAM319();
    const intervalId = setInterval(() => {
      dispatch(fetchSensor());
      fetchAM319();
      fetchData(); // Fetch data every 10 seconds
      }, 10000); // 10000 milliseconds = 10 seconds
      // Clear the interval when the component unmounts
      return () => {
        clearInterval(intervalId);
      };
  }, [dispatch])

  return (
    <>
      {/* Content */}
      <main className="bg-gray-200 flex-1">
        {/* Your content goes here */}
        <h1 className='text-5xl'>Dashboard</h1>
        <h2 className='ml-4 font-bold text-4xl '>Realtime Data</h2><br/>
        <div className='grid grid-cols-2'>
        <div>
        <p className='ml-4 underline'>STATION 1</p>
        <div className='flex flex-wrap'>
            <div className='m-4 card-realtime'>
                <h4>Flow</h4>
                <p>{state?.apiSensors?.data?.result[4]?.Flow} m3/hr</p>
            </div>
            <div className='m-4 card-realtime'>
                <h4>Pressure</h4>
                <p>{data.result?.Pressure} bars</p>
            </div>
            <div className='m-4 card-realtime'>
                <h4>Level</h4>
                <p>{data.result?.Level} m.</p>
            </div>
            <div className='m-4 card-realtime'>
                <h4>Alarm</h4>
                <p>{data.result?.SW1 === '1' ? (
                    <FontAwesomeIcon icon={faBell} className="text-red-500" />
                    ) : (
                    <FontAwesomeIcon icon={faBell} className="text-green-500" />
                )}</p>
            </div>
        </div>
        </div>
        <div>
        <p className='ml-4 underline'>STATION 1</p>
        <div className='flex flex-wrap'>
            <div className='m-4 card-realtime'>
                <h4>Flow</h4>
                <p>{state?.apiSensors?.data?.result[4]?.Flow} m3/hr</p>
            </div>
            <div className='m-4 card-realtime'>
                <h4>Pressure</h4>
                <p>{data.result?.Pressure} bars</p>
            </div>
            <div className='m-4 card-realtime'>
                <h4>Level</h4>
                <p>{data.result?.Level} m.</p>
            </div>
            <div className='m-4 card-realtime'>
                <h4>Alarm</h4>
                <p>{data.result?.SW1 === '1' ? (
                    <FontAwesomeIcon icon={faBell} className="text-red-500" />
                    ) : (
                    <FontAwesomeIcon icon={faBell} className="text-green-500" />
                )}</p>
            </div>
        </div>
        </div>
        </div>
        <p className='ml-4 underline'>STATION 1</p>
        <div className='flex flex-wrap'>
            <div className='m-4 card-realtime'>
                <h4>Flow</h4>
                <p>{state?.apiSensors?.data?.result[4]?.Flow} m3/hr</p>
            </div>
            <div className='m-4 card-realtime'>
                <h4>Pressure</h4>
                <p>{data.result?.Pressure} bars</p>
            </div>
            <div className='m-4 card-realtime'>
                <h4>Level</h4>
                <p>{data.result?.Level} m.</p>
            </div>
            <div className='m-4 card-realtime'>
                <h4>Alarm</h4>
                <p>{data.result?.SW1 === '1' ? (
                    <FontAwesomeIcon icon={faBell} className="text-red-500" />
                    ) : (
                    <FontAwesomeIcon icon={faBell} className="text-green-500" />
                )}</p>
            </div>
        </div>
        <p className='ml-4 underline'>STATION 2</p>
        <div className='flex flex-wrap'>
          <div className='m-4 card-realtime'>
            <h4>Temp</h4>
            <p>{am319.result?.payload.temperature} °C</p>
          </div>
          <div className='m-4 card-realtime'>
            <h4>Humidity</h4>
            <p>{am319.result?.payload.humidity} %</p>
          </div>
          <div className='m-4 card-realtime'>
            <h4>PM2.5</h4>
            <p>{am319.result?.payload.pm2_5} ppm</p>
          </div>
          <div className='m-4 card-realtime'>
            <h4>RSSI</h4>
            <p>{am319.result?.rssi} dBm</p>
          </div>
        </div>
      </main>
    </>
  );
}

export default MainDash;
