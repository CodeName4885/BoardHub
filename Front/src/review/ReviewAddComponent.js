import React, { useState } from 'react';
import { CkEditor } from "../upload/CkEditor";

export function ReviewAddComponent() {
    const [editorData, setEditorData] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('1');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/add/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: editorData,
                    title: title,
                    category: category,
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
            <CkEditor editorData={editorData} setEditorData={setEditorData} />
            <select
                id="category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
            >
                <option value="1">리뷰</option>
                <option value="2">프리뷰</option>
                <option value="3">모임</option>
            </select>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
    );
}
