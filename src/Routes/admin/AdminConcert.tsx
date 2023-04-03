import Admin from "../../Components/Admin";
import styled from "styled-components";

const Form = styled.form`
  div {
    width: 700px;
    padding: 30px;
  }
`;

function AdminConcert() {
  return (
    <Admin pageSubtitle="공연안내 업로드">
      <Form>
        <div>
          <span>공연 정보</span>
          <input placeholder="공연명" required></input>
          <input placeholder="공연일시" required></input>
          <input placeholder="공연장소" required></input>
          <input placeholder="공연가격" required></input>
          <input placeholder="문의처" required></input>
        </div>
        <div>
          <span>상세 정보</span>
          <textarea placeholder="기획의도" required></textarea>
          <textarea placeholder="프로그램" required></textarea>
          <textarea placeholder="출연진" required></textarea>
          <input
            type="file"
            accept="image/*"
            placeholder="공연포스터"
            required
            multiple
          ></input>
        </div>
        <div>
          <button>업로드</button>
        </div>
      </Form>
    </Admin>
  );
}

export default AdminConcert;
