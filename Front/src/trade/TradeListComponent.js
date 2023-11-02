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
            return '판매';
        case 2:
            return '구매';
        case 3:
            return '완료';
        default:
            return '';
    }
}

export function TradeListComponent() {
    const [tradeList, setTradeList] = useState([]);
    const [totalItemsCount, setTotalItemsCount] = useState(0);
    const navigate = useNavigate();
    const [userNickname, setUserNickname] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(15); // 페이지당 아이템 수

    const [pagedData, setPagedData] = useState([]);

    // 페이지 변경 시 호출되는 함수
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const addTradeButton = () => {
        navigate("/trade/add");
    }

    const getTradeList = async () => {
        try {
            const resp = await axios.get('http://localhost:8080/show/tradeList');
            setTradeList(resp.data); // 서버에서 받은 데이터를 상태로 설정
            setTotalItemsCount(resp.data.length);
        } catch (error) {
            console.error("데이터 못불러왕~! : ", error);
        }
    }

    const getUserData = async (user_id) => {
        try {
            const userResp = await axios.get(`http://localhost:8080/show/${user_id}`);
            setUserNickname(userResp.data.nickname);
        } catch (error) {
            console.error("닉네임 가져오는 도중 오류 발생: ", error);
        }
    }

    useEffect(() => {
        getTradeList(); // 컴포넌트가 마운트될 때 데이터를 가져오도록 설정
    }, []); // 빈 배열을 전달하여 한 번만 실행되도록 설정

    useEffect(() => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        setPagedData(tradeList.slice(startIndex, endIndex));

        // 페이지별 데이터 업데이트 후 사용자 데이터를 가져옵니다.
        if (pagedData.length > 0) {
            const user_ids = pagedData.map((trade) => trade.user_id);
            user_ids.forEach((user_id) => getUserData(user_id));
        }
    }, [currentPage, pageSize, tradeList, pagedData]);

    useEffect(() => {
        if (tradeList.length > 0) {
            const user_ids = tradeList.map((trade) => trade.user_id);
            user_ids.forEach((user_id) => getUserData(user_id));
        }
    }, [tradeList]);

    return (
        <div className="app">
            <p className="solution-content">거래 글</p>
            <button className="add-button" onClick={addTradeButton}>글 작성하기</button>
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
                    {pagedData.map((trade, index) => (
                        <tr key={index}>
                            <th scope="row" className="category-box">{getCategoryText(trade.category)}</th>
                            <td onClick={(event) => {
                                if (event.target.tagName === "TD") {
                                    navigate(`/trade/detail/${trade.comm_id}`);
                                }
                            }} style={{ cursor: 'pointer' }}>{trade.title}</td>
                            <td>{trade.count}</td>
                            <td>{userNickname}</td>
                            <td>{trade.likes}</td>
                            <td>{formatDate(trade.regdate)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <PaginationComponent
                    activePage={currentPage}
                    onPageChange={handlePageChange}
                    itemsCountPerPage={pageSize}
                    totalItemsCount={totalItemsCount}
                />
            </div>
        </div>
    );
}
