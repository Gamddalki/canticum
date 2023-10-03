import Admin from "../../Components/Admin";
import Form from "../../Components/Form";

function AdminConcert() {
  return (
    <Admin pageSubtitle="공연안내 업로드">
      <Form>
        <div>
          <span>공연 정보</span>
          <p>제시된 형식에 맞추어 작성해주세요.</p>
          <p>한글 공연 정보</p>
          <input
            placeholder="한글 공연명 (형식: 칸티쿰합창단 제34회 정기 연주회)"
            required
          ></input>
          <input
            placeholder="한글 공연일시 (형식: 2023년 5월 30일)"
            required
          ></input>
          <p>영문 공연 정보</p>
          <input
            placeholder="영문 공연명 (형식: Canticum Choir 34th Concert)"
            required
          ></input>
          <input
            placeholder="영문 공연일시 (형식: May 30th, 2023)"
            required
          ></input>
        </div>
        <div>
          <span>공연 포스터</span>
          <p>
            !! 파일 선택 순으로 업로드 되므로, 업로드 순서에 주의해주세요 !!
          </p>
          <input
            type="file"
            accept="image/*"
            placeholder="공연포스터"
            required
            multiple
          ></input>
        </div>
        <div>
          <button id="concertForm">업로드</button>
        </div>
      </Form>
    </Admin>
  );
}

export default AdminConcert;
