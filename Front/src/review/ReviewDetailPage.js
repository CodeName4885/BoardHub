import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Footer } from "../layout/Footer";
import { Header } from "../layout/Header";
import "../static/game-warrior/css/animate.css";
import "../static/game-warrior/css/bootstrap.min.css";
import "../static/game-warrior/css/style.css";

export function ReviewDetailPage() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8080/show/reviews")
            .then((res) => {
                console.log("res : ", res);
                setReviews(res.data);
            })
            .catch((error) => {
                console.error("데이터 못불러왕~! : ", error);
            });
    }, []);

    return (
        <>
            <Header />
            <div>
                {reviews.map((review, index) => (
                    <div key={index}>
                        <h1>{review.title}</h1>
                        <div dangerouslySetInnerHTML={{ __html: review.content }} />
                    </div>
                ))}
            </div>
            <Footer />
        </>
    );
}
