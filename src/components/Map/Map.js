import React from "react";
import styled from "styled-components";

const MapDiv = styled.div`
    position: absolute;
    top: -20px;
    left: -20px;
    z-index: -1;
    width: 100%;
    height: 100%;
    img {
        width: auto;
        height: calc(100vh + 20px);
    }
`;

const Map = () => {
    return (
        <MapDiv>
            <img src="http://placehold.jp/24/cccccc/ffffff/1200x600.png?text=Map%20placeholder" alt="Map placeholder"></img>
        </MapDiv>
    )
}

export default Map;