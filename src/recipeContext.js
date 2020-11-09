import React, { useState, useEffect, createContext } from 'react';

export const RecipeContext = createContext();

const RecipeContextProvider = props => {
    const [meal, setMeal] = useState({});
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({ error: false });
    const [mainSwiper, setMainSwiper] = useState();
    const [stepsSlider, setStepsSlider] = useState();

    const databaseFetch = async () => {
        setLoading(true)

        let returned = await (await fetch('https://www.themealdb.com/api/json/v1/1/random.php'));

        if (returned.ok) {
            let result = await returned.json()
            let choice = result.meals[0];

            setMeal({
                id: choice.idMeal,
                meal: choice.strMeal,
                thumbnail: choice.strMealThumb,
                category: choice.strCategory,
                area: choice.strArea,
                tags: splitTags(choice.strTags),
                instructions: splitInstructionsString(choice.strInstructions),   
                ingredients: [getMeasurements(choice), getIngredients(choice)],
                videoLink: choice.strYoutube
            })

        } else {
            setError({
                error: true,
                statusCode: returned.status,
                statusText: returned.statusText
            })
        }
        setLoading(false)
    }


    const splitInstructionsString = (instructions) => {
        const onlyNumber = new RegExp(/^[0-9]+$/);
    
        return instructions
            .split('\r\n')
            .filter(instruction => !instruction.match(onlyNumber))
            .filter(instruction => instruction !== '')
    }


    const splitTags = (tags) => {
        if (tags === null) return
        else return [...tags.split(',')].filter(tag => tag !== '')
    }


    const getIngredients = (strIngredients) => {
        let ingredients = [];

        Object.entries(strIngredients).map(i => {
            const [key, value] = i;

            if (key.includes('strIngredient') && value) {
                ingredients.push(value)
            } else return
        })

        return ingredients
    }


    const getMeasurements = (strMeasure) => {
        let measurements = [];

        Object.entries(strMeasure).map(i => {
            const [key, value] = i;

            if (key.includes('strMeasure') && value && value.trim() !== '') {
                measurements.push(value)
            } else return
        })

        return measurements
    }


    useEffect(() => {
        databaseFetch()
    }, [])


    return (
        <RecipeContext.Provider
            value={{
                meal, setMeal,
                loading, setLoading,
                error, setError,
                mainSwiper, setMainSwiper,
                stepsSlider, setStepsSlider,
                databaseFetch 
            }}
        >
            { props.children }
        </RecipeContext.Provider>
    )
}

export default RecipeContextProvider