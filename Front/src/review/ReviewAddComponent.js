import React, { useState } from 'react';
import { CkEditor } from "../upload/CkEditor";

export function ReviewAddComponent() {
    const [editorData, setEditorData] = useState(''); // 초기값을 빈 문자열로 설정
    const [title, setTitle] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: editorData, title: title }), // Send content and title
            });
            if (response.ok) {
                // 성공 처리
                console.log('Form submitted successfully.');
            } else {
                // 실패 처리
                console.error('Form submission failed.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form>
            <input
                type="text"
                placeholder="제목"
                name="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)} // 입력 값 변경 시 title 상태 업데이트
            />
            <CkEditor editorData={editorData} setEditorData={setEditorData} />
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
    );
}
