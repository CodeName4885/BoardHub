import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

export function ReviewAddComponent() {
    const [image, setImage] = useState(null);

    const imageHandler = () => {
        console.log('에디터에서 이미지 버튼 클릭 !!');
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = () => {
            const file = input.files[0];
            if (file) {
                // 이미지를 상태에 설정
                setImage(file);
            }
        };
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (image) {
            const formData = new FormData();
            formData.append('image', image);

            axios.post('http://localhost:8080/uploadFile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(() => {
                alert('이미지 업로드 및 저장 완료');
                // 이미지를 업로드한 후 상태 초기화
                setImage(null);
            }).catch(error => {
                alert('이미지 업로드 실패');
                console.error(error);
            });
        } else {
            alert('이미지를 먼저 선택해주세요');
        }
    }

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ size: [] }],
            [{ font: [] }],
            [{ align: ['right', 'center', 'justify'] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'], // 이미지 삽입 버튼 추가
            [{ color: ['red', '#785412'] }],
            [{ background: ['red', '#785412'] }],
        ],
    };

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'link',
        'color',
        'image',
        'background',
        'align',
        'size',
        'font',
    ];

    return (
        <form onSubmit={handleFormSubmit}>
            <input
                type="text"
                placeholder="제목"
                name="title"
            />

            <select id="category">
                <option value="1">리뷰</option>
                <option value="2">프리뷰</option>
                <option value="3">모임</option>
            </select>
            <ReactQuill
                ref = {quillRef}
                onChange={setHtml}
                modules={modules}
                formats={formats}

                style={{ height: '600px' }}
                theme="snow"
            />
            <button type="submit">Submit</button>
        </form>
    );
}
