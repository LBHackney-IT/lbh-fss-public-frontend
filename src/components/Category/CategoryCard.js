import React from 'react';
import styled from "styled-components";

// create Button component
const Card = styled.div`
    background: #F8F8F8;
    border: 1px solid #DEE0E2;
    box-sizing: border-box;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.05);
    border-radius: 3px;
    width: 350px;
    margin-bottom: 10px;
    padding: 15px 10px;
    cursor: pointer;
    // to change and break out into a main component
`;

// export default Card;

const CategoryCard = ({ category, onClick }) => {
    const select = e => {
        onClick(category.id);
    }

    return (
        <Card id={category.id} className="category--card" onClick={select}>
            <div><i className="fa fa-camera-retro"></i><span className="hideVisually">{`Icon for ${category.name} `}</span></div>
            <div>
                <h4>{category.name}</h4>
                <p>{category.description}</p>
            </div>
        </Card>
    );
  };

export default CategoryCard;