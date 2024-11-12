import styled from "styled-components";

type ButtonProps = {
    primary?: any;
    secondary?: any;
    muted?: any
}

const Button = styled.button<ButtonProps>`
height: 45px;
border-radius: 10px;
border: none;
padding: 0 20px;
font-family: "StolzlBook";
font-size: 12px;
justify-content: center;
align-items: center;
${props => props.muted && `background-color: #E8E8E899; color: #606060`}
`;

export const PrimaryButton = styled(Button)`
background-color: #008080;
color: white;
width: 100%
`;

export const SecondaryButton = styled(Button)`
background-color: #00808033;
color: #008080;
`;

export const MutedButton = styled(Button)`
background-color: #E8E8E899;
color: #606060;
`;

export const TextButton = styled(Button)`
background-color: #fff;
color: #606060;
`;


