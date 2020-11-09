import React, { useContext } from 'react';
import { RecipeContext } from '../recipeContext';

const Video = () => {
    const { meal: {meal, videoLink} } = useContext(RecipeContext);

    return (
        <div className="video__wrapper">
            <iframe 
                title={`Video showing how to cook ${meal}`}
                className="video"
                width="420" height="315"
                src={videoLink && `https://www.youtube.com/embed/${videoLink.slice(-11)}`}>
			</iframe>
        </div>
    )
}

export default Video