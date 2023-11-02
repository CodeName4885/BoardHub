import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./styles.css"
import { useNavigate } from "react-router-dom";
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

export function SolutionListComponent() {
    const [playlist, setPlaylist] = useState([]);
    const API_KEY = 'AIzaSyA-maf-Jt5IaKj7r8Xugc14SNxhLB3bGds';
    const PLAYLIST_ID = 'PLHcUTz5Sl91mLtDdtP-jZGoFPIBij6x70';
    const [solutionList, setSolutionList] = useState([]);
    const [totalItemsCount, setTotalItemsCount] = useState(0);
    const navigate = useNavigate();
    const [userNickname, setUserNickname] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(15); // 페이지당 아이템 수

    // 페이지별 데이터 상태 추가
    const [pagedData, setPagedData] = useState([]);

    const addSolutionButton = () => {
        navigate("/solution/add");
    }

    // 데이터를 가져오고 페이지네이션 관련 상태 초기화
    const getSolutionList = async () => {
        try {
            const resp = await axios.get('http://localhost:8080/show/solutionList');
            setSolutionList(resp.data);
            setTotalItemsCount(resp.data.length);
            setCurrentPage(1); // 페이지를 첫 번째 페이지로 초기화
        } catch (error) {
            console.error("데이터 못불러왕~! : ", error);
        }
    }

    const getUserData = async (user_id) => {
        try {
            const userResp = await axios.get(`http://localhost:8080/show/user/${user_id}`);
            setUserNickname(userResp.data.nickname);
        } catch (error) {
            console.error("닉네임 가져오는 도중 오류 발생: ", error);
        }
    }

    useEffect(() => {
        getSolutionList();
    }, []);

    // 페이지 변경 시 호출되는 함수
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const pagedDataSlice = solutionList.slice(startIndex, endIndex);
        setPagedData(pagedDataSlice);

        // 페이지별 데이터 업데이트 후 사용자 데이터를 가져옵니다.
        if (pagedDataSlice.length > 0) {
            const user_ids = pagedDataSlice.map((solution) => solution.user_id);
            user_ids.forEach((user_id) => getUserData(user_id));
        }
    }, [currentPage, pageSize, solutionList]);


    useEffect(() => {
        if (solutionList.length > 0) {
            const user_ids = solutionList.map((solution) => solution.user_id);
            user_ids.forEach((user_id) => getUserData(user_id));
        }
    }, [solutionList]);

    useEffect(() => {
        axios
            .get(
                `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=12&playlistId=${PLAYLIST_ID}&key=${API_KEY}`
            )
            .then((res) => {
                const items = res.data.items.map(item => {
                    // Split the title at '|', and use the part before the '|' character
                    const titleParts = item.snippet.title.split('|');
                    item.snippet.title = titleParts[0].trim();
                    return item;
                });
                setPlaylist(items);
            })
            .catch((error) => {
                console.error('API 요청에 실패했습니다:', error);
            });
    }, []);

    return (
        <div className="app-solution">
            <p className="video-solution">공략 영상</p>
            <div className="container" style={{ width: '90%', height: '40%' }}>
                <div className="video-list">
                    {playlist &&
                        playlist.map((video, idx) => (
                            <div className="video-item" key={idx}>
                                <iframe
                                    width="250"
                                    height="150"
                                    src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title={video.snippet.title}
                                ></iframe>
                                <p className="video-title">{video.snippet.title}</p>
                            </div>
                        ))}
                </div>
            </div>
            <div className="additional-div">
                <p className="solution-content">공략 글</p>
                <div className="center-table">
                <button className="add-solution-button" onClick={addSolutionButton}>글 작성하기</button>
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
                        {pagedData.map((solution, index) => (
                            <tr key={index}>
                                <th scope="row" className="category-box">{getCategoryText(solution.category)}</th>
                                <td onClick={(event) => {
                                    if (event.target.tagName == "TD") {
                                        navigate(`/solution/detail/${solution.comm_id}`);
                                    }
                                }} style={{ cursor: 'pointer' }}>{solution.title}</td>
                                <td>{solution.count}</td>
                                <td>{userNickname}</td>
                                <td>{solution.likes}</td>
                                <td>{formatDate(solution.regdate)}</td>
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
        </div>
    );
}
