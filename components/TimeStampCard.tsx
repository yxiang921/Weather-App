"use client";

import React from 'react';
import { TimeStampCardTypes } from '@/types/index'

const TimeStampCard = ({time, weatherIcon, weatherName} : TimeStampCardTypes) => {

  const cardDate = time.slice(5, 10);
  const cardTime = time.slice(10, 16);
  return (
    <>
        <div
         id="card-container"
         className='w-full h-[200px] rounded-lg flex flex-row items-center mx-2 shadow-md'>
            <div className="drop-shadow-lg flex flex-col justify-center items-center w-[145px] h-full rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-400">
                <p className='font-medium text-slate-50'>{cardDate} <br /> {cardTime}</p>
                <img className=' py-2' src={`https://openweathermap.org/img/wn/${weatherIcon}.png`} alt={weatherName} style={{ width: '65px' }}/>
                <h3 className='text-center text-white font-extrabold drop-shadow-lg'>{ weatherName }</h3>
            </div>
        </div>
    </>
  )
}

export default TimeStampCard