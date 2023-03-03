import BodyWrapper from "../../Components/BodyWrapper";
import { useTranslation } from "react-i18next";

function About() {
  const { t, i18n } = useTranslation("about");
  return (
    <>
      <BodyWrapper
        pageTitle={t("pagetitle")}
        pageSubtitle={t("pagesubtitle")}
        pageTxt={t("pagetxt")}
      >
        <div>하잉</div>
      </BodyWrapper>
    </>
  );
}

export default About;
