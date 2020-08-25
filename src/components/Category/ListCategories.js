import React, { useEffect, useState } from 'react';
import GetCategories from "../../services/GetCategories/GetCategories";
import CategoryCard from "./CategoryCard";

const ListCategories = ({ categories = [], onClick }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const getCategories = await GetCategories.retrieveCategories({});
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
    <div>
      {!data.length ? (
        <h2>No data Found</h2>
      ) : (
        data.map(category => {
          return (
            <div>
            <CategoryCard
              key={category.id}
              category={category}
              onClick={select}
            />
            </div>
          );
        })
      )}
    </div>
  );

}

export default ListCategories;