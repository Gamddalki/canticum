import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../img/logo.gif";
import LangToggleBtn from "./LangToggleBtn";
import { useTranslation } from "react-i18next";

const Col = styled.div`
  position: fixed;
  width: 100%;
  z-index: 1500;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.headerColor};
  color: ${(props) => props.theme.headertextColor};
  font-weight: 500;
  font-size: 17px;
  height: 65px;
  img {
    margin-left: 20px;
  }
`;

const Nav = styled.nav`
  height: 100%;
  display: flex;
  align-items: center;
`;

const Ul = styled.ul`
  display: flex;
  align-items: center;
  width: 630px;
  justify-content: space-between;
`;

const Li = styled.li`
  position: relative;
  padding: 21px 35px;
  &:hover {
    color: ${(props) => props.theme.accentColor};
    border-top: 2px solid rgba(0, 0, 0, 0);
    border-bottom: 2px solid ${(props) => props.theme.accentColor};
  }
  &:hover ul {
    display: block;
  }
`;

const Items = styled.ul`
  display: none;
  position: absolute;
  top: 64px;
  left: 50%;
  padding: 0;
  background: ${(props) => props.theme.headerColor};
  white-space: nowrap;
  box-sizing: border-box;
  z-index: 100;
  transform: translate(-50%, 0);
`;

const Item = styled.li`
  min-width: 70px;
  padding: 0 20px;
  line-height: 50px;
  font-weight: 100;
  color: ${(props) => props.theme.headertextColor};
  border-bottom: 1px solid ${(props) => props.theme.textColor};
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;

function Header() {
  const { t, i18n } = useTranslation("header");
  return (
    <Col>
      <a href="/">
        <img src={logo} />
      </a>
      <Nav>
        <Ul>
          <Li>
            {t("canticum")}
            <Items>
              <Link to="/about">
                <Item>{t("about")}</Item>
              </Link>
            </Items>
          </Li>
          <Li>
            {t("news")}
            <Items>
              <Link to="/newsletter/concert">
                <Item>{t("concert")}</Item>
              </Link>
              <Link to="/newsletter">
                <Item>{t("newsletter")}</Item>
              </Link>
            </Items>
          </Li>
          <Link to="/recruitment">
            <Li>{t("recruit")}</Li>
          </Link>
          <Link to="/media">
            <Li>{t("media")}</Li>
          </Link>
          <Li>
            {t("donation")}
            <Items>
              <Link to="/sponsor">
                <Item>{t("information")}</Item>
              </Link>
              <Link to="/sponsor/support">
                <Item>{t("support")}</Item>
              </Link>
            </Items>
          </Li>
        </Ul>
      </Nav>
      <div>
        <LangToggleBtn />
      </div>
    </Col>
  );
}

export default Header;
