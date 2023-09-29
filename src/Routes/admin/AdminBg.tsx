import React, { useState } from "react";
import Admin from "../../Components/Admin";
import Form from "../../Components/Form";
import bg1 from "../../img/1.jpg";
import bg2 from "../../img/2.jpg";
import bg3 from "../../img/3.jpg";
import bg4 from "../../img/4.jpg";

function AdminBg() {
  const [newBg1, setNewBg1] = useState("");
  const [newBg2, setNewBg2] = useState("");
  const [newBg3, setNewBg3] = useState("");
  const [newBg4, setNewBg4] = useState("");
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const id = e.target.id;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = (finishedE: ProgressEvent<FileReader>) => {
        id == "bg1" && setNewBg1(reader.result as string);
        id == "bg2" && setNewBg2(reader.result as string);
        id == "bg3" && setNewBg3(reader.result as string);
        id == "bg4" && setNewBg4(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <Admin pageSubtitle="대문사진 변경">
      <Form>
        <div>
          <span>대문사진 변경</span>
          <p>변경하실 대문 사진을 업로드하고 변경 버튼을 눌러주세요.</p>
          <p>16:9 비율이 아닌 경우 사진의 위아래가 잘려보일 수 있습니다.</p>
          <img src={newBg1 ? newBg1 : bg1}></img>
          <input
            id="bg1"
            type="file"
            accept="image/*"
            onChange={onFileChange}
          ></input>
          <img src={newBg2 ? newBg2 : bg2}></img>
          <input
            id="bg2"
            type="file"
            accept="image/*"
            onChange={onFileChange}
          ></input>
          <img src={newBg3 ? newBg3 : bg3}></img>
          <input
            id="bg3"
            type="file"
            accept="image/*"
            onChange={onFileChange}
          ></input>
          <img src={newBg4 ? newBg4 : bg4}></img>
          <input
            id="bg4"
            type="file"
            accept="image/*"
            onChange={onFileChange}
          ></input>
        </div>
        <div>
          <button id="bgForm">변경</button>
        </div>
      </Form>
    </Admin>
  );
}

export default AdminBg;
