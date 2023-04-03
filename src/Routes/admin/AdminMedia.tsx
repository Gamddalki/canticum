import Admin from "../../Components/Admin";
import styled from "styled-components";

const Form = styled.form`
  div {
    width: 700px;
    padding: 30px;
  }
`;
function AdminMedia() {
  return (
    <Admin pageSubtitle="자료실 업로드">
      <Form>
        <div>
          <span>대표사진 업로드</span>
          <input type="file" accept="image/*" required multiple></input>
          <input placeholder="구글드라이브 링크" required></input>
        </div>
        <div>
          <button>업로드</button>
        </div>
      </Form>
    </Admin>
  );
}

export default AdminMedia;
