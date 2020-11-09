import React, { useContext } from 'react';
import { RecipeContext } from '../recipeContext';
import background from '../images/brooke-lark-08bOYnH_r_E-unsplash.jpg';

const ThankYou = () => {
    const { databaseFetch, mainSwiper, stepsSlider } = useContext(RecipeContext)

    const resetMeal = () => {
        databaseFetch()
        stepsSlider.removeAllSlides()
        mainSwiper.slideTo(1, 10)
    }


    return (
        <div className="ending">
            <img src={background} alt="" />
            <div className="ending__textbox">
                <h1 className="textbox__heading">Enjoy!</h1>
                <h3 className="textbox__subheading">Still Hungry?</h3>
                <button className="textbox__btn btn" onClick={() => resetMeal()}>Generate Random Meal</button>
            </div>            
        </div>
    )
}

export default ThankYou