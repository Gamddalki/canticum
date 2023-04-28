import styled from "styled-components";
import { Link } from "react-router-dom";

type ConcertCardProps = {
  linkto: string;
  imgsrc: string;
  contitle: string;
  conwhen: string;
};

const ConCard = styled.div`
  background: ${(props) => props.theme.footerColor};
  margin-bottom: 70px;
  padding: 12px;
  border-radius: 10px;
  max-width: 300px;
  height: 500px;
  text-align: center;
`;

const ConImg = styled.img`
  max-width: 270px;
  width: 100%;
  margin-bottom: 20px;
  border-radius: 10px;
`;

const Contxt = styled.div`
  text-align: center;
  color: white;
  h5 {
    font-size: 18px;
    margin-bottom: 3px;
  }
  span {
    font-size: 13px;
  }
`;

function ConcertCard({ linkto, imgsrc, contitle, conwhen }: ConcertCardProps) {
  return (
    <>
      <ConCard>
        <Link to={linkto}>
          <ConImg src={imgsrc} />
          <Contxt>
            <h5>{contitle}</h5>
            <span>{conwhen}</span>
          </Contxt>{" "}
        </Link>
      </ConCard>
    </>
  );
}

export default ConcertCard;
