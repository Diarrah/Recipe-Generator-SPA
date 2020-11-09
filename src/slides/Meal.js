import React, { useContext } from 'react';
import { RecipeContext } from '../recipeContext';
import grapefruit from '../images/grapefruit.png';

const Meal = () => {
    const { meal: { meal, thumbnail, category, area, tags }, loading, error } = useContext(RecipeContext);

    return (
        <div className="meal">
            {!loading && meal && !error.error && (
                <>
                <div className="meal__textbox">
                    <h1 className={`textbox__heading${meal.length > 32 ? ' shrink' : ''}`}>{meal}</h1>
                    <div className="textbox__container">
                        <div className="container__inner--1">
                            <p className="textbox__container__category">Category: {category}</p>
                            <p className="textbox__container__area">Area: {area}</p>
                        </div>
                        <div className="container__inner--2">
                            <hr />
                            <p className="textbox__container__tags">
                                {tags && tags.map((tag, i) => (
                                    <span key={i} className="container__tag">{tag}</span>
                                ))}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="meal__image__container">
                    <img className="meal__image" src={thumbnail} alt={meal} />
                </div>
                </>
            )}
            {loading && !error.error && (
                <div className="loading__spinner">
                    <img className="grapefruit" src={grapefruit} alt="Grapefruit loading spinner" />
                </div>
            )}
            {!loading && error.error && (
                <div className="error__msg">
                    <img src={grapefruit} alt="Grapefruit" />
                    <div className="error__msg__textbox">
                        <p className="textbox__code">{error.statusCode}</p> <br />
                        <p className="textbox__status">{error.statusText}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Meal