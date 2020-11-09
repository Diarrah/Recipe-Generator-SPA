import React, { useState, useContext, useEffect } from 'react';
import { RecipeContext } from '../recipeContext';

const Welcome = () => {
    const { mainSwiper, meal} = useContext(RecipeContext);
    const [count, setCount] = useState(sessionStorage.getItem('count') ? sessionStorage.getItem('count') : 0);
    const background = document.querySelector('.background');
    let percentage = document.querySelector('.loader__percentage'),
        load = 0,
        int;
        

    useEffect(() => {        
        if (meal.videoLink === '') {
            mainSwiper.removeSlide(4)
        } else return
    }, [meal])


    const blurring = () => {
        load++;
        
        percentage.innerText = load + '%';
        percentage.style.opacity = scale(load, 0, 100, 1, 0.1);

        if (load < 50) {
            background.style.filter = `blur(${scale(load, 0, 100, 0, 30)}px)`;
        } else if (load >= 50) {
            background.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;
        }

        if (load === 99) clearInterval(int)
    }
        
    const scale = (num, in_min, in_max, out_min, out_max) => {
        return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }


    const handleClick = () => {
        setCount(count + 1)

        if (count === 0) {
            int = setInterval(blurring, 18)

            setTimeout(function() {
                mainSwiper.slideTo(1, 500, false)
                mainSwiper.allowTouchMove = true;
                mainSwiper.keyboard.enable()
                mainSwiper.pagination.el.style.display = 'block'
                setCount(count + 2)
            }, 2000)  
        } else if (count > 0) {
            mainSwiper.slideTo(1, 500, false)
        }
    }

    return (
        <div className="welcome">
            <div className="background" />
            <div className={`welcome__textbox ${count === 1 ? 'hidden' : ''}`}>
                <h1 className="textbox__heading">Feeling Hungry?</h1>
                <button className="textbox__button btn" onClick={handleClick}>Generate Random Meal</button>
            </div>
            <div className={`welcome__loader ${count === 1 ? 'visible' : ''}`}>
                <p className="loader__percentage" />
                <p className="loader__text">Generating your meal. . .</p>
            </div>
        </div>
    )
}

export default Welcome