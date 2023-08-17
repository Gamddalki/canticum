import BodyWrapper from "../Components/BodyWrapper";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const IFrameWrapper = styled.div`
  max-width: 740px;
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 10px;
  padding: auto;
`;

function Recruitment() {
  const { t, i18n } = useTranslation("recruitment");
  return (
    <>
      <BodyWrapper
        pageTitle={t("pagetitle")}
        pageSubtitle={t("pagesubtitle")}
        pageTxt={t("pagetxt")}
      >
        <IFrameWrapper>
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSdkQoMXFRpbGnKG-rXgg8IlXs-RbT_mwFCUnX7PP1L463_nEA/viewform?embedded=true"
            width="100%"
            height="2600"
            frameBorder={0}
            marginHeight={0}
            marginWidth={0}
          >
            로딩중...
          </iframe>
        </IFrameWrapper>
      </BodyWrapper>
    </>
  );
}

export default Recruitment;
