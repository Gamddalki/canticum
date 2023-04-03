import Admin from "../../Components/Admin";
import styled from "styled-components";

const Form = styled.form``;

function AdminBg() {
  return (
    <Admin pageSubtitle="대문사진 변경">
      <Form>
        <div>
          <span>대문사진 변경</span>
          <input type="file" accept="image/*"></input>
          <input type="file" accept="image/*"></input>
          <input type="file" accept="image/*"></input>
          <input type="file" accept="image/*"></input>
        </div>
        <div>
          <button>변경</button>
        </div>
      </Form>
    </Admin>
  );
}

export default AdminBg;
