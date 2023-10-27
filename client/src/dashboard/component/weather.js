import React, {useState} from 'react'
import '../style/dashboard.css';

function Weather() {
  const [cityName , setCity] = useState('');
  console.log(cityName)
  const [weatherData,setWeather]=useState("");
  const handleChange = (e)=>{
    setCity(e.target.value)
  }

  async function fetchWeather(){
    const jsondata = {
        city : cityName
    }
    try{
        const response = await fetch('http://127.0.0.1:8080/searchCity',{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(jsondata),
        })
        const result = await response.json()
        if(result.status === 'ok'){
            setWeather(result)
        }if(result.status === 'error'){
            alert(result.result)
        }
        console.log(result.result)
    }catch(err){
        console.log(err)
    }
  }
  return (
    <div className='flex-1 bg-blue-400'>
        <h1>Weather</h1>
        <div className='grid justify-center'>
            <div>
                <input type="text" value={cityName} onChange={handleChange}/>
                <button className='submitButton' onClick={()=>fetchWeather()} >Search City </button>
            </div>
            <div>
                <h2>{weatherData.result?.name}</h2>
                <p>{weatherData.result?.main.temp}</p>
                <p>{weatherData.result?.wind.speed}</p>
            </div>
        </div>
    </div>
  )
}

export default Weather