"use client";

import React from 'react';
import { useState } from 'react';

import WeatherDetailCard from './WeatherDetailCard';
import TimeStampCard from './TimeStampCard';
import axios from 'axios';

const Header = () => {
  const [country, setCountry] = useState('');
  const [weatherData, setWeatherData] = useState({});
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [bgImage, setBgImage] = useState('default.jpg');

  const API_KEY = 'ec18c3f6cc7f715638bfbd94e1ef9cfd';
  const API_URL = 'http://api.openweathermap.org/data/2.5/forecast?1&appid=';
  const API_PARAM = '&mode=json&units=metric&cnt=7';
  
  const handlerChange = (e : any) => {
    setCountry(e.target.value);
  }

  const handlerClick = async () => {
    const URL = `${API_URL}${API_KEY}${API_PARAM}&q=${country}`
    const res = await axios.get(URL).then((responses) => {
      setWeatherData(responses.data);

      if(responses.data.list[0].main.temp > 30){
        setBgImage('hot.jpg');
      }else{
        setBgImage('cold.jpg');
      }
      
    }).catch(err => {
      setIsError(true);
      setErrorMsg(err.response.data.message);
    })

  }

  const days = ['Sunday', 'Monday', 'Thuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April',
                 'May', 'June', 'July', 'August',
                 'September', 'October', 'November', 'December'];
  
  const date = new Date();
  const today = date.getDay();
  const day = date.getDate();
  const todayMonth = date.getMonth();

  const fullDate = `${days[today]}, ${day} ${months[todayMonth]}`;


  return (
    <div 
     className='container h-3/5 flex flex-col relative justify-center items-center rounded-b-4xl grayscale-40 bg-no-repeat bg-cover bg-center'
     style={{backgroundImage:`url(${bgImage})`}}
    >
          {/* Location Name Display */}
          { weatherData.cod !== undefined ? (
            <div className='flex flex-col justify-center items-center'>
              <h2 className='absolute top-6 text-white font-bold text-xl'>
                { weatherData.city.name }

              </h2>
              <div id="main-info" className='flex flex-col justify-center items-center'>
                <h1 id="temp" className='text-[4rem] font-extrabold text-slate-50 drop-shadow-2xl'>
                    {weatherData.list[0].main.temp} °C
                </h1>
                <h3 id="date" className='text-2xl font-medium text-slate-50'>
                  {fullDate}
                </h3>

                <div 
                id="weather-detail" 
                className='text-white flex flex-row w-full'
                >
                  <WeatherDetailCard detailsTitle="Humidity" percentage={weatherData.list[0].main.humidity} unit="%"/>
                  <WeatherDetailCard detailsTitle="Wind Speed" percentage={weatherData.list[0].wind.speed} unit="m/s"/>
                  <WeatherDetailCard detailsTitle="Visibility" percentage={(weatherData.list[0].visibility) / 1000} unit="km"/>
                </div>
              </div>
            </div>
          ) : (
            <h2 className='absolute top-6 text-white font-bold text-xl'>
              Enter A Location
            </h2>
          ) }

      <div className='flex flex-row w-5/6 absolute bottom-8'>
        <input 
         type="text" 
         placeholder='Enter the city name...'
         className='bg-slate-200 hover:bg-white w-full h-14 pl-5 outline-none rounded-l-4xl'
         value={country}
         onChange={handlerChange}
        />
        <button 
         className='bg-blue-400 hover:bg-blue-600 w-20 h-14 text-white flex justify-center items-center rounded-r-4xl'
         onClick={handlerClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.0} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </button>
      </div>

      {
        weatherData.cod == 200 ? (
          

            <div className='absolute -bottom-72 scroll-bar-hidden overflow-scroll w-full h-72 rounded-lg flex flex-col items-start justify-center'>
              <div className='flex flex-row ml-6'>
              {weatherData.list.map((item) => {
              return <TimeStampCard time={item.dt_txt} weatherIcon={item.weather[0].icon} weatherName={item.weather[0].description}/>
            })}
              </div>
          </div>
          
        ) : (
          <h1 className='text-white font-bold text-2xl text-center'>
            {isError ? errorMsg : "Welcome, Please Enter A Location"}
          </h1>
        )
      }
    </div>
  )
}

export default Header