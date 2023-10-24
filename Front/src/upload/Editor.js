import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { storage } from "./FireBase";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";

export function Editor({ onChange }) {
  const quillRef = useRef(); // Define quillRef using the useRef hook

  // Define the imageHandler function here
  const imageHandler = () => {
    console.log("imageHandler called!!!");
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.addEventListener("change", async () => {
      console.log("Input change event triggered!!");
      const editor = quillRef.current.getEditor();
      const file = input.files[0];
      const range = editor.getSelection(true);

      try {
        // Firebase Method: uploadBytes, getDownloadURL
        const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);

        // Insert the image URL into the editor
        editor.insertEmbed(range.index, "image", url);
        editor.setSelection(range.index + 1);

        // Log success
        console.log("Image upload successful. URL: ", url);
      } catch (error) {
        console.error("Image upload failed: ", error);
      }
    });
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ size: [] }],
      [{ font: [] }],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ color: ["red", "#785412"] }],
      [{ background: ["red", "#785412"] }]
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    "image",
    "background",
    "align",
    "size",
    "font"
  ];

  const [code, setCode] = useState('');

  useEffect(() => {
    // 초기화 코드
    setCode(''); // 초기 내용을 빈 문자열로 설정
  }, []);

  const handleProcedureContentChange = (content, delta, source, editor) => {
    setCode(content);
  };

  useEffect(() => {
    onChange(code); // 에디터 내용이 변경될 때 상위 컴포넌트에 변경된 내용 전달
  }, [code, onChange]);

  return (
      <ReactQuill
          style={{ height: '600px' }}
          theme="snow"
          modules={modules}
          formats={formats}
          value={code}
          onChange={handleProcedureContentChange}
          ref={quillRef} // Attach the ref to the ReactQuill component
      />
  );
}
