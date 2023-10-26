
import { Footer } from "../layout/Footer";
import { Header } from "../layout/Header";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Scrollbar, A11y, Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import slideImg from "../static/game-warrior/img/slider-1.jpg"
import main from "../static/game-warrior/css/main.module.css"
import { getMainitem } from "../UserApiConfig/ApiService";
import { useEffect, useState } from "react";
function Main() {

  const [games, setGames] = useState([]);

  useEffect(() => {
    getMainitem().then((result) => {
      console.log("result = ", result);
      setGames(result);
    })

  }, [])
  

  return (
    <>
      <div className={main['header-fixed']}>
       <Header />
      </div>
        <div className={main['body']}>
          <section className={main['slide-wrap']}>
            <Swiper
              modules={[Pagination, Scrollbar, A11y, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
            >
              <SwiperSlide>
                <div className={main['slideImg-box']}>
                  <img src={slideImg}/>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={main['slideImg-box']}>
                  <img src={slideImg}/>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={main['slideImg-box']}>
                  <img src={slideImg}/>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={main['slideImg-box']}>
                  <img src={slideImg}/>
                </div>
              </SwiperSlide>
            </Swiper>
          </section>
          <section className={main['categori-wrap']}>
            {games.map((item) => {  
              return (
              <div key={item.gameId} className={main['card-wrap']}
                style={{
                  position: "relative",
                  backgroundImage: `url("${item.image}")`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}>
                <div style={{
                  background: "rgba(0, 0, 0, 0.5)",
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  cursor: "pointer",
                }}>

                </div>
                <div className={main['game-info-box']}>
                  <a className={main['game-title']} href="#">
                  {item.title}
                  </a>
                  <p className={main['game-coment']}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <a className={main['game-coment-count']} href="#">
                    <span>3</span> Comments
                  </a>
                </div>
              </div>
              )
            })}
          </section>
          <section className={main['hot-game-wrap']}>
            <div className={main['title-icon']}>
              <span className={main['new']}>NEW</span>
            </div>
            <h2 className={main['hot-game-title']}>인기 게임</h2>
            <div className={main['hot-game-card-box']}>
              <div className={main['hot-game-card-wrap']}>
                <div className={main['hot-game-img-box']}>

                </div>
                <div className={main['hot-game-info-box']}>
                  <a className={main['hot-game-title']} href="#">
                  Suspendisse ut justo tem por, rutrum
                  </a>
                  <p className={main['hot-game-coment']}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <a className={main['hot-game-coment-count']} href="#">
                    <span>3</span> Comments
                  </a>
                </div>
              </div>
              <div className={main['hot-game-card-wrap']}>
                <div className={main['hot-game-img-box']}>

                </div>
                <div className={main['hot-game-info-box']}>
                  <a className={main['hot-game-title']} href="#">
                  Suspendisse ut justo tem por, rutrum
                  </a>
                  <p className={main['hot-game-coment']}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <a className={main['hot-game-coment-count']} href="#">
                    <span>3</span> Comments
                  </a>
                </div>
              </div>
              <div className={main['hot-game-card-wrap']}>
                <div className={main['hot-game-img-box']}>

                </div>
                <div className={main['hot-game-info-box']}>
                  <a className={main['hot-game-title']} href="#">
                  Suspendisse ut justo tem por, rutrum
                  </a>
                  <p className={main['hot-game-coment']}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <a className={main['hot-game-coment-count']} href="#">
                    <span>3</span> Comments
                  </a>
                </div>
              </div>
            </div>
          </section>
          <section className={main['recent-review-wrap']}>
            <div className={main['title-icon']}>
              <span className={main['new']}>NEW</span>
            </div>
            <h2 className={main['recent-review-title']}>최근 리뷰</h2>
            <div className={main['recent-review-card-box']}>
              <div className={main['recent-review-card-wrap']}>
                <div className={main['recent-review-card']}>
                  <div className={main['recent-review-game-img']}>

                  </div>
                </div>
                <div className={main['recent-review-game-content-box']}>
                  <p className={main['recent-review-game-title']}>Game Title</p>
                  <a href="#" className={main['recent-review-coment']}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </a>
                </div>
              </div>
              <div className={main['recent-review-card-wrap']}>
                <div className={main['recent-review-card']}>
                  <div className={main['recent-review-game-img']}>

                  </div>
                </div>
                <div className={main['recent-review-game-content-box']}>
                  <p className={main['recent-review-game-title']}>Game Title</p>
                  <a href="#" className={main['recent-review-coment']}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </a>
                </div>
              </div>
              <div className={main['recent-review-card-wrap']}>
                <div className={main['recent-review-card']}>
                  <div className={main['recent-review-game-img']}>

                  </div>
                </div>
                <div className={main['recent-review-game-content-box']}>
                  <p className={main['recent-review-game-title']}>Game Title</p>
                  <a href="#" className={main['recent-review-coment']}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </a>
                </div>
              </div>
              <div className={main['recent-review-card-wrap']}>
                <div className={main['recent-review-card']}>
                  <div className={main['recent-review-game-img']}>

                  </div>
                </div>
                <div className={main['recent-review-game-content-box']}>
                  <p className={main['recent-review-game-title']}>Game Title</p>
                  <a href="#" className={main['recent-review-coment']}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      <Footer />
    </>
  );
}

export default Main;
