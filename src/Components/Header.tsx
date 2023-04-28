import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../img/logo.png";
import LangToggleBtn from "./LangToggleBtn";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { PC, Mobile } from "../Components/Responsive";
import { useState } from "react";

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
    height: 60px;
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
  z-index: 1000;
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

const MenuBarBtn = styled.button`
  margin-right: 20px;
  background-color: transparent;
  border: solid 1px rgba(225, 225, 225, 0.5);
  width: 30px;
  height: 30px;
  color: white;
  text-align: center;
  align-items: center;
`;

const MenuBar = styled.nav`
  position: absolute;
  top: 64px;
  right: 0%;
  width: 100%;
  height: 100vh;
  padding: 0;
  background: ${(props) => props.theme.footerColor};
  white-space: nowrap;
  box-sizing: border-box;
  z-index: 1800;
  ul {
    width: 100%;
  }
  div {
    position: fixed;
    right: 0;
    bottom: 20px;
  }
`;

const MenuBarUl = styled(Ul)`
  display: block;
  ul {
    margin-top: 15px;
    padding: 0px 20px;
  }
`;

const MenuBarLi = styled(Li)`
  &:hover {
    border-top: none;
    border-bottom: none;
  }
`;

const MenuBarItems = styled(Items)`
  left: 0px;
  top: 0px;
  transform: none;
  position: relative;
`;

function Header() {
  const { t, i18n } = useTranslation("header");
  const [isToggled, setIsToggled] = useState(false);
  return (
    <Col>
      <a href="/">
        <img src={logo} />
      </a>
      <PC>
        <>
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
        </>
      </PC>
      <Mobile>
        <>
          <MenuBarBtn
            onClick={() => {
              setIsToggled((prev) => !prev);
            }}
          >
            {isToggled ? (
              <FontAwesomeIcon icon={faX} size="1x" />
            ) : (
              <FontAwesomeIcon icon={faBars} size="1x" />
            )}
          </MenuBarBtn>
          {isToggled ? (
            <>
              <MenuBar>
                <MenuBarUl>
                  <MenuBarLi>
                    {t("canticum")}
                    <MenuBarItems>
                      <Link
                        to="/about"
                        onClick={() => {
                          setIsToggled(false);
                        }}
                      >
                        <Item>{t("about")}</Item>
                      </Link>
                    </MenuBarItems>
                  </MenuBarLi>
                  <MenuBarLi>
                    {t("news")}
                    <MenuBarItems>
                      <Link
                        to="/newsletter/concert"
                        onClick={() => {
                          setIsToggled(false);
                        }}
                      >
                        <Item>{t("concert")}</Item>
                      </Link>
                      <Link
                        to="/newsletter"
                        onClick={() => {
                          setIsToggled(false);
                        }}
                      >
                        <Item>{t("newsletter")}</Item>
                      </Link>
                    </MenuBarItems>
                  </MenuBarLi>
                  <Link
                    to="/recruitment"
                    onClick={() => {
                      setIsToggled(false);
                    }}
                  >
                    <MenuBarLi>{t("recruit")}</MenuBarLi>
                  </Link>
                  <Link
                    to="/media"
                    onClick={() => {
                      setIsToggled(false);
                    }}
                  >
                    <MenuBarLi>{t("media")}</MenuBarLi>
                  </Link>
                  <MenuBarLi>
                    {t("donation")}
                    <MenuBarItems>
                      <Link
                        to="/sponsor"
                        onClick={() => {
                          setIsToggled(false);
                        }}
                      >
                        <Item>{t("information")}</Item>
                      </Link>
                      <Link
                        to="/sponsor/support"
                        onClick={() => {
                          setIsToggled(false);
                        }}
                      >
                        <Item>{t("support")}</Item>
                      </Link>
                    </MenuBarItems>
                  </MenuBarLi>
                </MenuBarUl>
                <div>
                  <LangToggleBtn />
                </div>
              </MenuBar>
            </>
          ) : (
            <></>
          )}
        </>
      </Mobile>
    </Col>
  );
}

export default Header;
