import { createGlobalStyle } from "styled-components";
import { defaultTheme, blue } from "../../settings";
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
}

a {
  color: ${blue[400]};

  &:hover {
    color: ${darken(0.1, blue[400])};
  }
}

ul.ul-no-style {
  list-style: none;
  padding-left: 0;
  li {
    + li {
      margin-top: 15px;
    }
  }
}

hr {
  border: 2px solid #000000;
  margin: 30px 0;
}

.fas, .fab {
  &::before {
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    content: "\f007";
  }
}

.App {
  position: relative;
  ${breakpoint('sm')`
      
  `}
  ${breakpoint('md')`
    padding: 20px;
  `}
}

`;
