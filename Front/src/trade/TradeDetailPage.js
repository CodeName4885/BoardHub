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
import {Call} from "../UserApiConfig/ApiService";

function formatDate(rawDate) {
    const date = new Date(rawDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}.${month}.${day}`;
}

export function TradeDetailPage() {
    const [comment, setComment] = useState('');
    const { comm_id } = useParams();
    const [trade, setTrade] = useState({ title: '', content: '' });
    const [comments, setComments] = useState([]); // comments로 수정
    const navigate = useNavigate();
    const [isLiked, setIsLiked] = useState(false);
    const [isReplyVisible, setIsReplyVisible] = useState({});
    const [reply_id, setReply_id] = useState('');
    const [replyComment, setReplyComment] = useState('');
    const [replyComments, setReplyComments] = useState([]);
    const [reply_comment_id, setReply_comment_id] = useState('');

    const user_id = sessionStorage.getItem("USER_ID");
    const token = localStorage.getItem("ACCESS_TOKEN");
    const socialtoken = sessionStorage.getItem("TOKEN");
    const [userData, setUserData] = useState(null);
    console.log(userData);
    useEffect(() => {
        if (token !== null) {
            Call("/mypage", "POST", null)
                .then((response) => {
                    setUserData(response);
                })
                .catch((error) => {
                    console.error("Error fetching data: ", error);
                });
        }
        if(socialtoken !== null){
            const email = sessionStorage.getItem("USER_EMAIL");
            Call("/socialmypage", "POST", email)
                .then((response)=>{
                    setUserData(response);
                })

        }
    }, [token, socialtoken]);

    // 좋아요
    function handleLikeClick(tradeId) {
        axios.post(`http://localhost:8080/detail/like/${comm_id}`)
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
    // 조회수 증가
    useEffect(() => {
        axios.post(`http://localhost:8080/up/views/${comm_id}`)
            .then((response) => {
                if (response.status === 200) {
                    console.log("Views incremented successfully");
                } else {
                    console.error("Error incrementing views");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, [comm_id]);
    // 디테일 페이지 뿌리기
    useEffect(() => {
        axios.get(`http://localhost:8080/show/tradeDetail/${comm_id}`)
            .then((res) => {
                console.log("Response: ", res);
                setTrade(res.data);
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

    const tradeList = () => {
        navigate("/trade/list");
    };
    // 대댓글 입력시 데이터 들어가게 만드는 메서드
    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };
    // 답글 작성 --> 작성 취소
    const toggleReply = (replyId) => {
        if (reply_id === replyId) {
            // Clicking the same reply button again to cancel
            setReply_id('');
        } else {
            // Clicking a different reply button to show or change reply
            setReply_id(replyId);
        }

        // Toggle the visibility state for the reply
        setIsReplyVisible((prevState) => ({
            ...prevState,
            [replyId]: !prevState[replyId],
        }));
    };

    // 시간 몇분 전 , 방금 전
    function getTimeAgo(commentDate) {
        const currentDate = new Date();
        const commentDateObj = new Date(commentDate);

        const timeDifference = currentDate - commentDateObj;
        const minutesAgo = Math.floor(timeDifference / (1000 * 60));

        if (minutesAgo < 1) {
            return "방금 전";
        } else if (minutesAgo < 60) {
            return `${minutesAgo}분 전`;
        } else if (minutesAgo < 1440) {
            const hoursAgo = Math.floor(minutesAgo / 60);
            return `${hoursAgo}시간 전`;
        } else {
            const daysAgo = Math.floor(minutesAgo / 1440);
            return `${daysAgo}일 전`;
        }
    }
    // 댓글 작성 후 바로 뿌리기
    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestBody = {
            reply_id: reply_id,
            comm_id: comm_id,
            content: comment,
            user_id: userData.user_id,
        };

        const response = await fetch(`http://localhost:8080/add/reply/${comm_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (response.ok) {
            // Comment submitted successfully, update comments and reset the input
            axios.get(`http://localhost:8080/show/Detail/reply/${comm_id}`)
                .then((res) => {
                    setComments(res.data);
                    setComment('');
                })
                .catch((error) => {
                    console.error("Error fetching comments: ", error);
                });
        } else {
            console.error('Error submitting comment:', response.status, response.statusText);
        }
    }
    // 대댓글 작성후 바로 뿌리기
    const handleReplySubmit = async (reply_id, e) => {
        e.preventDefault();

        // Prepare the reply data
        const replyCommentData = {
            reply_commet_id: reply_comment_id, // Include the reply_comment_id
            reply_id: reply_id,
            content: replyComment, // Make sure this references the correct state variable
            comm_id: comm_id,
            user_id: userData.userId,
        };

        // Send the reply to the server
        const response = await fetch(`http://localhost:8080/add/reply/comment/${reply_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(replyCommentData),
        });

        if (response.ok) {
            // Reply submitted successfully, update comments and reset the input
            axios.get(`http://localhost:8080/show/reply/comment/${reply_id}`)
                .then((res) => {
                    setReplyComment(''); // Reset the input
                    setReplyComments(res.data);
                })
                .catch((error) => {
                    console.error("Error fetching comments: ", error);
                });
        } else {
            console.error('Error submitting comment:', response.status, response.statusText);
        }
    }
    // 초기 페이지 로딩 시 답글 가져오기
    useEffect(() => {
        axios.get(`http://localhost:8080/show/reply/comment/${reply_id}`)
            .then((res) => {
                console.log("Response: ", res);
                setReplyComments(res.data);
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    }, [reply_id]);

    return (
        <>
            <Header />

            <div className="board-detail-container">
                <div className="board-detail">
                    <div className="board-title-container">
                        <h2 className="title-name">제목</h2>
                        <h1 className="board-title">{trade.title}</h1>
                    </div>

                    <h4 className="date-reg">{formatDate(trade.regdate)}</h4>
                    <hr className="board-divider" /> {/* 제목과 내용을 구분하는 선 */}
                    <div
                        className="board-content"
                        dangerouslySetInnerHTML={{ __html: trade.content }}
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
                    {comments
                        .map((comment, index) => (
                            <div key={index} className="comment">
                                <div className="comment-info">
                                    <span className="reply-user-id">{userData.nickname}</span>
                                    <span className="reply-content">{comment.content}</span>
                                    <span className="reply-reg-date">{getTimeAgo(comment.regdate)}</span>
                                    <button type="button" className="small-button" onClick={() => toggleReply(comment.reply_id)}>
                                        {isReplyVisible[comment.reply_id] ? '작성 취소' : '답글 작성'}
                                    </button>
                                    {isReplyVisible[comment.reply_id] && reply_id === comment.reply_id && (
                                        <form className="reply-reply-add-container">
                                            <input
                                                className="reply-add"
                                                type="text"
                                                value={replyComment}
                                                placeholder="답글을 입력하세요"
                                                onChange={(e) => setReplyComment(e.target.value)}
                                            />
                                            <button type="button" className="reply-reply-button" onClick={(e) => handleReplySubmit(comment.reply_id, e)}>작성</button>
                                            <hr className="reply-divider" />
                                        </form>
                                    )}
                                    <hr className="reply-divider" />
                                </div>
                                {replyComments
                                    .filter((reply) => reply.reply_id === comment.reply_id)
                                    .slice(0, 5)
                                    .map((reply, replyIndex) => (
                                        <div key={replyIndex} className="comment-reply">
                                            <div className="reply-comment-add-container">
                                                <span className="reply-comment-user-id">{userData.nickname}</span>
                                                <span className="reply-comment-content">{reply.content}</span>
                                                <span className="reply-comment-reg-date">{getTimeAgo(reply.regdate)}</span>
                                            </div>
                                            <hr className="reply-comment-divider" />
                                        </div>
                                    ))}
                            </div>
                        ))}
                </div>
            </div>
            <button className="return-list" onClick={tradeList}>
                돌아가기
            </button>
            <Footer className="Footer-detailpage-bottom" />
        </>
    );
}
