import React, {useEffect, useState} from 'react';
import { Editor } from '../upload/Editor';
import { useNavigate } from "react-router-dom";
import "../review/styles.css"
import {Call} from "../UserApiConfig/ApiService";
export function MateAddComponent() {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('1');
    const [editorContent, setEditorContent] = useState(''); // 에디터 내용을 저장할 상태
    const navigate = useNavigate();

    const user_id = sessionStorage.getItem("USER_ID");
    const token = localStorage.getItem("ACCESS_TOKEN");
    const socialtoken = sessionStorage.getItem("TOKEN");
    const [userData, setUserData] = useState(null);
    console.log(userData);
    useEffect(() => {
        if (token !== null) {
            Call("/mypage", "POST", null)
                .then((response) => {
                    setUserData(response);
                })
                .catch((error) => {
                    console.error("Error fetching data: ", error);
                });
        } else if (socialtoken !== null) {
            const email = sessionStorage.getItem("USER_EMAIL");
            Call("/socialmypage", "POST", email)
                .then((response) => {
                    setUserData(response);
                })
                .catch((error) => {
                    console.error("Error fetching data: ", error);
                });
        }
    }, [token, socialtoken]);


    const cancleButton = () => {
        navigate("/mate/list");
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
            const response = await fetch('http://localhost:8080/add/mate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title,
                    category: category,
                    content: editorContent, // 에디터 내용을 전송
                    user_id: userData.user_id,
                }),
            });

            // 서버 응답 처리 코드 추가
            if (response.ok) {
                navigate("/mate/list");
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
                <option value="1">서울</option>
                <option value="2">경기</option>
                <option value="3">부산</option>
                <option value="4">대구</option>
                <option value="5">인천</option>
                <option value="6">대전</option>
                <option value="7">광주</option>
                <option value="8">울산</option>
                <option value="9">세종</option>
                <option value="10">충청북도</option>
                <option value="11">충청남도</option>
                <option value="12">전라북도</option>
                <option value="13">전라남도</option>
                <option value="14">경상북도</option>
                <option value="15">경상남도</option>
                <option value="16">제주</option>
            </select>
            <button className="add-button" type="submit" onClick={handleSubmit} style={{ marginTop: '50px' }}>Submit</button>
            <button className="cancle-button" type="button" onClick={cancleButton}>cancle</button>
        </form>
    );
}
