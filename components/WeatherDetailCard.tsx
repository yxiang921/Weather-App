"use client";

import React from 'react';
import { WeatherDetailCardProps } from '@/types/index'

const WeatherDetailCard = ({ detailsTitle , percentage, unit} : WeatherDetailCardProps) => {
  return (
    <div className='w-32 h-32 mx-2 flex flex-col justify-center items-center'>
        <h2 className='font-extrabold text-3xl'>{ percentage }<span className='text-sm'>{unit}</span></h2>
        <h4 className='font-medium text-slate-100'>{ detailsTitle }</h4>
    </div>
  )
}

export default WeatherDetailCard