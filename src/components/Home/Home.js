import { useEffect, useState, useContext } from "react";
import AppLoading from "../../AppLoading";
import ListCategories from "../Category/ListCategories";
import UrlContext from "../../context/UrlContext/UrlContext";
import PrevUrlContext from "../../context/PrevUrlContext/PrevUrlContext";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
import PrevUrlParamsContext from "../../context/PrevUrlParamsContext/PrevUrlParamsContext";
import Header from "../Header/Header";
import FormInputSubmit from "../FormInputSubmit/FormInputSubmit";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import MapPlaceholder from "../MapPlaceholder/MapPlaceholder";
import { green } from "../../settings";
import breakpoint from "styled-components-breakpoint";

const HomeHeader = styled.div`
  padding: 17px 15px 2px;
  background: ${green["main"]};
  z-index: 1;
  ${breakpoint("md")`
        position: relative;
    `}
`;

const HomeRoot = styled.div`
  ${breakpoint("md")`
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 0;
  `}
`;

const HomeTop = styled.div`
  flex-shrink: 0;
`;

const HomeMapSlot = styled.div`
  ${breakpoint("md")`
    flex: 0 0 0;
    height: 0;
    overflow: visible;
  `}
`;

/** Flex column under header; bottom gap under the category panel is on #list-categories--container */
const HomeCategoriesColumn = styled.div`
  ${breakpoint("md")`
    flex: 1 1 auto;
    min-height: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    box-sizing: border-box;
    overflow: visible;
  `}
`;

const Home = () => {
  const { setUrl } = useContext(UrlContext);
  const { setPrevUrl } = useContext(PrevUrlContext);
  const { setUrlParams } = useContext(UrlParamsContext);
  const { setPrevUrlParams } = useContext(PrevUrlParamsContext);
  const [isLoading, setIsLoading] = useState(true);
  const paramsArray = [
    "category_explorer",
    "postcode",
    "service_search",
    "support_service",
    "categories",
    "demographic",
  ];
  const { register, handleSubmit } = useForm();
  const currentSearch = window.location.search;
  const storedPostcode = localStorage.getItem("postcode");
  const navigate = useNavigate();

  let prevUrlArray = [""];
  let paramObj = {};
  let prevUrlParamsArray = [{}];

  function createParamObj(currentSearch, paramsArray) {
    const queryParts = currentSearch.substring(1).split(/[&;]/g);
    const arrayLength = queryParts.length;
    for (let i = 0; i < arrayLength; i++) {
      const queryKeyValue = queryParts[i].split("=");
      if (paramsArray.includes(queryKeyValue[0])) {
        paramObj[queryKeyValue[0]] = queryKeyValue[1];
      }
    }
  }

  const setPreviousUrls = (currentSearch) => {
    if (currentSearch) {
      setUrl(currentSearch);

      prevUrlArray.push(currentSearch);
      setPrevUrl(prevUrlArray);

      createParamObj(currentSearch, paramsArray);
      prevUrlParamsArray.push(paramObj);
      setPrevUrlParams(prevUrlParamsArray);
    }
  };

  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  let postcodeQuery = storedPostcode;
  if (!storedPostcode) {
    postcodeQuery = undefined;
  }

  async function submitForm({ service_search }) {
    if (isLoading) return;

    let searchQuery = service_search;
    if (service_search === "") {
      searchQuery = undefined;
    }

    navigate("?postcode=" + storedPostcode + "&service_search=" + service_search);
    setPreviousUrls(currentSearch);
    setUrlParams({ postcode: postcodeQuery, service_search: searchQuery });
  }

  const selectCategory = (e) => {
    navigate("?category_explorer=" + e + "&postcode=" + postcodeQuery);
    setUrlParams({ category_explorer: e, postcode: postcodeQuery });
    setPreviousUrls(currentSearch);
  };

  return isLoading ? (
    <AppLoading />
  ) : (
    <>
      <HomeRoot className="Home">
        <HomeTop>
          <Header />
          <HomeHeader>
            <form
              id="fss--find-service"
              onSubmit={handleSubmit(submitForm)}
              data-testid="form"
            >
              <FormInputSubmit
                id="fss--service-search"
                label="Search for a service"
                placeholder="Enter keyword or organisation"
                name="service_search"
                type="text"
                register={register}
              />
            </form>
          </HomeHeader>
        </HomeTop>
        <HomeCategoriesColumn>
          <ListCategories onClick={selectCategory} />
        </HomeCategoriesColumn>
        <HomeMapSlot>
          <MapPlaceholder />
        </HomeMapSlot>
      </HomeRoot>
    </>
  );
};

export default Home;
