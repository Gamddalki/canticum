import BodyWrapper from "../Components/BodyWrapper";
import { useTranslation } from "react-i18next";

function Recruitment() {
  const { t, i18n } = useTranslation("recruitment");
  return (
    <>
      <BodyWrapper
        pageTitle={t("pagetitle")}
        pageSubtitle={t("pagesubtitle")}
        pageTxt={t("pagetxt")}
      >
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSctyP7-foFim536aZaju-irOeK5hXiXEP20BO6EXJEKz8vhKQ/viewform?embedded=true"
          width="100%"
          height="1000"
          frameBorder={0}
          marginHeight={0}
          marginWidth={0}
        >
          로드 중…
        </iframe>
      </BodyWrapper>
    </>
  );
}

export default Recruitment;
