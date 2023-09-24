"use client";

import React from 'react';
import Header from './Header';

const Hero = () => {
    const wrapperStyle = {
        width: '100%',
        height: '100vh'
    };

  return (
    <div className='lg:container bg-sky-100 flex flex-col ' style={wrapperStyle}>
        <Header />        
    </div>
  )
}

export default Hero