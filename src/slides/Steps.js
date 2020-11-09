import React, { useContext, useEffect } from 'react';
import { RecipeContext } from '../recipeContext';
import { Swiper } from 'swiper/react';
import arrow from '../images/arrow.svg';
import yt from '../images/yt-logo.png';


const Steps = () => {
    const { meal: { instructions, videoLink }, stepsSlider, setStepsSlider } = useContext(RecipeContext);

    useEffect(() => {
        instructions && addSlidePerInstruction()
    }, [instructions])
    
    const addSlidePerInstruction = () => {
        const leadingNumWithDot = new RegExp(/\d*\.\d*/);
        const leadingNumWithNoDot = new RegExp(/\d*\.?\d*/);

        const steps = [];

        for (let i = 0; i < instructions.length; i++) {
           steps.push(instructions[i].replace(leadingNumWithDot, '').replace(leadingNumWithNoDot, ''))
        }
        
        steps.filter(step => step.trim() !== '').map((step, i) => (
            stepsSlider.appendSlide(`
                <div class="swiper-slide">
                    <div class="instruction">
                        <div class="instruction__textbox">
                            <div class="textbox__number"> <span>${i + 1}</span> </div>
                            <div class="textbox__step"> ${step} </div>
                        </div>   
                        <div class="video__preview${videoLink !== '' && i === 0 ? ' visible' : ''}">
                            <img class="yt-logo" src=${yt} alt="YouTube logo" />
                            <img class="arrow" src=${arrow} alt="Downward arrow" />
                        </div>
                    </div>
                </div>
            `)
        ))
    }


    return (
        <Swiper
            onSwiper={(swiper) => setStepsSlider(swiper)}
            direction="horizontal"
            simulateTouch={false}
            slidesPerView={1}
            pagination={{ clickable: true }}
            keyboard={{ enabled: true }}
        />
    )
}

export default Steps