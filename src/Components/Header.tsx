import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../img/logo.gif";

const Col = styled.div`
  position: fixed;
  width: 100%;
  z-index: 2000;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
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
  padding: 20px 35px;
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
  top: 63px;
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
  return (
    <Col>
      <a href="/">
        <img src={logo} />
      </a>
      <Nav>
        <Ul>
          <Li>
            칸티쿰합창단
            <Items>
              <Link to="/about">
                <Item>합창단소개</Item>
              </Link>
              <Link to="/about/members">
                <Item>단원소개</Item>
              </Link>
            </Items>
          </Li>
          <Li>
            소식
            <Items>
              <Link to="/newsletter/concert">
                <Item>공연안내</Item>
              </Link>
              <Link to="/newsletter">
                <Item>소식지</Item>
              </Link>
            </Items>
          </Li>
          <Link to="/recruitment">
            <Li>단원모집</Li>
          </Link>
          <Link to="/media">
            <Li>자료실</Li>
          </Link>
          <Li>
            후원
            <Items>
              <Link to="/sponsor">
                <Item>후원안내</Item>
              </Link>
              <Link to="/sponsor/support">
                <Item>후원신청</Item>
              </Link>
            </Items>
          </Li>
        </Ul>
      </Nav>
      <div></div>
    </Col>
  );
}

export default Header;
