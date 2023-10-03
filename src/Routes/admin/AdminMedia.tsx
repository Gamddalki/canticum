import Admin from "../../Components/Admin";
import Form from "../../Components/Form";
import styled from "styled-components";

function AdminMedia() {
  return (
    <Admin pageSubtitle="자료실 업로드">
      <Form>
        <div>
          <span>자료 정보</span>
          <p>제시된 형식에 맞추어 작성해주세요.</p>
          <p>한글 자료 정보</p>
          <input
            placeholder="한글 자료명 (형식: 칸티쿰합창단 제34회 정기 연주회 영상)"
            required
          ></input>
          <p>영문 공연 정보</p>
          <input
            placeholder="영문 자료명 (형식: Canticum Choir 34th Concert Video)"
            required
          ></input>
        </div>
        <div>
          <span>대표사진 업로드</span>
          <p>홈페이지에 노출될 대표사진을 업로드해주세요.</p>
          <input type="file" accept="image/*" required multiple></input>
        </div>
        <div>
          <span>구글드라이브 링크 업로드</span>
          <input placeholder="구글드라이브 링크" required></input>
        </div>
        <div>
          <button id="mediaForm">업로드</button>
        </div>
      </Form>
    </Admin>
  );
}

export default AdminMedia;
