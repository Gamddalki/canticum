import styled from "styled-components";

const Form = styled.form`
  div {
    width: 700px;
    padding: 30px;
  }
  span {
    font-size: 20pt;
    padding: 5px;
    color: ${(props) => props.theme.footerColor};
    background-color: ${(props) => props.theme.accentColor};
    font-weight: 600;
  }
  p {
    font-size: 12pt;
    padding-top: 15px;
  }
  img {
    width: 256px;
    height: 144px;
    margin-top: 15px;
  }
`;

export default Form;
