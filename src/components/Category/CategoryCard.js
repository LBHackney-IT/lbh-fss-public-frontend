import React, {useContext} from 'react';
import styled from "styled-components";
import { Card } from "../../util/styled-components/Card"
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";

const CategoryCard = ({ category, onClick }) => {
    const {urlParams, setUrlParams} = useContext(UrlParamsContext);
    const urlParamsArray = Object.entries(urlParams);
    
    const select = e => {
        if (urlParamsArray[0] !== undefined && urlParamsArray[0][0] == "category_explorer" && urlParamsArray[0][1] !== "") {
            e.preventDefault();
        } else {
            onClick(category.id);
        }
    }

    const categoryIconName = category.name.replaceAll(" ", "-").toLowerCase();

    return (
        <Card modifiers="categoryCard" id={category.id} className="card" onClick={select}>
            <div className="card--container" data-category-icon={categoryIconName}>
                <div className="icon-container">
                    <i></i><span className="hideVisually">{`Icon for ${category.name} `}</span>
                    </div>
                <div className="card--content">
                    <h4>{category.name}</h4>
                    <p>{category.description}</p>
                </div>
            </div>
        </Card>
    );
};

export default CategoryCard;