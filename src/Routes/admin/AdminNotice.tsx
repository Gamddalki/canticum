import React, { useState } from "react";
import Admin from "../../Components/Admin";
import Form from "../../Components/Form";
import styled from "styled-components";

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

function AdminNotice() {
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

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
    // Remove the file from the fileNames and fileObjects states
    setFileNames((prevFileNames) =>
      prevFileNames.filter((name) => name !== fileName)
    );
    setSelectedFiles((prevSelectedFiles) =>
      prevSelectedFiles.filter((file) => file.name !== fileName)
    );

    // Update the file input element
    const updatedFiles = new DataTransfer(); // Create a DataTransfer object
    selectedFiles
      .filter((file) => file.name !== fileName)
      .forEach((file) => updatedFiles.items.add(file)); // Add remaining files to DataTransfer
    const inputElement = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    inputElement.files = updatedFiles.files; // Set the new file list
  };

  return (
    <Admin pageSubtitle="공지사항 업로드">
      <Form>
        <div>
          <span>공지사항</span>
          <p>제시된 형식에 맞추어 작성해주세요.</p>
          <p>제목</p>
          <input placeholder="제목을 입력하세요" required></input>
          <p>본문</p>
          <textarea
            placeholder="내용을 입력하세요"
            required
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
        <div>
          <button id="mediaForm">업로드</button>
        </div>
      </Form>
    </Admin>
  );
}

export default AdminNotice;
