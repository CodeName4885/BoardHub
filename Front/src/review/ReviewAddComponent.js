// ReviewAddComponent.js
import React, { useState } from 'react';
import { Editor } from '../upload/Editor';

export function ReviewAddComponent() {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('1');
    const [editorContent, setEditorContent] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/add/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title,
                    category: category,
                    content: editorContent, // 에디터 내용 추가
                }),
            });
            if (response.ok) {
                console.log('Form submitted successfully.');
            } else {
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
            <Editor onChange={setEditorContent} /> {/* 에디터 컴포넌트를 추가하고 변경된 내용을 전달 */}
            <button type="submit" onClick={handleSubmit} style={{ marginTop: '50px' }}>Submit</button>
        </form>
    );
}
