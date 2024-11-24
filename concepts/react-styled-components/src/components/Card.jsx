import styled from "styled-components";

const CardContainer = styled.div`
  background: ${({ theme }) => theme.cardBg};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
`;

const CardTitle = styled.h2`
  margin: 0;
`;

const CardText = styled.p`
  font-size: 14px;
`;

function Card() {
  return (
    <CardContainer>
      <CardTitle>Themed Card</CardTitle>
      <CardText>This card adjusts based on the current theme!</CardText>
    </CardContainer>
  );
}

export default Card;
