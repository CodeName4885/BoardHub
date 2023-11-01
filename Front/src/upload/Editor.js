import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { storage } from "./FireBase";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";

export function Editor({ onChange }) {
  const quillRef = useRef();

  const [code, setCode] = useState('');
  const [imageHandlerExecuted, setImageHandlerExecuted] = useState(false);

  const handleProcedureContentChange = (content, delta, source, editor) => {
    setCode(content);

    // Check if an image is inserted
    const insertedOps = delta.ops.filter((op) => op.insert && op.insert.image);

    if (insertedOps.length > 0 && !imageHandlerExecuted) {
      imageHandler();
      setImageHandlerExecuted(true);
    } else if (insertedOps.length === 0) {
      setImageHandlerExecuted(false);
    }

    // Call the onChange prop when the content changes
    onChange(content);
  };

  const formData = new FormData(); // formData 변수를 정의

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    input.addEventListener("change", async () => {
      const editor = quillRef.current.getEditor();
      const file = input.files[0];

      if (file) {
        try {
          const storageRef = ref(storage, `image/${Date.now()}_${file.name}`);

          uploadBytes(storageRef, file)
              .then(async (snapshot) => {
                const url = await getDownloadURL(snapshot.ref); // Get the image URL
                console.log("src : ", url);

                // Get the current cursor position
                const range = editor.getSelection();
                if (range) {
                  // Insert the image at the current cursor position in the editor
                  editor.insertEmbed(range.index, 'image', url);
                } else {
                  // If there's no cursor position, append the image to the end
                  editor.clipboard.dangerouslyPasteHTML(`<img src="${url}" alt=""/>`);
                }

                console.log("Image upload successful. URL: ", url);

                formData.append("file", file); // 이미지를 formData에 추가

                fetch("http://localhost:8080/uploadFile", {
                  method: "POST",
                  body: formData,
                })
                    .then((response) => response.text())
                    .then((data) => {
                      console.log("Server response:", data);

                      // 이미지 URL을 서버로 전송한 후 서버로부터의 응답을 받아올 수 있습니다.
                      // 여기에서 서버 응답을 처리하거나 다른 동작을 수행할 수 있습니다.
                    })
                    .catch((error) => {
                      console.error("Server request failed:", error);
                    });
              })
              .catch((error) => {
                console.error("Image upload failed: ", error);
              });
        } catch (error) {
          console.error("Image upload failed: ", error);
        }
      }
    });

    input.click();
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

  useEffect(() => {
    setCode('');
  }, []);

  useEffect(() => {
    onChange(code);
  }, [code, onChange]);

  return (
      <ReactQuill
          style={{ height: '600px' }}
          theme="snow"
          modules={modules}
          formats={formats}
          value={code}
          onChange={handleProcedureContentChange}
          ref={quillRef}
      />
  );
}