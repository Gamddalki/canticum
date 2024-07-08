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
  width: 750px;
  justify-content: space-between;
`;

const Li = styled.li`
  position: relative;
  padding: 21px 35px;
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
  &:hover ul {
    display: block;
  }
`;

const Items = styled.ul`
  display: none;
  position: absolute;
  top: 60px;
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
              <Link to="/admin/video">
                <Li>대표영상</Li>
              </Link>
              <Link to="/admin/popup">
                <Li>팝업영상</Li>
              </Link>
              <Li>
                공연안내
                <Items>
                  <Link to="/admin/concert">
                    <Item>작성</Item>
                  </Link>
                  <Link to="/admin/view/concert">
                    <Item>삭제</Item>
                  </Link>
                </Items>
              </Li>
              <Li>
                소식지
                <Items>
                  <Link to="/admin/newsletter">
                    <Item>작성</Item>
                  </Link>
                  <Link to="/admin/view/newsletter">
                    <Item>삭제</Item>
                  </Link>
                </Items>
              </Li>
              <Li>
                공지사항
                <Items>
                  <Link to="/admin/notice">
                    <Item>작성</Item>
                  </Link>
                  <Link to="/admin/view/notice">
                    <Item>삭제</Item>
                  </Link>
                </Items>
              </Li>
            </Ul>
          </Nav>
        </Col>
        <FormOutline>{children}</FormOutline>
      </>
    </BodyWrapper>
  );
}

export default Admin;
