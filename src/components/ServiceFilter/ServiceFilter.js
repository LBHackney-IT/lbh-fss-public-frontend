import { useContext } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UrlContext from "../../context/UrlContext/UrlContext";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
import { useNavigate } from "react-router-dom";
import { green, yellow, light } from "../../settings";
import { lighten } from "polished";

export const ServiceFilterContainer = styled.div`
  background: ${lighten(0.03, green["main"])};
  width: 100%;
  max-height: 60px;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
`;

export const ServiceFilterContainerGrey = styled(ServiceFilterContainer)`
  background: ${lighten(0.01, light["greyBorder"])};
  button {
    color: ${green["main"]};
  }
`;

const FilterButton = styled.button`
  color: ${light["white"]};
  font-size: 16px;
  border: 0;
  padding: 20px 15px;
  cursor: pointer;
  background: transparent;
  display: inline-flex;
  align-items: center;
  svg {
    margin-right: 10px;
  }
`;

const FilterButtonActive = styled(FilterButton)`
  color: ${yellow["selected"]};
`;

const ClearButton = styled.button`
  color: #fff;
  font-size: 16px;
  border: 0;
  padding: 20px 15px;
  cursor: pointer;
  background: transparent;
  margin-left: auto;
`;

const ServiceFilter = () => {
  const navigate = useNavigate();
  const { setUrl } = useContext(UrlContext);
  const { urlParams, setUrlParams } = useContext(UrlParamsContext);
  const pathDemographics = "&select_demographics=true";

  let showDemographicsButton = true;
  let showClearAllButton = false;
  let isActive = false;
  let isGrey = false;

  const selectDemographicsEvent = () => {
    const selectDemographicsObj = [urlParams].find(
      (selectDemographicsObj) => selectDemographicsObj.select_demographics,
    );
    if (!selectDemographicsObj) {
      let push =
        "?" +
        new URLSearchParams(urlParams)
          .toString()
          .replace(/%2C/g, "+")
          .replace(/%2B/g, "+") +
        pathDemographics;
      push = push.replaceAll("=undefined", "");
      navigate(push);
      setUrl(push);
      urlParams["select_demographics"] = "true";
      setUrlParams(urlParams);
    }
  };
  const clearTaxonomiesEvent = () => {
    let checks = document.querySelectorAll('input[type="checkbox"]');
    for (let i = 0; i < checks.length; i++) {
      let check = checks[i];
      if (!check.disabled) {
        check.checked = false;
      }
    }
  };

  for (const [key, value] of Object.entries(urlParams)) {
    if (key == "category_explorer" && value !== "") {
      isGrey = true;
    }
    if (key == "select_categories" && value === "true") {
      showDemographicsButton = false;
      showClearAllButton = true;
      isActive = true;
    }
    if (key == "select_demographics" && value === "true") {
      showClearAllButton = true;
      isActive = true;
    }
  }

  const Container = isGrey ? ServiceFilterContainerGrey : ServiceFilterContainer;
  const DemographicsButton = isActive ? FilterButtonActive : FilterButton;

  return (
    <Container>
      {showDemographicsButton ? (
        <DemographicsButton onClick={selectDemographicsEvent}>
          <FontAwesomeIcon icon={["fas", "filter"]} />
          Filters
        </DemographicsButton>
      ) : (
        ""
      )}
      {showClearAllButton ? (
        <ClearButton onClick={clearTaxonomiesEvent}>Clear all</ClearButton>
      ) : (
        ""
      )}
    </Container>
  );
};

export default ServiceFilter;
