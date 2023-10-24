// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { Footer } from "../layout/Footer";
// import { Header } from "../layout/Header";
// import "../static/game-warrior/css/animate.css";
// import "../static/game-warrior/css/bootstrap.min.css";
// import "../static/game-warrior/css/style.css";
//
// export function ReviewDetailPage() {
//     const [title, setTitle] = useState([]);
//     const [content, setContent] = useState([]);
//
//     useEffect(() => {
//         axios
//             .get("http://localhost:8080/show/reviews")
//             .then((res) => {
//                 const reviewData = res.data;
//                 setTitle(reviewData.title);
//                 setContent(reviewData.content);
//             })
//             .catch((error) => {
//                 console.error("데이터 못불러왕~! : ", error);
//             });
//     }, []);
//
//     return (
//         <>
//             <Header />
//                 <div>Loading...</div>
//                 <div>
//                     <h1>{title}</h1>
//                     <p>{content}</p>
//                 </div>
//             <Footer />
//         </>
//     );
// }
