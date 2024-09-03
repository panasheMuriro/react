import styled from "styled-components";
import { Colors } from "../Colors";

export const StyledCard = styled.div`
min-height: 120px;
width:  100%;
border-radius: 15px;
border: solid 1px ${Colors.GREY_SECONDARY};
/* box-shadow: 2px 1px 3px ${Colors.GREY_SECONDARY}; */
/* box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
 */
display: grid;
grid-template-columns: 15% 85%;
box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
margin: 10px 0;
/* box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); */

`;


export const StyledCardLabel = styled.div`
width: 45px;
min-height: 50px;
border-radius: 15px 0 0 15px;
position: relative; 
display: flex;
align-items: center;
justify-content: center;
`;



// export const StyledCardLabelInner = styled.div`
// min-height:120px;
// min-width: 30px;
// background-color: red;
// transform: rotate(90deg);
// /* position:"absolute"; */
// /* transform-origin: 15 0; */
// white-space: nowrap;
// top: 0;
// /* display: flex;
// align-items: center;
// justify-content: center; */
// font-family: "StolzlBook";

// `

