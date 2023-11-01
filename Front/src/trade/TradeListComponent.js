import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../review/styles.css"

function formatDate(rawDate) {
    const date = new Date(rawDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}.${month}.${day}`;
}
export function TradeListComponent() {
    const [tradeList, setTradeList] = useState([]);
    const navigate = useNavigate();

    function getCategoryText(category) {
        switch (category) {
            case 1:
                return '판매';
            case 2:
                return '구매';
            case 3:
                return '완료';


        }
    }

    const addTradeButton = () => {
        navigate("/trade/add");
    }
    const getTradeList = async () => {
        try {
            const resp = await axios.get('http://localhost:8080/show/tradeList');
            setTradeList(resp.data); // 서버에서 받은 데이터를 상태로 설정
        } catch (error) {
            console.error("데이터 못불러왕~! : ", error);
        }
    }

    useEffect(() => {
        getTradeList(); // 컴포넌트가 마운트될 때 데이터를 가져오도록 설정
    }, []); // 빈 배열을 전달하여 한 번만 실행되도록 설정

    return (
        <div className="app">
            <p className="solution-content">공략 글</p>
            <button className="add-button" onClick={addTradeButton}>글 작성하기</button>
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
                    {tradeList.map((trade, index) => (
                        <tr key={index}>
                            <th scope="row" className="category-box">{getCategoryText(trade.category)}</th>
                            <td onClick={(event) => {
                                if (event.target.tagName == "TD") {
                                    navigate(`/trade/detail/${trade.comm_id}`);
                                }
                            }} style={{ cursor: 'pointer' }}>{trade.title}</td>
                            <td>{trade.count}</td>
                            <td>{trade.likes}</td>
                            <td>{formatDate(trade.regdate)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
