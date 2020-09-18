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
import "@fortawesome/fontawesome-pro/js/all";

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
    svg {
      margin-right: 5px;
    }
  }
}

hr {
  border: 2px solid #000000;
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
  whiteSpace: nowrap;
  width: 1px;
}

.App {
  position: relative;
  ${breakpoint('sm')`
      
  `}
  ${breakpoint('md')`
    padding: 20px;
  `}
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
    &::before {
      display: none;
      font-family: "Font Awesome 5 Pro";
      font-weight: 900;
      content: "\f086";
    }
    svg {
      font-size: 30px;
      color: #fff;
    }
  }
}

[data-category-icon] {
  i {
      background-color: #DF1995;
      &::before {
          content: "\f086";
      }
  }
}
[data-category-icon="loneliness-or-isolation"] {
  i {
      background-color: #DF1995;
      &::before {
        content: "\f086";
      }
  }
}
[data-category-icon="anxiety-or-mental-health"] {
  i {
      background-color: #FF6A13;
      &::before {
          content: "\f808";
      }
  }
}
[data-category-icon="safe-and-healthy-body"] {
  i {
      background-color: #84BD00;
      &::before {
          content: "\f21e";
      }
  }
}
[data-category-icon="exercise-and-wellbeing"] {
  i {
      background-color: #E03C31;
      &::before {
          content: "\f554";
      }
  }
}
[data-category-icon="arts-and-creativity"] {
  i {
      background-color: #025EA6;
      &::before {
          content: "\f53f";
      }
  }
}
[data-category-icon="food-or-shopping"] {
  i {
      background-color: #328472;
      &::before {
          content: "\f5d1";
      }
  }
}
[data-category-icon="faith-led-activities"] {
  i {
      background-color: #0085CA;
      &::before {
          content: "\f4be";
      }
  }
}
[data-category-icon="money-advice"] {
  i {
      background-color: #81312F;
      &::before {
          content: "\f154";
      }
  }
}
[data-category-icon="employment-advice"] {
  i {
      background-color: #8031A7;
      &::before {
          content: "\f0f2";
      }
  }
}
[data-category-icon="housing-advice"] {
  i {
      background-color: #2B8CC4;
      &::before {
          content: "";
      }
  }
}
[data-category-icon="immigration-advice"] {
  i {
      background-color: #00664F;
      &::before {
          content: "\f129 ";
      }
  }
}

`;
