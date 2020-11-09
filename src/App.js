import React, { useContext } from 'react';
import { RecipeContext } from './recipeContext';
import * as slide from './slides';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Keyboard } from 'swiper';

import './App.scss';
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

SwiperCore.use([Pagination, Keyboard]);

function App() {
    const { mainSwiper, setMainSwiper, error } = useContext(RecipeContext);

    if (error.error) mainSwiper.removeSlide([2, 10])

  return (
    <div className="App">
        <Swiper
            onInit={(swiper) => setMainSwiper(swiper)}
            direction="vertical"
            pagination={{ clickable: true }}
            keyboard={{ enabled: false }}
            simulateTouch={false}
            allowTouchMove={false}
            slidesPerView={1}
        >
            <SwiperSlide><slide.Welcome /></SwiperSlide>
            <SwiperSlide><slide.Meal /></SwiperSlide>
            <SwiperSlide><slide.Ingredients /></SwiperSlide>
            <SwiperSlide><slide.Steps /></SwiperSlide>
            <SwiperSlide><slide.Video /></SwiperSlide>
            <SwiperSlide><slide.ThankYou /></SwiperSlide>
        </Swiper>
    </div>
  );
}

export default App;