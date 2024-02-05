import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAmericas } from "@fortawesome/free-solid-svg-icons";
import { isEngAtom } from "../atoms";
import { useRecoilState } from "recoil";

const ToggleBtn = styled.button`
  margin-right: 20px;
  background-color: transparent;
  border: none;
  color: white;
  font-size: 12px;
`;

function LangToggleBtn() {
  const { t, i18n } = useTranslation("header");

  const [isEng, setEngAtom] = useRecoilState(isEngAtom);

  const toggleEngAtom = () => {
    toggleLanguage();
    setEngAtom((prev) => !prev);
    console.log(isEng);
  };

  const toggleLanguage = () => {
    var locale = isEng ? "co-KR" : "en-US";
    i18n.changeLanguage(locale);
  };

  return (
    <ToggleBtn onClick={() => toggleEngAtom()}>
      <FontAwesomeIcon icon={faEarthAmericas} size="1x" />
      <span> {t("lang")}</span>
    </ToggleBtn>
  );
}

export default LangToggleBtn;
