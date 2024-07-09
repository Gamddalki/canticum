import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Admin from "../../Components/Admin";
import Form from "../../Components/Form";
import styled from "styled-components";
import axios from "axios";

const FileList = styled.ul`
  margin-top: 10px;
  margin-left: 20px;
`;

const FileListItem = styled.li`
  margin: 5px 0;
`;

const RemoveButton = styled.p`
  cursor: pointer;
  margin-left: 10px;
  color: red;
  display: inline;
`;

type existingFile = {
  id: number;
  filename: string;
  filepath: string;
  type: string;
  code: string;
};

function AdminNotice() {
  const { code } = useParams();
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [mainText, setMainText] = useState("");

  useEffect(() => {
    const fetchNewsData = async () => {
      if (code) {
        const imgId = code.slice(-6);
        try {
          const textResponse = await axios.get(`/api/texts/noti/${code}`);
          setTitle(textResponse.data.kortit);
          setMainText(textResponse.data.engtit);

          try {
            const imageResponse = await axios.get(`/api/images/noti/${imgId}`);
            console.log("Received image data", imageResponse);

            if (
              imageResponse &&
              imageResponse.data &&
              Array.isArray(imageResponse.data)
            ) {
              const filepaths = imageResponse.data.map(
                (file: existingFile) => file.filepath
              );
              setFileNames(filepaths);
            } else {
              console.log(
                "No image data found or imageResponse is not in expected format"
              );
            }
          } catch (imageError) {
            console.log("Failed to fetch images data", imageError);
          }
        } catch (error) {
          console.error("Failed to fetch news data", error);
        }
      }
    };
    fetchNewsData();

    // 컴포넌트가 언마운트될 때 상태를 초기화하는 클린업 함수
    return () => {
      setTitle("");
      setMainText("");
      setSelectedFiles([]);
      setFileNames([]);
    };
  }, [code]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newSelectedFiles = Array.from(files);
      const newFileNames = newSelectedFiles.map((file) => file.name);
      setFileNames((prevFileNames) => [...prevFileNames, ...newFileNames]);
      setSelectedFiles((prevSelectedFiles) => [
        ...prevSelectedFiles,
        ...newSelectedFiles,
      ]);
    }
  };

  const handleRemoveFile = (fileName: string) => {
    setFileNames((prevFileNames) =>
      prevFileNames.filter((name) => name !== fileName)
    );
    setSelectedFiles((prevSelectedFiles) =>
      prevSelectedFiles.filter((file) => file.name !== fileName)
    );
  };

  const generateCode = () => {
    // 코드 생성 로직
    const date = new Date();
    const code =
      "a" +
      ("0" + date.getHours()).slice(-2) +
      ("0" + date.getMinutes()).slice(-2) +
      ("0" + date.getSeconds()).slice(-2) +
      date.getFullYear().toString().slice(2) +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      ("0" + date.getDate()).slice(-2);
    return code;
  };

  const uploadFile = async (id: number, selectedFile: File, code: string) => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const encodedFileName = encodeURIComponent(selectedFile.name);
      await axios.post(
        `/api/uploads-notice/${encodedFileName}/${code}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("File uploaded successfully!");
    } catch (error) {
      console.error("File upload failed", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mainText.length > 2000) {
      alert("본문은 2000자 이내로 작성해야 합니다.");
      return;
    }

    const code = generateCode();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("mainText", mainText);
    formData.append("type", "noti");
    formData.append("code", code);

    const allFiles = Object.values(selectedFiles)
      .flat()
      .filter(Boolean) as File[];
    try {
      await Promise.all(
        allFiles.map((file, index) => uploadFile(index, file, code))
      );

      const payload = {
        title,
        mainText,
        type: "noti",
        code: code,
      };
      const apiUrl = "/api/text-notice";

      try {
        await axios.post(apiUrl, payload);
        console.log("Text uploaded successfully!");
        alert("공지사항이 업로드 되었습니다.");
        window.location.reload();
      } catch (error) {
        console.error("Text upload failed", error);
        alert("공지사항 업로드에 실패하였습니다.");
      }
    } catch (error) {
      console.error("Failed to upload images", error);
      alert("공지사항 업로드에 실패하였습니다.");
    }
  };

  return (
    <Admin pageSubtitle="공지사항 업로드">
      <Form onSubmit={handleSubmit}>
        <div>
          <span>공지사항</span>
          <p>제시된 형식에 맞추어 작성해주세요.</p>
          <p>제목</p>
          <input
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          ></input>
          <p>본문</p>
          <textarea
            placeholder="내용을 입력하세요"
            value={mainText}
            onChange={(e) => setMainText(e.target.value)}
            required
            maxLength={2000}
            style={{ width: "100%", height: "400px" }}
          ></textarea>
        </div>
        <div>
          <span>파일 업로드</span>
          <p>파일 첨부는 필수 사항이 아닙니다.</p>
          <input type="file" multiple onChange={handleFileChange}></input>
          <FileList>
            {fileNames.map((fileName, index) => (
              <FileListItem key={index}>
                {fileName}
                <RemoveButton onClick={() => handleRemoveFile(fileName)}>
                  X
                </RemoveButton>
              </FileListItem>
            ))}
          </FileList>
        </div>
        {code ? (
          <></>
        ) : (
          <div>
            <button id="newsForm">업로드</button>
          </div>
        )}
      </Form>
    </Admin>
  );
}

export default AdminNotice;
