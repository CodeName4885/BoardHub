import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../review/styles.css";
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

export function MateListComponent() {
    const [mateList, setMateList] = useState([]);
    const [totalItemsCount, setTotalItemsCount] = useState(0);
    const navigate = useNavigate();
    const [userNickname, setUserNickname] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(15); // 페이지당 아이템 수

    const [pagedData, setPagedData] = useState([]);

    const addMateButton = () => {
        navigate("/mate/add");
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const getMateList = async () => {
        try {
            const resp = await axios.get('http://localhost:8080/show/mateList');
            setMateList(resp.data);
            setTotalItemsCount(resp.data.length);
        } catch (error) {
            console.error("데이터 못불러왕~! : ", error);
        }
    }

    const getUserData = async (user_id) => {
        try {
            const userResp = await axios.get(`http://localhost:8080/show/user/${user_id}`);
            console.log(userResp.data.nickname);
            setUserNickname(userResp.data.nickname);
        } catch (error) {
            console.error("닉네임 가져오는 도중 오류 발생: ", error);
        }
    }

    useEffect(() => {
        getMateList();
    }, []);

    useEffect(() => {
        if (mateList.length > 0) {
            const startIndex = (currentPage - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const pagedData = mateList.slice(startIndex, endIndex);

            setPagedData(pagedData); // pagedData를 설정
        }
    }, [currentPage, pageSize, mateList]);

    return (
        <div className="app">
            <p className="solution-content">Mate 글</p>
            <button className="add-button" onClick={addMateButton}>글 작성하기</button>
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
                    {pagedData.map((mate, index) => (
                        <tr key={index}>
                            <th scope="row" className="category-box">{mate.category}</th> {/* 카테고리 값 수정 */}
                            <td onClick={(event) => {
                                if (event.target.tagName === "TD") {
                                    navigate(`/mate/detail/${mate.comm_id}`);
                                }
                            }} style={{ cursor: 'pointer' }}>{mate.title}</td>
                            <td>{mate.count}</td>
                            <td>{userNickname}</td>
                            <td>{mate.likes}</td>
                            <td>{formatDate(mate.regdate)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <PaginationComponent
                    activePage={currentPage}
                    itemsCountPerPage={pageSize}
                    totalItemsCount={totalItemsCount}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}
