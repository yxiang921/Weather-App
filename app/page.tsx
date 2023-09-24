"use client";

import Hero from '@/components/Hero';
import { useEffect,useState } from 'react';

import Browser from '@/components/Browser';

export default function Home() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => {setWidth(window.innerWidth)});
  }, []);

  const isMobile = width <= 768;

  return (
    <div>
      {width > 768 ? <Browser /> : <Hero />}

    </div>
    
  )
}
