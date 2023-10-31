import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles.css"

function formatDate(rawDate) {
    const date = new Date(rawDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}.${month}.${day}`;
}
function getCategoryText(category) {
    switch (category) {
        case 1:
            return '리뷰';
        case 2:
            return '프리뷰';
        case 3:
            return '모임';
    }
}
export function ReviewListComponent() {
    const [reviewList, setReviewList] = useState([]);
    const navigate = useNavigate();

    const addReviewButton = () => {
        navigate("/review/add");
    }
    const getReviewList = async () => {
        try {
            const resp = await axios.get('http://localhost:8080/show/reviewsList');
            setReviewList(resp.data); // 서버에서 받은 데이터를 상태로 설정
        } catch (error) {
            console.error("데이터 못불러왕~! : ", error);
        }
    }

    useEffect(() => {
        getReviewList(); // 컴포넌트가 마운트될 때 데이터를 가져오도록 설정
    }, []); // 빈 배열을 전달하여 한 번만 실행되도록 설정

    return (
        <div className="App">
            <p className="solution-content">공략 글</p>
            <button className="add-button" onClick={addReviewButton}>글 작성하기</button>
            <div className="center-table">
                <table className="table table-dark table-striped">
                    <thead>
                    <tr className="row-tr">
                        <th>#</th>
                        <th>Title</th>
                        <th>조회수</th>
                        <th>추천수</th>
                        <th>작성일</th>
                    </tr>
                    </thead>
                    <tbody>
                    {reviewList.map((review, index) => (
                        <tr key={index}>
                            <th scope="row" className="category-box">{getCategoryText(review.category)}</th>
                            <td onClick={(event) => {
                               if (event.target.tagName == "TD") {
                                    navigate(`/review/detail/${review.comm_id}`);
                                }
                            }} style={{ cursor: 'pointer' }}>{review.title}</td>
                            <td>{review.count}</td>
                            <td>{review.likes}</td>
                            <td>{formatDate(review.regdate)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
