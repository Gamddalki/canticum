import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faYoutube,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

const Col = styled.div`
  width: 100%;
  bottom: 0;
  background-color: ${(props) => props.theme.footerColor};
  color: ${(props) => props.theme.headertextColor};
  font-weight: 500;
  font-size: 14px;
  height: 180px;
  text-align: center;
  @media screen and (max-width: 768px) {
    height: 100px;
    font-size: 12px;
  }
  position: relative;
  div {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 130px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transform: translate(-50%, -100%);
  }
  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 100%);
    width: 250px;
  }
`;

const Admin = styled.button`
  width: 10px;
  height: 10px;
  z-index: 1300;
  bottom: 0;
  right: 0;
  position: absolute;
  background-color: rgba(0, 0, 0, 0);
  border: none;
`;

function Footer() {
  return (
    <Col>
      <div>
        <a
          href="https://www.youtube.com/channel/UCFgQ5m607sIIfl4mwSQ_X3Q"
          target={"_blank"}
        >
          <FontAwesomeIcon icon={faYoutube} size="2x" />
        </a>
        <a href="https://www.instagram.com/canticumchoir/" target={"_blank"}>
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
        <a href="https://www.facebook.com/canticum.kr" target={"_blank"}>
          <FontAwesomeIcon icon={faFacebook} size="2x" />
        </a>
      </div>
      <span>&copy; Canticum Choir. All Rights Reserved.</span>
      <Link to="/admin/background">
        <Admin />
      </Link>
    </Col>
  );
}

export default Footer;
