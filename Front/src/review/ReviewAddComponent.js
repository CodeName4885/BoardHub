import React, { useState } from 'react';
import { Editor } from '../upload/Editor';

export function ReviewAddComponent() {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('1');
    const [editorContent, setEditorContent] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // 서버에 이미지 경로가 포함된 내용을 전송
            const response = await fetch('http://localhost:8080/add/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title,
                    category: category,
                    content: editorContent, // 수정: editorContent로 변경
                }),
            });

            // ...
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
                onChange={(event) => setTitle(event.target.value)}
            />

            <select
                id="category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
            >
                <option value="1">리뷰</option>
                <option value="2">프리뷰</option>
                <option value="3">모임</option>
            </select>
            <Editor onChange={setEditorContent} />
            <button type="submit" onClick={handleSubmit} style={{ marginTop: '50px' }}>Submit</button>
        </form>
    );
}
