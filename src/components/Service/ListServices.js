import { useEffect, useState, useContext } from "react";
import AppLoading from "../../AppLoading";
import GetServices from "../../services/GetServices/GetServices";
import ServiceCard from "./ServiceCard";
import { CardContainer } from "../../util/styled-components/CardContainer";
import PrevUrlContext from "../../context/PrevUrlContext/PrevUrlContext";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
import PrevUrlParamsContext from "../../context/PrevUrlParamsContext/PrevUrlParamsContext";
import MapToggleContext from "../../context/MapToggleContext/MapToggleContext";
import ToggleView from "../ToggleView/ToggleView";
import Header from "../Header/Header";
import ServiceFilter from "../ServiceFilter/ServiceFilter";
import { MapContainer } from "../../util/styled-components/MapContainer";
import { useMediaQuery } from "react-responsive";
import HackneyMap from "../HackneyMap/HackneyMap";
import MapPlaceholder from "../MapPlaceholder/MapPlaceholder";
import ServiceSearch from "../ServiceSearch/ServiceSearch";
import { handleSetPrevUrl } from "../../util/functions/handleSetPrevUrl";
import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";

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

const ListServices = ({ onClick }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { urlParams } = useContext(UrlParamsContext);
  const { prevUrl, setPrevUrl } = useContext(PrevUrlContext);
  const { prevUrlParams, setPrevUrlParams } = useContext(PrevUrlParamsContext);
  const { mapToggle } = useContext(MapToggleContext);
  const [showMap, setShowMap] = useState("false");

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
      let postcode = "";
      let search = "";
      let taxonomyId = [];
      for (const [key, value] of Object.entries(urlParams)) {
        if (key == "postcode" && value !== "") {
          postcode = value;
        }
        if (key == "service_search" && value !== "") {
          search = value;
        }
        if ((key == "categories" || key == "demographic") && value !== "") {
          taxonomyId.push(value);
        }
      }
      // call retrieveServicesByCategory with taxonomyids param passed to return all services associated with the category
      const getServices = await GetServices.retrieveServices({
        postcode: postcode,
        search: search,
        taxonomyids: taxonomyId,
      });

      if (isMounted) {
        setData(getServices || { services: [] });
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
  }, [urlParams]);

  useEffect(() => {
    if (mapToggle === "true") {
      setShowMap("true");
    } else {
      setShowMap("false");
    }
  }, [mapToggle]);

  if (isLoading && !data.services) {
    return <AppLoading />;
  }

  const services = data.services || [];

  const select = (e) => {
    onClick(e);
  };

  return (
    <LoadingShell aria-busy={isLoading}>
      {isLoading ? <AppLoading label="Updating results" overlay /> : null}
      <LoadingContent $isLoading={isLoading}>
        {!services.length ? (
          <div>
            <Header />
            <div className="no-results">
              <h2>No results found</h2>
              <p>
                Please use the &apos;Back&apos; button above to go back and try a
                different search term.
              </p>
            </div>
            <MapPlaceholder />
          </div>
        ) : (
          <ResultsLayout>
            <Header />
            <ServiceSearch />
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

export default ListServices;
