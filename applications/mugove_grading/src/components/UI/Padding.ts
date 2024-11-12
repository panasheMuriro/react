import styled from "styled-components";


type PaddingProps = {
    noVertical?:boolean,
    noHorizontal?:boolean
}
export const Padding = styled.div<PaddingProps>`
padding: 20px;
${props => props.noVertical && `padding: 0 20px`}
${props => props.noHorizontal && `padding: 20px 0`}
`