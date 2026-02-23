import { createGlobalStyle } from "styled-components";
import { defaultTheme, blue, dark, light, red, category } from "../../settings";
import { normalize } from "polished";
import openSansV17Latin700Ttf from "../../fonts/open-sans-v17-latin/open-sans-v17-latin-700.ttf";
import openSansV17Latin700Woff from "../../fonts/open-sans-v17-latin/open-sans-v17-latin-700.woff";
import openSansV17Latin700Woff2 from "../../fonts/open-sans-v17-latin/open-sans-v17-latin-700.woff2";
import openSansV17LatinRegularTtf from "../../fonts/open-sans-v17-latin/open-sans-v17-latin-regular.ttf";
import openSansV17LatinRegularWoff from "../../fonts/open-sans-v17-latin/open-sans-v17-latin-regular.woff";
import openSansV17LatinRegularWoff2 from "../../fonts/open-sans-v17-latin/open-sans-v17-latin-regular.woff2";
import { darken } from "polished";
import breakpoint from 'styled-components-breakpoint';

export const GlobalStyle = createGlobalStyle`
${normalize()}
html {
  box-sizing: border-box;
  font-size: 16px;
}
*, *:before, *:after {
  box-sizing: inherit;
}
body {
  margin: 0;
  padding: 0;
  font-family: ${defaultTheme.primaryFont};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

/* erw-root */
#erw-root {
  overflow: auto;
  * {
    margin-top: unset;
  }
  p:not(.card--description) {
    margin-bottom: 1em !important;
  }
  p, h1, h2, h3, h4, h5, h6 {
    line-height: 1.25;
  }
  p, button, li {
    font-weight: 400;
  }
}

@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400;
  src: local('Open Sans Regular'), local('OpenSans-Regular'),
    url(${openSansV17LatinRegularWoff2}) format('woff2'),
    url(${openSansV17LatinRegularWoff}) format('woff'),
    url(${openSansV17LatinRegularTtf}) format('truetype');
}

@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 700;
  src: local('Open Sans Regular'), local('OpenSans-Regular'),
    url(${openSansV17Latin700Woff2}) format('woff2'),
    url(${openSansV17Latin700Woff}) format('woff'),
    url(${openSansV17Latin700Ttf}) format('truetype');
}

h1, h2, h3, h4, h5, h6 {
  margin-top: 0;
  margin-bottom: 1em;
}

p {
  line-height: 1.25 !important;
  font-weight: normal !important;
}

a {
  color: ${blue["link"]};

  &:hover {
    color: ${darken(0.1, blue["link"])};
  }
}

button {
  cursor: pointer;
}

ul.ul-no-style {
  list-style: none;
  padding-left: 0;
  li {
    + li {
      margin-top: 15px !important;
    }
    svg {
      margin-right: 5px;
    }
  }
}

hr {
  border: 2px solid ${dark["black"]};
  margin: 30px 0;
}

.hideVisually {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}

@media print {
  @page {
    margin: 10mm;
  }
  .print-only {
    display: inline;
  }
  .page-break {
    margin-top: 3.5rem;
    display: block;
    page-break-before: always;
  }
  .no-print {
    display: none !important;
    visibility: hidden !important;
  }
  .accordion__button {
    svg.accordion-chevron {
      display: none;
    }
  }
}

.App {
  position: relative;
  ${breakpoint('sm')`
      
  `}
  ${breakpoint('md')`
    
  `}
}

.no-results {
  padding: 20px;
  background: ${light["white"]};
  height: 100vh;
  z-index: 1;
  position: relative;
}

#postcode-input-container {
  p {
    color: ${light["white"]};
    border-left: 4px solid ${red["error"]};
    padding-left: 10px;
  }
}

.category-icons {
  i {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    margin-right: 10px;
    padding: 5px;
    opacity: 0.75;
    svg {
      font-size: 30px;
      color: ${light["white"]};
    }
  }
}

[data-category-icon] {
  svg.fa-map-marker-alt {
    color: ${category["pink"]};
  }
  i {
    background-color: ${category["pink"]};
  }
}
[data-category-icon="loneliness-or-isolation"] {
  svg.fa-map-marker-alt {
    color: ${category["pink"]};
  }
  i {
    background-color: ${category["pink"]};
  }
}
[data-category-icon="anxiety-or-mental-health"] {
  svg.fa-map-marker-alt {
    color: ${category["orange"]};
  }
  i {
    background-color: ${category["orange"]};
  }
}
[data-category-icon="safe-and-healthy-body"] {
  svg.fa-map-marker-alt {
    color: ${category["greenLight"]};
  }
  i {
    background-color: ${category["greenLight"]};
  }
}
[data-category-icon="exercise-and-wellbeing"] {
  svg.fa-map-marker-alt {
    color: ${category["red"]};
  }
  i {
    background-color: ${category["red"]};
  }
}
[data-category-icon="arts-and-creativity"] {
  svg.fa-map-marker-alt {
    color: ${category["blueDark"]};
  }
  i {
    background-color: ${category["blueDark"]};
  }
}
[data-category-icon="food-or-shopping"] {
  svg.fa-map-marker-alt {
    color: ${category["green"]};
  }
  i {
    background-color: ${category["green"]};
  }
}
[data-category-icon="faith-led-activities"] {
  svg.fa-map-marker-alt {
    color: ${category["blue"]};
  }
  i {
    background-color: ${category["blue"]};
  }
}
[data-category-icon="money-advice"] {
  svg.fa-map-marker-alt {
    color: ${category["brown"]};
  }
  i {
    background-color: ${category["brown"]};
  }
}
[data-category-icon="employment-advice"] {
  svg.fa-map-marker-alt {
    color: ${category["purple"]};
  }
  i {
    background-color: ${category["purple"]};
  }
}
[data-category-icon="housing-advice"] {
  svg.fa-map-marker-alt {
    color: ${category["blueLight"]};
  }
  i {
    background-color: ${category["blueLight"]};
  }
}
[data-category-icon="immigration-advice"] {
  svg.fa-map-marker-alt {
    color: ${category["greenDark"]};
  }
  i {
    background-color: ${category["greenDark"]};
  }
}

/**
 * Leaflet map styles
 */

.leaflet-container {
  width: 100%;
  height: 100vh;
  .leaflet-div-icon {
    background: transparent;
    border: 0;
  }
  .hackney-map-marker, .hackney-map-home-marker  {
    position: relative;
    left: -10px;
  }
  .hackney-map-home-marker {
    .map-marker--foreground {
      font-size: 37px;
      top: -1px;
      left: 0;
      color: ${red["error"]} !important;
    }
    svg.fa-home {
      position: absolute;
      top: 4px;
      left: 4px;
      z-index: -1;
      color: ${light["white"]};
      font-size: 18px;
    }
  }
  svg.fa-map-marker {
    position: absolute;
    top: -3px;
    left: -2px;
    z-index: -1;
    color: ${light["white"]};
    font-size: 42px;
  }
}

.leaflet-popup {
  .leaflet-popup-content-wrapper {
    background: transparent;
    box-shadow: none;
    padding: 0;
    border: 0;
  }
  .leaflet-popup-content {
    ${breakpoint('md')`
      background: transparent;
      margin: 0 !important;
      border: 0;
    `};
  }
  .leaflet-popup-tip-container {
    display: none;
  }
  .card {
    margin-bottom: 0;
    border: 0;
  }
}
  
`;