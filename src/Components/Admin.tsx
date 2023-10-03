import BodyWrapper from "./BodyWrapper";
import { Link } from "react-router-dom";
import styled from "styled-components";

type AdminProps = {
  pageSubtitle: string;
  children: React.ReactChild;
};

const Col = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.headerColor};
  color: ${(props) => props.theme.headertextColor};
  font-weight: 500;
  font-size: 15px;
  height: 60px;
  border-radius: 15px;
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
  }
`;

const FormOutline = styled.div`
  padding-top: 30px;
  span {
    font-weight: 500;
    font-size: 20px;
  }
  input {
    display: block;
    height: 40px;
    width: 100%;
    margin: 10px;
    border: none;
    border-radius: 10px;
    padding: 10px;
  }
  textarea {
    display: block;
    height: 500px;
    width: 100%;
    margin: 10px;
    border: none;
    border-radius: 10px;
    padding: 10px;
    resize: none;
  }
`;

function Admin({ pageSubtitle, children }: AdminProps) {
  return (
    <BodyWrapper pageTitle={"어드민"} pageSubtitle={pageSubtitle} pageTxt={""}>
      <>
        <Col>
          <Nav>
            <Ul>
              <Link to="/admin/background">
                <Li>대문사진</Li>
              </Link>
              <Link to="/admin/concert">
                <Li>공연안내</Li>
              </Link>
              <Link to="/admin/newsletter">
                <Li>소식지</Li>
              </Link>
              <Link to="/admin/media">
                <Li>자료실</Li>
              </Link>
            </Ul>
          </Nav>
        </Col>
        <FormOutline>{children}</FormOutline>
      </>
    </BodyWrapper>
  );
}

export default Admin;
