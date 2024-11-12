import { createGlobalStyle } from "styled-components";

import StolzlBold from './StolzlBold.ttf';

export default createGlobalStyle`
    @font-face {
        font-family: 'Stolzl Bold';
        src: local('Stolzl Bold'),
        url(${StolzlBold}) format('truetype');
        /* font-weight: 300; */
        font-style: normal;
    }
`;