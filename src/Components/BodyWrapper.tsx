import styled from "styled-components";

type BodyWrapperProps = {
  pageTitle: string;
  pageSubtitle: string;
  pageTxt: string;
  children: React.ReactChild;
};

const MainContents = styled.div`
  max-width: 992px;
  margin: 0 auto;
  padding: 182px 15px 100px;
  @media screen and (max-width: 768px) {
    padding: 110px 15px 60px;
  }
  div {
    margin: 0 auto;
  }
`;

const PageTitle = styled.div`
  display: block;
  em {
    font-weight: 500;
    font-size: 38px;
    line-height: 52px;
    @media screen and (max-width: 768px) {
      font-size: 30px;
      line-height: 32px;
    }
  }
  h6 {
    margin-top: 3px;
    font-size: 23px;
    line-height: 52px;
    display: block;
    @media screen and (max-width: 768px) {
      font-size: 18px;
      line-height: 32px;
    }
  }
  span {
    margin-top: 35px;
    font-size: 17px;
    line-height: 25px;
    display: block;
    padding-bottom: 30px;
  }
`;

function BodyWrapper({
  pageTitle,
  pageSubtitle,
  pageTxt,
  children,
}: BodyWrapperProps) {
  return (
    <>
      <MainContents>
        <PageTitle>
          <em>{pageTitle}</em>
          <h6>{pageSubtitle}</h6>
          <span>{pageTxt}</span>
        </PageTitle>
        {children}
      </MainContents>
    </>
  );
}

export default BodyWrapper;
