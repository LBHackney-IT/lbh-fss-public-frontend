import { useEffect, useState } from "react";
import AppLoading from "../../AppLoading";
import GetTaxonomies from "../../services/GetTaxonomies/GetTaxonomies";
import CategoryCard from "./CategoryCard";
import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";
import { light } from "../../settings";

export const ListCategoriesContainer = styled.div`
  ${breakpoint("md")`
      position: relative;
      z-index: 2;
      background: ${light["white"]};
      /* Shrink within column when list is long enough to scroll */
      flex: 0 1 auto;
      min-height: 0;
      align-self: stretch;
      width: 100%;
      display: block;
      box-sizing: border-box;
      /* Always leave a strip of map below the white panel so it floats above the map */
      margin-bottom: 50px;
      max-height: calc(100% - 50px);
      overflow-x: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    `}
  h3 {
    font-weight: normal;
    font-size: 24px;
  }
`;

const HomeCategoriesScroll = styled.div`
  padding: 0 15px 0;
  ${breakpoint("md")`
    padding: 10px 15px 20px;
    position: relative;
    z-index: 1;
    background: ${light["white"]};
  `}
`;

const ListCategories = ({ onClick }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const getCategories = await GetTaxonomies.retrieveTaxonomies({
        vocabulary: "category",
      });
      setData(getCategories || []);
      setIsLoading(false);
    }
    fetchData();
  }, [setData, setIsLoading]);

  if (isLoading) {
    return <AppLoading />;
  }

  const select = (e) => {
    onClick(e);
  };

  return (
    <ListCategoriesContainer id="list-categories--container">
      {!data.length ? (
        <h2>No data Found</h2>
      ) : (
        <HomeCategoriesScroll>
          <h3>Explore categories</h3>
          {data.map((category) => {
            return (
              <CategoryCard key={category.id} category={category} onClick={select} />
            );
          })}
        </HomeCategoriesScroll>
      )}
    </ListCategoriesContainer>
  );
};

export default ListCategories;
