import { useState, useEffect } from "react";
import GetCategories from "../services/GetCategories/GetCategories";
import { toast } from "react-toastify";
import { navigate } from "@reach/router";

function useCategoryId(id) {
  const [categoryId, setCategoryId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      const newCategoryId = await GetCategories.retrieveCategories({});

      if (newCategoryId) {
        // console.log(newCategoryId[0]);
        const array = [];

        newCategoryId.forEach(function (arrayItem) {
            // console.log(arrayItem);
            var x = arrayItem.id;
            // console.log(x);
            array.push(x);
        });
        // console.log(array);
        setCategoryId(array);
        setIsLoading(false);
      } else {
        toast.error("Unable to find category id.");
        // navigate("/users");
      }
    }

    fetchCategories();
  }, [id, setCategoryId, setIsLoading]);

  return {
    categoryId,
    isLoading,
  };
}

export default useCategoryId;
