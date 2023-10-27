import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
export function ReviewListComponent() {
    const [reviewList, setReviewList] = useState([]);
    const navigate = useNavigate();

    const addReviewButton = () => {
        navigate("/review/add");
    }
    const getReviewList = async () => {
        try {
            const resp = await axios.get('http://localhost:8080/show/reviews');
            setReviewList(resp.data); // 서버에서 받은 데이터를 상태로 설정
        } catch (error) {
            console.error("데이터 못불러왕~! : ", error);
        }
    }

    useEffect(() => {
        getReviewList(); // 컴포넌트가 마운트될 때 데이터를 가져오도록 설정
    }, []); // 빈 배열을 전달하여 한 번만 실행되도록 설정

    return (
        <div>
            <button onClick={addReviewButton}>작성하기</button>
            <h2>Review List</h2>
            <ul>
                {reviewList.map((review, index) => (
                    <li key={index}>
                        <h3>{review.title}</h3>
                        <div dangerouslySetInnerHTML={{ __html: review.content }} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
