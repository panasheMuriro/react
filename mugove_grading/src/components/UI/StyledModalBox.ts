import styled, {keyframes} from "styled-components";

export const StyledModaBox = styled.div`
width: 100%;
min-height: 200px;
position: relative;
top: 15vh;
z-index: 4;
border-radius: 10px;
background-color: white;
`;

export const ModalBackground = styled.div`
position: absolute;
background-color: #00000010;
backdrop-filter: blur(3px);
z-index: 5;
top: 0;
left:0;
width: 100vw;
height: 100vh;
`;
