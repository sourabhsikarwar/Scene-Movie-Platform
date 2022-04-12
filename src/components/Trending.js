import React from 'react';
import logo from "../img/mLogo.png";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';


export default () => {
  return (
    <Splide
      options={ {
        rewind: true,
        gap   : '1rem',
      } }
      aria-label="My Favorite Images"
      className='justify-center'
    >
      <SplideSlide>
        <img src={logo} alt="dataImg" width={150} className='mx-auto justify-center'/>
      </SplideSlide>
      <SplideSlide>
        <img src={logo} alt="dataImg" width={150} className='mx-auto justify-center'/>
      </SplideSlide>
      <SplideSlide>
        <img src={logo} alt="dataImg" width={150} className='mx-auto justify-center'/>
      </SplideSlide>
    </Splide>
  );
}

