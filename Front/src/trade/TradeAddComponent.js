import React, { useState } from 'react';
import { Editor } from '../upload/Editor';
import { useNavigate } from "react-router-dom";
export function TradeAddComponent() {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('1');
    const [editorContent, setEditorContent] = useState(''); // 에디터 내용을 저장할 상태
    const navigate = useNavigate();


    const cancleButton = () => {
        navigate("/trade/list");
    }

    // 에디터 내용 변경 핸들러
    const handleEditorChange = (content) => {
        setEditorContent(content);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // 로그로 입력값 확인
        console.log('Title:', title);
        console.log('Category:', category);
        console.log('Editor Content:', editorContent); // 에디터 내용을 출력

        try {
            // 서버에 이미지 경로가 포함된 내용을 전송
            const response = await fetch('http://localhost:8080/add/trade', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title,
                    category: category,
                    content: editorContent, // 에디터 내용을 전송
                }),
            });

            // 서버 응답 처리 코드 추가
            if (response.ok) {
                navigate("/trade/list");
                console.log('Review data added successfully');
            } else {
                console.error('Error:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form >
            <p className="solution-content">제목</p>
            <input className="add-Title"
                   type="text"
                   placeholder="제목"
                   name="title"
                   value={title}
                   onChange={(event) => setTitle(event.target.value)}
            />
            <Editor
                value={editorContent} // 에디터 내용을 상태로 전달
                onChange={handleEditorChange} // 에디터 내용 변경 핸들러
            />
            <select className="add-select"
                    id="category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
            >
                <option value="1">판매</option>
                <option value="2">구매</option>
                <option value="3">완료</option>
            </select>
            <button className="add-button" type="submit" onClick={handleSubmit} style={{ marginTop: '50px' }}>Submit</button>
            <button className="cancle-button" type="button" onClick={cancleButton}>cancle</button>
        </form>
    );
}
