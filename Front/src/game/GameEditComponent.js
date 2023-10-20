import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
    getArtistsByGameId,
    getCategoriesById,
    getDesignersByGameId,
    getMechaicsByGameId,
    getPublisherByGameId,
} from "../repositories/GameRepository";

export function GameEditComponent() {
    const params = useParams();
    const [values, setValues] = useState({
        gameId: params.id,
    });
    const [categories, setCategories] = useState();
    const [mechanics, setMechanics] = useState();
    const [artists, setArtists] = useState();
    const [publisher, setPublisher] = useState();
    const [designers, setDesigners] = useState();

    console.log(params.id);

    useEffect(() => {
        getCategories();
        getMechanics();
        getArtists();
        getPublisher();
        getDesigners();
    }, []);

    async function getCategories() {
        const response = await getCategoriesById(params.id);
        setCategories(response);
    }
    async function getMechanics() {
        const response = await getMechaicsByGameId(params.id);
        setMechanics(response);
    }
    async function getArtists() {
        const response = await getArtistsByGameId(params.id);
        setArtists(response);
    }
    async function getPublisher() {
        const response = await getPublisherByGameId(params.id);
        setPublisher(response);
    }
    async function getDesigners() {
        const response = await getDesignersByGameId(params.id);
        setDesigners(response);
    }

    function applyEdit(e) {
        e.preventDefault();
        console.log(values);
    }

    function handleChange(e) {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    }

    return (
        <section className="spad">
            <div className="container">
                <form onSubmit={applyEdit}>
                    <div className="row">
                        <div className="row col-md-12 m-4">
                            <div className="col-md-2">
                                <h5>썸네일</h5>
                            </div>
                            <div className="col-md-5">
                                <input
                                    type="image"
                                    name="thumbnail"
                                    value={values.thumbnail}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <hr style={{ border: "1px solid black" }} />
                    <div className="row">
                        <div className="row col-md-12 m-4">
                            <div className="col-md-2">
                                <h5>게임 이미지 </h5>
                            </div>
                            <div className="col-md-5">
                                <input
                                    type="image"
                                    name="image"
                                    value={values.image}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <hr style={{ border: "1px solid black" }} />
                    <div className="row">
                        <div className="row col-md-12 m-4">
                            <div className="col-md-2">
                                <h5>게임명 </h5>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="orgTitle"
                                    value={values.orgTitle}
                                    onChange={handleChange}
                                />
                                영문 (원제)
                                <input
                                    type="text"
                                    name="title"
                                    value={values.title}
                                    onChange={handleChange}
                                />
                                한글
                            </div>
                        </div>
                    </div>
                    <hr style={{ border: "1px solid black" }} />
                    <div className="row">
                        <div className="row col-md-12 m-4">
                            <div className="col-md-2">
                                <h5>출시년도</h5>
                            </div>
                            <div className="col-md-5">
                                <input
                                    type="number"
                                    name="releaseDate"
                                    value={values.releaseDate}
                                    onChange={handleChange}
                                />
                                년
                            </div>
                        </div>
                    </div>
                    <hr style={{ border: "1px solid black" }} />
                    <div className="row">
                        <div className="row col-md-12 m-4">
                            <div className="col-md-2">
                                <h5>플레이 최소인원</h5>
                            </div>
                            <div className="col-md-5">
                                <input
                                    type="number"
                                    name="minPlayer"
                                    value={values.minPlayer}
                                    onChange={handleChange}
                                />
                                명
                            </div>
                        </div>
                    </div>
                    <hr style={{ border: "1px solid black" }} />
                    <div className="row">
                        <div className="row col-md-12 m-4">
                            <div className="col-md-2">
                                <h5>플레이 최대인원</h5>
                            </div>
                            <div className="col-md-5">
                                <input
                                    type="number"
                                    name="maxPlayer"
                                    value={values.maxPlayer}
                                    onChange={handleChange}
                                />
                                명
                            </div>
                        </div>
                    </div>
                    <hr style={{ border: "1px solid black" }} />
                    <div className="row">
                        <div className="row col-md-12 m-4">
                            <div className="col-md-2">
                                <h5>평균 플레이 시간</h5>
                            </div>
                            <div className="col-md-5">
                                <input
                                    type="number"
                                    name="playingTime"
                                    value={values.playingTime}
                                    onChange={handleChange}
                                />
                                분
                            </div>
                        </div>
                    </div>
                    <hr style={{ border: "1px solid black" }} />
                    <div className="row">
                        <div className="row col-md-12 m-4">
                            <div className="col-md-2">
                                <h5>사용 최소연령</h5>
                            </div>
                            <div className="col-md-5">
                                <input
                                    type="text"
                                    name="minAge"
                                    value={values.minAge}
                                    onChange={handleChange}
                                />
                                세 이상
                            </div>
                        </div>
                    </div>
                    <hr style={{ border: "1px solid black" }} />
                    <div className="row">
                        <div className="row col-md-12 m-4">
                            <div className="col-md-2">
                                <h5>게임 카테고리</h5>
                            </div>
                            <input
                                type="text"
                                name="category"
                                value={values.category}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <hr style={{ border: "1px solid black" }} />
                    <div className="row">
                        <div className="row col-md-12 m-4">
                            <div className="col-md-2">
                                <h5>게임 진행방식</h5>
                            </div>
                            <input
                                type="text"
                                name="mechanic"
                                value={values.mechanic}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <hr style={{ border: "1px solid black" }} />
                    <div className="row">
                        <div className="row col-md-12 m-4">
                            <div className="col-md-2">
                                <h5>룰 디자이너</h5>
                            </div>
                            <div className="col-md-5">
                                <input
                                    type="text"
                                    name="designer"
                                    value={values.designer}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <hr style={{ border: "1px solid black" }} />
                    <div className="row">
                        <div className="row col-md-12 m-4">
                            <div className="col-md-2">
                                <h5>게임 아티스트</h5>
                            </div>
                            <input
                                type="text"
                                name="artist"
                                value={values.artist}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <hr style={{ border: "1px solid black" }} />
                    <div className="row">
                        <div className="row col-md-12 m-4">
                            <div className="col-md-2">
                                <h5>출판사</h5>
                            </div>
                            <input
                                type="text"
                                name="publisher"
                                value={values.publisher}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <hr style={{ border: "1px solid black" }} />

                    <Button type="submit">적용</Button>
                </form>
            </div>
        </section>
    );
}
