import React, { useContext, useEffect } from 'react';
import { RecipeContext } from '../recipeContext';
import bokchoy from '../images/bokchoy.png';
import asparagus from '../images/asparagus.png';

const Ingredients = () => {
    const { meal: {ingredients}, loading } = useContext(RecipeContext);
    let list1 = document.querySelector('.textbox__list--1'),
        list2 = document.querySelector('.textbox__list--2');

     useEffect(() => {
        ingredients && renderIngredients()
    }, [!loading])


    const setIngredients = () => {
        let half = Math.ceil(ingredients[1].length / 2);

        for (let i = 0; i < ingredients[1].length; i++) {
            let li = document.createElement('li')
            li.className = `textbox__list__item`
            li.innerHTML = `<span>${ingredients[0][i] ? ingredients[0][i] : ''}</span> ${ingredients[1][i]}`

            if (i < half) list1.appendChild(li)
            else if (i >= half) list2.appendChild(li)
        }
    }

    const renderIngredients = () => {
        if (list1.innerHTML === '' && list2.innerHTML === '') {
            setIngredients()
        } else {
            list1.innerHTML = ``
            list2.innerHTML = ``
            setIngredients()
        }
    }


    return (
        <div className="ingredients">
            <img className="bg-image bg-image--bokchoy" src={bokchoy} alt="Bokchoy" />
            <img className="bg-image bg-image--asparagus" src={asparagus} alt="Asparagus" />  
            <h2 className="ingredients__heading">What You'll Need</h2>
            <div className="ingredients__list__box">
                <ul className="textbox__list--1" />
                <ul className="textbox__list--2" />
            </div>                        
        </div>
    )
}

export default Ingredients