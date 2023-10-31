import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./styles.css"
import { useNavigate, useParams } from "react-router-dom";

function SolutionListComponent() {
    const [playlist, setPlaylist] = useState([]);
    const API_KEY = 'AIzaSyA-maf-Jt5IaKj7r8Xugc14SNxhLB3bGds';
    const PLAYLIST_ID = 'PLHcUTz5Sl91mLtDdtP-jZGoFPIBij6x70';
    const navigate = useNavigate();
    const [solutionList, setSolutionList] = useState([]);

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
                return '공략';

        }
    }
    const addSolutionButton = () => {
        navigate("/solution/add");
    }
    const getSolutionList = async () => {
        try {
            const resp = await axios.get('http://localhost:8080/show/solutionList');
            setSolutionList(resp.data); // 서버에서 받은 데이터를 상태로 설정
        } catch (error) {
            console.error("데이터 못불러왕~! : ", error);
        }
    }
    useEffect(() => {
        getSolutionList(); // 컴포넌트가 마운트될 때 데이터를 가져오도록 설정
    }, []); // 빈 배열을 전달하여 한 번만 실행되도록 설정


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
        <div className="App">
            <p className="video-solution">공략 영상</p>
            <button className="add-button" onClick={addSolutionButton}>글 작성하기</button>
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
                        {solutionList.map((solution, index) => (
                            <tr key={index}>
                                <th scope="row" className="category-box">{getCategoryText(solution.category)}</th>
                                <td onClick={(event) => {
                                    if (event.target.tagName == "TD") {
                                        navigate(`/solution/detail/${solution.comm_id}`);
                                    }
                                }} style={{ cursor: 'pointer' }}>{solution.title}</td>
                                <td>{solution.count}</td>
                                <td>{solution.likes}</td>
                                <td>{formatDate(solution.regdate)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default SolutionListComponent;
