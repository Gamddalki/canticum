import styled from "styled-components";

type BodyWrapperProps = {
  pageTitle: string;
  pageSubtitle: string;
  pageTxt: string;
  children: React.ReactChild;
};

const MainContents = styled.div`
  max-width: 952px;
  margin: 0 auto;
  padding: 182px 0px;
  div {
    margin: 0 auto;
  }
`;

const PageTitle = styled.div`
  display: block;
  em {
    font-weight: bold;
    font-size: 35px;
    line-height: 52px;
  }
  h6 {
    margin-top: 3px;
    font-size: 23px;
    line-height: 52px;
    display: block;
  }
  span {
    margin-top: 35px;
    font-size: 15px;
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
