import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { PaginationComponent } from "../paging/PaginationComponent";

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
        default:
            return '';
    }
}

export function ReviewListComponent() {
    const [reviewList, setReviewList] = useState([]);
    const [totalItemsCount, setTotalItemsCount] = useState(0);
    const [blog, setBlog] = useState([]);
    const navigate = useNavigate();
    const [userNickname, setUserNickname] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(15); // 페이지당 아이템 수

    // 페이지별 데이터 상태 추가
    const [pagedData, setPagedData] = useState([]);

    // 데이터를 가져오고 페이지네이션 관련 상태 초기화
    const getReviewList = async () => {
        try {
            const resp = await axios.get('http://localhost:8080/show/reviewsList');
            setReviewList(resp.data);
            setTotalItemsCount(resp.data.length);
            setCurrentPage(1); // 페이지를 첫 번째 페이지로 초기화
        } catch (error) {
            console.error("데이터 못불러왕~! : ", error);
        }
    }

    const getUserData = async (user_id) => {
        try {
            const userResp = await axios.get(`http://localhost:8080/show/${user_id}`);
            setUserNickname(userResp.data.nickname);
        } catch (error) {

        }
    }


    useEffect(() => {
        getReviewList();
    }, []);

    // 페이지 변경 시 호출되는 함수
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const pagedDataSlice = reviewList.slice(startIndex, endIndex);
        setPagedData(pagedDataSlice);

        // 페이지별 데이터 업데이트 후 사용자 데이터를 가져옵니다.
        if (pagedDataSlice.length > 0) {
            const user_ids = pagedDataSlice.map((review) => review.user_id);
            user_ids.forEach((user_id) => getUserData(user_id));
        }
    }, [currentPage, pageSize, reviewList]);

    useEffect(() => {
        if (reviewList.length > 0) {
            const user_ids = reviewList.map((review) => review.user_id);
            user_ids.forEach((user_id) => getUserData(user_id));
        }
    }, [reviewList]);

    useEffect(() => {
        axios.get(`http://localhost:8080/show/blog`)
            .then((res) => {
                console.log("Response: ", res);
                setBlog(res.data);
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    }, []);

    return (
        <div className="app">
            <p className="solution-content">공략 글</p>
            <button className="add-button" onClick={() => navigate("/review/add")}>
                글 작성하기
            </button>
            <div className="center-table">
                <table className="table table-dark table-striped">
                    <thead>
                    <tr className="row-tr">
                        <th>Title</th>
                        <th>Content</th>
                    </tr>
                    </thead>
                    <tbody>
                    {blog.slice(0, 5).map((item, index) => (
                        <tr key={index}>
                            <td className="recent-review-game-title" dangerouslySetInnerHTML={{ __html: item.title }} />
                            <td>
                                <a
                                    href={item.link}
                                    className="recent-review-coment"
                                    dangerouslySetInnerHTML={{ __html: item.description }}
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
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
                    {pagedData.map((review, index) => (
                        <tr key={index}>
                            <th scope="row" className="category-box">
                                {getCategoryText(review.category)}
                            </th>
                            <td
                                onClick={(event) => {
                                    if (event.target.tagName === "TD") {
                                        navigate(`/review/detail/${review.comm_id}`);
                                    }
                                }}
                                style={{ cursor: 'pointer' }}
                            >
                                {review.title}
                            </td>
                            <td>{review.count}</td>
                            <td>{userNickname}</td>
                            <td>{review.likes}</td>
                            <td>{formatDate(review.regdate)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <PaginationComponent
                    activePage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}
