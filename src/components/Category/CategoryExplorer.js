import React, { useEffect, useState } from 'react';
import GetServices from "../../services/GetServices/GetServices";

const CategoryExplorer = ({category_explorer}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const getServices = await GetServices.retrieveServices({});

      setData(getServices || []);
      setIsLoading(false);
    }

    fetchData();
  }, [setData, setIsLoading]);

  if (isLoading) {
    return <span>Loading</span>;
  }

  return(
    <div className="">
      <h2>Get services by ID with a header: {category_explorer}</h2>
      -- CategoryCard component goes here --
      -- View toggle component goes here --
      {/* <CategoryCard
        key={category.id}
        id={category.id}
        name={category.name}
        description={category.description}
        category={category.id}
        onSelect={onSelect}
      /> */}

      -- List all services here --
      -- List all services here --
      -- List all services here --
    </div>
    
  );

}


export default CategoryExplorer;