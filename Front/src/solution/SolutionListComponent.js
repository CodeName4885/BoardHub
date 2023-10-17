import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export function SolutionListComponent() {
    const [playlist, setPlaylist] = useState([]);
    useEffect(() => {
        axios
            .get(
                'https://youtube.googleapis.com/youtube/v3/search?part=snippet&order=rating&maxResults=5&q=board&key=AIzaSyA-maf-Jt5IaKj7r8Xugc14SNxhLB3bGds&type=video'
            )
            .then((res) => {
                console.log(res);
                setPlaylist(res.data.items);
            })
            .catch((error) => {
                console.error('API 요청에 실패했습니다:', error);
            });
    }, []);

    return (
        <div className="App">
            <div className="container">
                {playlist &&
                    playlist.map((i, idx) => (
                        <div className="playlist" key={idx}>
                            <img src={i.snippet.thumbnails.high.url} alt="" />
                            <Link to={"/playlist/" + i.id}>
                                <h1>{i.snippet.title}</h1>
                            </Link>
                            <p>{i.snippet.description}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
}
