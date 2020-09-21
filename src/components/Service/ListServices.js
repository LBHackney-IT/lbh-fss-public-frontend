import React, { useEffect, useState, useContext } from 'react';
import GetServices from "../../services/GetServices/GetServices";
import ServiceCard from "./ServiceCard";
import { CardContainer } from "../../util/styled-components/CardContainer";
import PrevUrlContext from "../../context/PrevUrlContext/PrevUrlContext";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
import PrevUrlParamsContext from "../../context/PrevUrlParamsContext/PrevUrlParamsContext";
import Header from "../Header/Header";
import ServiceFilter from '../ServiceFilter/ServiceFilter';
import styled from "styled-components";
import { Map, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import {MapContainer} from "../../util/styled-components/MapContainer";
import { renderToStaticMarkup } from "react-dom/server";
import { divIcon } from "leaflet";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as _ from "lodash";

const ListServices = ({ categories = [], onClick }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {urlParams, setUrlParams} = useContext(UrlParamsContext);
  const {prevUrl, setPrevUrl} = useContext(PrevUrlContext);
  const {prevUrlParams, setPrevUrlParams} = useContext(PrevUrlParamsContext);
  const paramsArray = ["category_explorer", "postcode", "service_search", "service", "categories", "demographic"];
  const currentSearch = window.location.search;
  let paramObj = {};
  const position = [51.517787, -0.097059];

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

  useEffect(() => {
    async function fetchData() {
      // get urlParams and pass in postcode and search values
      // searchValue.replace("%20", "+"); // don't do this for postcode
      // const getServices = await GetServices.retrieveServices({postcode: value, search: value});
      const getServices = await GetServices.retrieveServices({});
      setData(getServices || []);
      setIsLoading(false);
    }
    fetchData();

    if (prevUrl.length == 0 && prevUrlParams.length == 0) {
      let prevUrlArray = [""];
      let prevUrlParamsArray = [{}];

      // setPrevUrl
      if (currentSearch) {
        prevUrlArray.push(currentSearch);
        setPrevUrl(prevUrlArray);
      }

      // setPrevUrlParams
      createParamObj(currentSearch, paramsArray);
      prevUrlParamsArray.push(paramObj);
      setPrevUrlParams(prevUrlParamsArray);
    }

  }, [setData, setIsLoading]);


  if (isLoading) {
    return <span>Loading</span>;
  }

  const select = e => {
    onClick(e);
  }

  const newService = data => {
    let duplicateService = [...data];

    let i = 0;
    while (i < data.length) {
      // check if any services have multiple locations
      if (data[i].locations.length > 1) {

        // store the locations for the specific service
        const locationsArray = data[i].locations;

        // iterate through each locationsArray and push to thisService.locations
        // then push thisService into duplicateService

        for (const [key, value] of Object.entries(locationsArray.slice(1))) {
          // duplicate the specific service
          let thisService = {...data[i]};

          // reset the specific service locations array to be rewritten
          thisService.locations = [];
          thisService.locations.push(value);
          duplicateService.push(thisService);
        }

      }
      
      i++;
    }

    return duplicateService;
    
  }

  return(
    <div>
      {!data.length ? (
        <h2>No data Found</h2>
      ) : (
        <div>
          <Header />
          <ServiceFilter />
          <CardContainer>
            <div>View as: {`{List | Map}`}</div>
            {data.map((service, index) => {
              return (
                <ServiceCard key={index} service={service} onClick={select} />
              );
            })}
          </CardContainer>
          <MapContainer>
            <Map center={position} zoom={14} zoomControl={false}>
              <ZoomControl position='topright' />
              {/* <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              /> */}
              <TileLayer
                  attribution='Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://mapbox.com">Mapbox</a>'
                  // url="https://api.mapbox.com/styles/v1/samnudge/ckf5pfyrj2ua819ld0f4yq4hk/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2FtbnVkZ2UiLCJhIjoiY2tmNWU1bm91MG02bzJxcDk1bDc4djEwcSJ9.jXBC4VWPmozpPfOpAbaq4Q" // CARTO
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {
                newService(data).map((service, index) => {
                  // service returns an object with all individual service details
                  // inside each service detail, I need to loop through 'locations' array (of objects)
                  // do something
                  // return an individual service object - there will be duplicates for services with multiple addresses
                  
                  const iconMarkup = renderToStaticMarkup(
                    <div className="hackney-map-marker" data-category-icon={categoryIconName}>
                      <FontAwesomeIcon icon={["fas", "map-marker-alt"]} size="3x" />
                      <FontAwesomeIcon icon={["fas", "map-marker"]} size="3x" />
                    </div>
                  );
                  const customMarkerIcon = divIcon({
                    html: iconMarkup
                  });

                  const categoriesSorted = service["categories"].sort(function (a, b) {
                    return a.weight - b.weight;
                  });

                  const categoryIconName = categoriesSorted[0].name.replaceAll(" ", "-").toLowerCase();
                  let newService = service;

                  const point = [parseFloat(newService["locations"][0]['latitude']), parseFloat(newService["locations"][0]['longitude'])];
                  
                  return (
                    <Marker position={point} key={index} icon={customMarkerIcon} data-address={newService["locations"][0]["address1"]}>
                      <Popup>
                        <div>{newService["locations"][0]["address1"]}</div>
                        <ServiceCard key={index} service={service} onClick={select} />
                      </Popup>
                    </Marker>
                  )
                })
                
              }
            </Map>
          </MapContainer>
        </div>
      )}
    </div>
  );

}


export default ListServices;