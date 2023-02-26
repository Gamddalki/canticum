import styled from "styled-components";
import logo from "../img/logo.gif";

const Nav = styled.nav`
  background-color: ${(props) => props.theme.headerColor};
  color: ${(props) => props.theme.bgColor};
  font-weight: 600;
  font-size: 16px;
`;
const Col = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
  width: 600px;
  justify-content: space-between;
`;

const Item = styled.li``;

function Header() {
  return (
    <Nav>
      <Col>
        <img src={logo} />
        <Items>
          <Item>칸티쿰합창단</Item>
          <Item>공연안내</Item>
          <Item>단원모집</Item>
          <Item>자료실</Item>
          <Item>후원</Item>
        </Items>
        <div></div>
      </Col>
    </Nav>
  );
}

export default Header;
