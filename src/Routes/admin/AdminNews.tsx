import Admin from "../../Components/Admin";
import Form from "../../Components/Form";

function AdminNewsletter() {
  return (
    <Admin pageSubtitle="소식지 업로드">
      <Form>
        <div>
          <span>소식지 정보</span>
          <p>제시된 형식에 맞추어 작성해주세요.</p>
          <p>한글 소식지 정보</p>
          <input placeholder="한글 소식지명" required></input>
          <input
            placeholder="한글 공연일시 (형식: 2023년 5월)"
            required
          ></input>
          <p>영문 소식지 정보</p>
          <input placeholder="영문 소식지명" required></input>
          <input placeholder="영문 공연일시 (형식: May, 2023)" required></input>
        </div>
        <div>
          <span>소식지 업로드</span>
          <p>
            !! 파일 선택 순으로 업로드 되므로, 업로드 순서에 주의해주세요 !!
          </p>
          <input
            type="file"
            accept="image/*"
            placeholder="소식지"
            required
            multiple
          ></input>
        </div>
        <div>
          <button id="newsForm">업로드</button>
        </div>
      </Form>
    </Admin>
  );
}

export default AdminNewsletter;
