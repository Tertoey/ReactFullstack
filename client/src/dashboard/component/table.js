import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {fetchSensor} from '../../reducers/todoApi'
// import Linechart from './lineChart'
import moment from "moment"; // for timezone conversion
import '../style/dashboard.css';

function convertToCSV(data) {
  const header = ['Timestamp', 'Level', 'Pressure', 'Flow', 'SW1'];
  const csvContent = [
    header.join(','),
    ...data.result.map((item) =>
      `${moment(item.Timestamp).format('YYYY-MM-DD HH:mm:ss')},${item.Level},${item.Pressure},${item.Flow},${item.SW1}`
    ),
  ].join('\n');

  return csvContent;
}

function MainDash() {
  const date = new Date()
  const timeStamp = moment(date).format('YYYY-MM-DD HH:mm-ss')
  function handleExportToCSV() {
    if (state.apiSensors.data) {
      const csvContent = convertToCSV(state.apiSensors.data);
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `${timeStamp}_sensor_data.csv`;
      link.click();
    }
  }
  const dispatch = useDispatch()
  const state = useSelector((state)=>state)
  console.log('state',state)

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
    dispatch(fetchSensor());
    const intervalId = setInterval(() => {
        
      }, 10000); // 10000 milliseconds = 10 seconds
      // Clear the interval when the component unmounts
      return () => {
        clearInterval(intervalId);
      };
  }, [dispatch])

  if(state.apiSensors.isLoading){
    return <h1>Loading.....</h1>
  }

  return (
    <>
    <div className="flex justify-center">
      <div className='w-fit h-fit'>
        <div className='flex justify-end'>
        <button className="submitButton mr-4" onClick={handleExportToCSV}>
              Export to CSV
        </button>
        <button className='submitButton' onClick={e => dispatch(fetchSensor())}>Refersh</button>
        </div>
        <div>
        {!state.apiSensors.data ? (<p className='mt-3'>Wating fetch data..</p>) :(
            <table className="table-auto mt-2">
            <thead>
              <tr>
                <th >Timestamp</th>
                <th >Level</th>
                <th >Pressure</th>
                <th >Flow</th>
                <th >SW1</th>
              </tr>
            </thead>
            <tbody>
              {state.apiSensors.data.result.map((item, index) => (
                <tr key={index}>
                  <td>{moment(item.Timestamp).format("YYYY-MM-DD HH:mm:ss")}</td>
                  <td >{item.Level}</td>
                  <td >{item.Pressure}</td>
                  <td >{item.Flow}</td>
                  <td >{item.SW1}</td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </div>
      </div>
    </div>
    </>
  );
}

export default MainDash;
