import React, {useContext} from 'react';
import { Card } from "../../util/styled-components/Card"
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";

const CategoryCard = ({ category, onClick }) => {
    const {urlParams} = useContext(UrlParamsContext);
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
        <Card modifiers="categoryCard" id={category.id} className="fss--card" onClick={select}>
            <div className="fss--card--container category-icons" data-category-icon={categoryIconName}>
                <div className="fss--icon-container">
                    <i><span className="hideVisually">{`Icon for ${category.name} `}</span></i>
                </div>
                <div className="fss--card--content">
                    <h4>{category.name}</h4>
                    <p>{category.description}</p>
                </div>
            </div>
        </Card>
    );
};

export default CategoryCard;