import styled from "styled-components"

type ContainerProps = {
  evenly?: boolean
  between?: boolean
  center?: boolean
}

export const FlexRow = styled.div<ContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${props => props.evenly && "justify-content: space-evenly"}
  ${props => props.between && "justify-content: space-between"}
${props => props.center && "justify-content: center"}
`


export const FlexColumn = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  height:100%;
  width: 100%;
  position: inherit;
  justify-content: space-between;
  ${props => props.evenly && "align-items: space-evenly"}
  ${props => props.between && "align-items: space-between"}
${props => props.center && "align-items: center"}
`
