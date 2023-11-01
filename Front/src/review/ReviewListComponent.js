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
    const [userNickname, setUserNickname] = useState('');

    const addReviewButton = () => {
        navigate("/review/add");
    }
    const getReviewList = async () => {
        try {
            const resp = await axios.get('http://localhost:8080/show/reviewsList');
            setReviewList(resp.data);
        } catch (error) {
            console.error("데이터 못불러왕~! : ", error);
        }
    }

    const getUserData = async (user_id) => {
        try {
            const userResp = await axios.get(`http://localhost:8080/show/${user_id}`);
            console.log(userResp.data.nickname);
            setUserNickname(userResp.data.nickname);
        } catch (error) {
            console.error("닉네임 가져오는 도중 오류 발생: ", error);
        }
    }

    useEffect(() => {
        getReviewList();
    }, []);

    useEffect(() => {
        if (reviewList.length > 0) {
            const user_ids = reviewList.map((review) => review.user_id);
            user_ids.forEach((user_id) => getUserData(user_id));
        }
    }, [reviewList]);

    return (
        <div className="app">
            <p className="solution-content">공략 글</p>
            <button className="add-button" onClick={addReviewButton}>글 작성하기</button>
            <div className="center-table">
                <table className="table table-dark table-striped">
                    <thead>
                    <tr className="row-tr">
                        <th>#</th>
                        <th>Title</th>
                        <th>조회수</th>
                        <th>작성자</th>
                        <th>추천수</th>
                        <th>작성일</th>
                    </tr>
                    </thead>
                    <tbody>
                    {reviewList.map((review, index) => (
                        <tr key={index}>
                            <th scope="row" className="category-box">{getCategoryText(review.category)}</th>
                            <td onClick={(event) => {
                                if (event.target.tagName === "TD") {
                                    navigate(`/review/detail/${review.comm_id}`);
                                }
                            }} style={{ cursor: 'pointer' }}>{review.title}</td>
                            <td>{review.count}</td>
                            <td>{userNickname}</td>
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
