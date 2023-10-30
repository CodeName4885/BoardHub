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
                return '서울';
            case 2:
                return '경기';
            case 3:
                return '부산';
            case 4:
                return '대구';
            case 5:
                return '인천';
            case 6:
                return '대전';
            case 7:
                return '광주';
            case 8:
                return '울산';
            case 9:
                return '세종';
            case 10:
                return '충청북도';
            case 11:
                return '충청남도';
            case 12:
                return '전라북도';
            case 13:
                return '전라남도';
            case 14:
                return '경상북도';
            case 15:
                return '경상남도';
            case 16:
                return '제주';

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
        <div className="App">
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
                            }} style={{ cursor: 'pointer' }}>{trade.title} (20)</td>
                            <td>3</td>
                            <td>3</td>
                            <td>{formatDate(trade.regdate)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
