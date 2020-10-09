import { createGlobalStyle } from "styled-components";

export const ReactLeafletMarkerClusterStyles = createGlobalStyle`
    .marker-cluster-small{background-color:rgba(181,226,140,0.6)}.marker-cluster-small div{background-color:rgba(110,204,57,0.6)}.marker-cluster-medium{background-color:rgba(241,211,87,0.6)}.marker-cluster-medium div{background-color:rgba(240,194,12,0.6)}.marker-cluster-large{background-color:rgba(253,156,115,0.6)}.marker-cluster-large div{background-color:rgba(241,128,23,0.6)}.leaflet-oldie .marker-cluster-small{background-color:#b5e28c}.leaflet-oldie .marker-cluster-small div{background-color:#6ecc39}.leaflet-oldie .marker-cluster-medium{background-color:#f1d357}.leaflet-oldie .marker-cluster-medium div{background-color:#f0c20c}.leaflet-oldie .marker-cluster-large{background-color:#fd9c73}.leaflet-oldie .marker-cluster-large div{background-color:#f18017}.marker-cluster{background-clip:padding-box;border-radius:20px}.marker-cluster div{width:30px;height:30px;margin-left:5px;margin-top:5px !important;text-align:center;border-radius:15px;font:12px "Helvetica Neue", Arial, Helvetica, sans-serif}.marker-cluster span{line-height:30px}.leaflet-cluster-anim .leaflet-marker-icon,.leaflet-cluster-anim .leaflet-marker-shadow{-webkit-transition:-webkit-transform 0.3s ease-out, opacity 0.3s ease-in;-moz-transition:-moz-transform 0.3s ease-out, opacity 0.3s ease-in;-o-transition:-o-transform 0.3s ease-out, opacity 0.3s ease-in;transition:transform 0.3s ease-out, opacity 0.3s ease-in}.leaflet-cluster-spider-leg{-webkit-transition:-webkit-stroke-dashoffset 0.3s ease-out, -webkit-stroke-opacity 0.3s ease-in;-moz-transition:-moz-stroke-dashoffset 0.3s ease-out, -moz-stroke-opacity 0.3s ease-in;-o-transition:-o-stroke-dashoffset 0.3s ease-out, -o-stroke-opacity 0.3s ease-in;transition:stroke-dashoffset 0.3s ease-out, stroke-opacity 0.3s ease-in}
    
    .marker-cluster div span {
        font-weight: bold;
    }
    .marker-cluster-small {
        background-color: rgba(181, 226, 140, 0.8);
    }
    .marker-cluster-small div {
        background-color: rgba(110, 204, 57, 1);
    }
      
    .marker-cluster-medium {
        background-color: rgba(241, 211, 87, 0.8);
    }
    .marker-cluster-medium div {
        background-color: rgba(240, 194, 12, 1);
    }
      
    .marker-cluster-large {
        background-color: rgba(253, 156, 115, 0.8);
    }
    .marker-cluster-large div {
        background-color: rgba(241, 128, 23, 1);
    }

`;