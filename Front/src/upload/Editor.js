import React, { useState, useEffect, useRef, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { storage } from "./FireBase";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";

export function Editor({ onChange }) {
    const [code, setCode] = useState('');
    const quillRef = useRef();
    const editorRef = useRef(); // Quill 에디터 인스턴스를 유지

    useEffect(() => {
        if (quillRef.current) {
            editorRef.current = quillRef.current.getEditor();
        }
    }, [quillRef]);

    const imageHandler = () => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        input.addEventListener("change", async () => {
            const file = input.files[0];
            const editor = editorRef.current;
            const range = editor.getSelection(true);

            if (file) {
                try {
                    const storageRef = ref(storage, `images/${Date.now()}`);
                    const snapshot = await uploadBytes(storageRef, file);
                    const url = await getDownloadURL(snapshot.ref);

                    editor.insertEmbed(range.index, 'image', url);
                    editor.setSelection(range.index + 1);
                } catch (error) {
                    console.error("Image upload failed: ", error);
                }
            }
        });
    };

    const modules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    [{ header: [1, 2, 3, 4, 5, 6, false] },
                        "bold", "italic", "underline", "strike", "blockquote",
                        { list: "ordered" }, { list: "bullet" },
                        "link", "image", "color", "background",
                        { align: ["right", "center", "justify"] },
                        { size: [] }, { font: [] }],
                ],
                handlers: {
                    image: imageHandler,
                },
            },
        };
    }, []); // 빈 배열은 의존성 배열로, 렌더링 시에만 초기화됩니다.

    useEffect(() => {
        onChange(code);
    }, [code, onChange]);

    return (
        <ReactQuill
            style={{ width: '90%', height: '600px', margin: '0 auto', borderRadius: '5px' }}
            theme="snow"
            modules={modules}
            value={code}
            onChange={setCode}
            ref={quillRef}
        />
    );
}
