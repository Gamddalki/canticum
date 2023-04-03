import Admin from "../../Components/Admin";
import styled from "styled-components";

const Form = styled.form`
  div {
    width: 700px;
    padding: 30px;
  }
`;
function AdminNewsletter() {
  return (
    <Admin pageSubtitle="소식지 업로드">
      <Form>
        <input></input>
      </Form>
    </Admin>
  );
}

export default AdminNewsletter;
