import { useEffect, useState, useContext } from "react";
import AppLoading from "../../AppLoading";
import GetServices from "../../services/GetServices/GetServices";
import GetTaxonomies from "../../services/GetTaxonomies/GetTaxonomies";
import { CardContainer } from "../../util/styled-components/CardContainer";
import ServiceCard from "../Service/ServiceCard";
import CategoryCard from "../Category/CategoryCard";
import Header from "../Header/Header";
import ToggleView from "../ToggleView/ToggleView";
import PrevUrlContext from "../../context/PrevUrlContext/PrevUrlContext";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
import PrevUrlParamsContext from "../../context/PrevUrlParamsContext/PrevUrlParamsContext";
import MapToggleContext from "../../context/MapToggleContext/MapToggleContext";
import styled from "styled-components";
import ServiceFilter from "../ServiceFilter/ServiceFilter";
import { MapContainer } from "../../util/styled-components/MapContainer";
import HackneyMap from "../HackneyMap/HackneyMap";
import { useMediaQuery } from "react-responsive";
import MapPlaceholder from "../MapPlaceholder/MapPlaceholder";
import { light } from "../../settings";
import { lighten } from "polished";
import { handleSetPrevUrl } from "../../util/functions/handleSetPrevUrl";
import breakpoint from "styled-components-breakpoint";

export const FILTER_MODIFIER = {
  grey: () => `
        background: ${lighten(0.09, light["greyBorder"])};
    `,
};

export const CategoryCardContainer = styled.div`
  .fss--card {
    box-shadow: none;
    border: 0;
    cursor: auto;
    margin-bottom: 0;
    position: relative;
    z-index: 1;
    .fss--card--container {
      padding: 20px 15px;
      &::after {
        content: none;
      }
    }
    .fss--card--content {
      margin-right: 0;
    }
  }
`;

const LoadingShell = styled.div`
  ${breakpoint("md")`
    height: 100%;
    min-height: 0;
  `}
`;

const LoadingContent = styled.div`
  opacity: ${({ $isLoading }) => ($isLoading ? "0.55" : "1")};
  transition: opacity 0.2s ease-in-out;
  ${breakpoint("md")`
    height: 100%;
    min-height: 0;
  `}
`;

const ResultsLayout = styled.div`
  ${breakpoint("md")`
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 0;
  `}
`;

const CategoryExplorer = ({ onClick }) => {
  const [data, setData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { urlParams } = useContext(UrlParamsContext);
  const { prevUrl, setPrevUrl } = useContext(PrevUrlContext);
  const { prevUrlParams, setPrevUrlParams } = useContext(PrevUrlParamsContext);
  const { mapToggle } = useContext(MapToggleContext);
  const [showMap, setShowMap] = useState("false");
  const storedPostcode = localStorage.getItem("postcode");

  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 768 });
    return isDesktop ? children : null;
  };

  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    return isMobile ? children : null;
  };

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      setIsLoading(true);
      let taxonomyId = [];
      let categoryId = "";
      if (
        Object.entries(urlParams)[0] &&
        Object.entries(urlParams)[0][0] == "category_explorer" &&
        Object.entries(urlParams)[0][1] !== ""
      ) {
        categoryId = parseInt(Object.entries(urlParams)[0][1]);
      }

      for (const [key, value] of Object.entries(urlParams)) {
        if ((key == "category_explorer" || key == "demographic") && value !== "") {
          taxonomyId.push(value);
        }
      }

      // call retrieveServices with categoryId param passed to return all services associated with the category
      const getServices = await GetServices.retrieveServices({
        postcode: storedPostcode,
        taxonomyids: taxonomyId,
      });

      if (!isMounted) return;

      setData(getServices || { services: [] });
      // call getTaxonomy with categoryId param passed to return the category name and description
      const getCategories = await GetTaxonomies.getTaxonomy(categoryId);

      if (isMounted) {
        setCategoryData(getCategories || {});
        setIsLoading(false);
      }
    }

    fetchData();

    const setPrevUrlVals = handleSetPrevUrl({
      prevUrl,
      prevUrlParams,
    });
    if (setPrevUrlVals) {
      setPrevUrl(setPrevUrlVals.prevUrlArray);
      setPrevUrlParams(setPrevUrlVals.prevUrlParamsArray);
    }
    return () => {
      isMounted = false;
    };
  }, [urlParams, storedPostcode]);

  useEffect(() => {
    if (mapToggle === "true") {
      setShowMap("true");
    } else {
      setShowMap("false");
    }
  }, [mapToggle]);

  const hasCategoryData = Object.keys(categoryData).length !== 0;
  const services = data.services || [];

  const select = (e) => {
    onClick(e);
  };

  return (
    <LoadingShell aria-busy={isLoading}>
      {isLoading ? <AppLoading label="Updating results" overlay /> : null}
      <LoadingContent $isLoading={isLoading}>
        {!hasCategoryData ? (
          <div>
            <Header />
            {!isLoading ? (
              <div className="no-results">
                <h2>No results found</h2>
                <p>
                  Please use the &apos;Back&apos; button above to go back and select a
                  category.
                </p>
              </div>
            ) : null}
            <MapPlaceholder />
          </div>
        ) : (
          <ResultsLayout>
            <Header />
            <CategoryCardContainer>
              <CategoryCard key={categoryData.id} category={categoryData} />
            </CategoryCardContainer>
            <ServiceFilter />
            <Mobile>
              <ToggleView />
              {showMap == "false" ? (
                <CardContainer>
                  {services.map((service, index) => {
                    return <ServiceCard key={index} service={service} onClick={select} />;
                  })}
                </CardContainer>
              ) : (
                ""
              )}
            </Mobile>
            <Desktop>
              <CardContainer>
                {services.map((service, index) => {
                  return <ServiceCard key={index} service={service} onClick={select} />;
                })}
              </CardContainer>
            </Desktop>
            <Mobile>
              {showMap == "true" ? (
                <MapContainer>
                  <HackneyMap data={data} />
                </MapContainer>
              ) : (
                ""
              )}
            </Mobile>
            <Desktop>
              <MapContainer>
                <HackneyMap data={data} />
              </MapContainer>
            </Desktop>
          </ResultsLayout>
        )}
      </LoadingContent>
    </LoadingShell>
  );
};

export default CategoryExplorer;
