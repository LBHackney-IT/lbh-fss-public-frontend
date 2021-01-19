import React, { useEffect, useState } from 'react';
import GetTaxonomies from "../../services/GetTaxonomies/GetTaxonomies";
import CategoryCard from "./CategoryCard";
import { CardContainer } from "../../util/styled-components/CardContainer";
import styled from "styled-components";
import breakpoint from 'styled-components-breakpoint';
import { light } from "../../settings";

export const ListCategoriesContainer = styled.div`
    ${breakpoint('md')`
      position: relative;
      z-index: 2;
      background: ${light["white"]};
    `}
    h3 {
      font-weight: normal;
      font-size: 24px;
    }
`;

const ListCategories = ({ categories = [], onClick }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const getCategories = await GetTaxonomies.retrieveTaxonomies({vocabulary: "category"});
      setData(getCategories || []);
      setIsLoading(false); 
    }
    fetchData();

  }, [setData, setIsLoading]);


  if (isLoading) {
    return <span>Loading</span>;
  }

  const select = e => {
    onClick(e);
  }

  return(
    <ListCategoriesContainer id="list-categories--container">
      {!data.length ? (
        <h2>No data Found</h2>
      ) : (
        <CardContainer>
          <h3>Explore categories</h3>
          {data.map(category => {
            return (
              <CategoryCard
                key={category.id}
                category={category}
                onClick={select}
              />
            );
          })}
        </CardContainer>
      )}
    </ListCategoriesContainer>
  );

}

export default ListCategories;