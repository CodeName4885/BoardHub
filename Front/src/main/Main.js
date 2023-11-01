import { Footer } from "../layout/Footer";
import { Header } from "../layout/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import main from "../static/game-warrior/css/main.module.css";
import { getHotMainItem, getMainitem } from "../UserApiConfig/ApiService";
import { useEffect, useState } from "react";
import Side from "./Side";
import axios from 'axios';

function Main() {
    const [games, setGames] = useState([]);
    const [hotGames, setHotGames] = useState([]);
    const [blog, setBlog] = useState([]);
    useEffect(() => {
        getMainitem().then((result) => {
            console.log("result = ", result);
            setGames(result);
        });
        getHotMainItem().then((result) => {
            console.log("result = ", result);
            setHotGames(result);
        })

    }, []);

    useEffect(() => {
        axios.get(`http://localhost:8080/show/blog`)
            .then((res) => {
                console.log("Response: ", res);
                setBlog(res.data);
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    }, []);


    return (
        <>
            <div className={main["header-fixed"]}>
                <Header />
            </div>
            <div className={main["body"]}>
                <Side />
                <section className={main["slide-wrap"]}>
                    <Swiper
                        modules={[Pagination, Scrollbar, A11y, Autoplay]}
                        spaceBetween={10}
                        slidesPerView={2}
                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                        autoplay={{ delay: 2500, disableOnInteraction: false }}
                        onSlideChange={() => console.log("slide change")}
                        onSwiper={(swiper) => console.log(swiper)}
                    >
                        {games.map((item)=>{
                           return( <SwiperSlide>
                                <a href={`/game/detail/${item.gameId}`}>
                                    <div className={main["slideImg-box"]}
                                        style={{
                                            backgroundImage: `url("${item.thumbnail}")`,
                                            backgroundSize: "cover",
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "center",
                                        }}
                                    >
                                </div>
                                </a>
                            </SwiperSlide>
                           );
                        })}
                    </Swiper>
                </section>
                <section className={main["categori-wrap"]}>
                    {games.map((item) => {
                        return (
                            <div
                                key={item.gameId}
                                className={main["card-wrap"]}
                                style={{
                                    position: "relative",
                                    backgroundImage: `url("${item.thumbnail}")`,
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                }}
                            >
                                <div
                                    style={{
                                        background: "rgba(0, 0, 0, 0.5)",
                                        width: "100%",
                                        height: "100%",
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        cursor: "pointer",
                                    }}
                                ></div>
                                <div className={main["game-info-box"]}>
                                    <a href={`/game/detail/${item.gameId}`} className={main["game-title"]} >
                                        {item.title}
                                    </a>
                                    <p className={main["game-coment"]}>
                                        {item.coment}
                                    </p>
                                    <a
                                        className={main["game-coment-count"]}
                                        href="#"
                                    >
                                        <span>{item.coment_count}</span> Comments
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </section>
                <section className={main["hot-game-wrap"]}>
                    <div className={main["title-icon"]}>
                        <span className={main["new"]}>NEW</span>
                    </div>
                    <h2 className={main["hot-game-title"]}>인기 게임</h2>
                    <div className={main["hot-game-card-box"]}>
                        {hotGames.map((item) => {
                            return (
                                <div className={main["hot-game-card-wrap"]}>
                                    <div className={main["hot-game-img-box"]}
                                        style={{
                                            backgroundImage: `url("${item.thumbnail}")`,
                                            backgroundSize: "cover",
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "center"
                                        }}
                                    ></div>
                                    <div className={main["hot-game-info-box"]}>
                                        <a className={main["hot-game-title"]} href={`/game/detail/${item.gameId}`}>
                                            {item.title}
                                        </a>
                                        <p className={main["hot-game-coment"]}>
                                            {item.coment}
                                        </p>
                                        <a
                                            className={main["hot-game-coment-count"]}
                                            href="#"
                                        >
                                            <span>{item.coment_count}</span> Comments
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
                <section className={main["recent-review-wrap"]}>
                    <div className={main["title-icon"]}>
                        <span className={main["new"]}>NEW</span>
                    </div>
                    <h2 className={main["recent-review-title"]}>최근 리뷰</h2>
                    <div className={main["recent-review-card-box"]}>
                        {blog.slice(0, 4).map((item) => (
                            <div className={main["recent-review-card-wrap"]} key={item.id}>
                                <div className={main["recent-review-card"]}>
                                    <div
                                        className={main["recent-review-game-img"]}
                                        style={{
                                            backgroundImage: `url("${item.image_url}")`,
                                        }}
                                    ></div>
                                </div>
                                <div className={main["recent-review-game-content-box"]}>
                                    <p className={main["recent-review-game-title"]}>
                                        <span dangerouslySetInnerHTML={{ __html: item.title }} />
                                    </p>
                                    <a
                                        href={item.link}
                                        className={main["recent-review-coment"]}
                                        dangerouslySetInnerHTML={{ __html: item.description }}
                                    ></a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
              </div>
            <Footer />
        </>
    );
}

export default Main;
