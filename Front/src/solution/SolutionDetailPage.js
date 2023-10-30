import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Footer } from "../layout/Footer";
import { Header } from "../layout/Header";
import "../static/game-warrior/css/animate.css";
import "../static/game-warrior/css/bootstrap.min.css";
import "../static/game-warrior/css/style.css";
import { useNavigate } from "react-router-dom";
import "../review/styles.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

function formatDate(rawDate) {
    const date = new Date(rawDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}.${month}.${day}`;
}

export function SolutionDetailPage() {
    const [comment, setComment] = useState('');
    const { comm_id } = useParams();
    const [user_id, setUser_id] = useState('1');
    const [review, setReview] = useState({ title: '', content: '' });
    const [comments, setComments] = useState([]); // comments로 수정
    const navigate = useNavigate();
    const [isLiked, setIsLiked] = useState(false);

    function handleLikeClick(reviewId) {
        axios.post(`http://localhost:8080/reviews/like/${comm_id}`)
            .then((response) => {
                if (response.status === 200) {
                    // 좋아요 성공한 경우의 동작
                    setIsLiked(!isLiked);
                    console.log("Liked!");
                } else {
                    // 에러 처리
                    console.error("Error liking the review");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }



    useEffect(() => {
        axios.get(`http://localhost:8080/show/solutionDetail/${comm_id}`)
            .then((res) => {
                console.log("Response: ", res);
                setReview(res.data);
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    }, [comm_id]);

    useEffect(() => {
        axios.get(`http://localhost:8080/show/reviewDetail/reply/${comm_id}`)
            .then((res) => {
                console.log("Response: ", res);
                setComments(res.data); // comments로 수정
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    }, [comm_id]);

    const ReviewList = () => {
        navigate("/solution/list");
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Starting handleSubmit');
        console.log('comm_id:', comm_id);
        console.log('Data:', e);

        const requestBody = {
            comm_id: comm_id,
            content: comment,
            r_group: 1,
            r_step: 1,
            r_level: 1,
            user_id: user_id,
        };

        const response = await fetch(`http://localhost:8080/add/reply/review/${comm_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        console.log('Response status:', response.status);

        if (response.ok) {
            console.log('Comment submitted successfully');
            // 댓글이 성공적으로 저장된 후, 댓글 목록을 다시 불러올 수 있습니다.
            axios.get(`http://localhost:8080/show/reviewDetail/reply/${comm_id}`)
                .then((res) => {
                    setComments(res.data);
                })
                .catch((error) => {
                    console.error("Error fetching comments: ", error);
                });
        } else {
            console.error('Error submitting comment:', response.status, response.statusText);
        }
    };

    return (
        <>
            <Header />

            <div className="board-detail-container">
                <div className="board-detail">
                    <div className="board-title-container">
                        <h2 className="title-name">제목</h2>
                        <h1 className="board-title">{review.title}</h1>
                    </div>

                    <h4 className="date-reg">{formatDate(review.regdate)}</h4>
                    <hr className="board-divider" /> {/* 제목과 내용을 구분하는 선 */}
                    <div
                        className="board-content"
                        dangerouslySetInnerHTML={{ __html: review.content }}
                    />
                    <button className="button-heart" onClick={handleLikeClick}>
                        {isLiked ? <AiFillHeart size="30" /> : <AiOutlineHeart size="30" />}
                    </button>

                </div>
            </div>
            <div className="board-detail-reply-container">
                <form className="board-detail-reply" onSubmit={handleSubmit}>
                    <p className="reply-ex">댓글 작성</p>
                    <input
                        className="reply-add"
                        type="text"
                        value={comment}
                        onChange={handleCommentChange}
                        placeholder="댓글을 입력하세요"
                    />
                    <button type="submit" className="add-reply-button">작성</button>
                </form>
                <div className="board-detail-reply-data">
                    <p className="reply-ex">댓글 목록</p>
                    {comments.map((comment, index) => (
                        <div key={index} className="comment">
                            <div className="comment-info">
                                <span className="reply-user-id">{comment.user_id}</span>
                                <span className="reply-content">{comment.content}</span>
                                <span className="reply-reg-date">{formatDate(comment.regdate)}</span>
                            </div>
                            <hr className="board-divider" />
                        </div>
                    ))}
                </div>
            </div>
            <button className="return-list" onClick={ReviewList}>
                돌아가기
            </button>
            <Footer
                className="Footer-detailpage-bottom"
            />
        </>
    );
}
