import { useEffect, useState } from "react";
import { Badge, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
    createGame,
    editGame,
    fetchAllData,
    fetchAllDataByGameId,
    fetchByGameId,
} from "../repositories/GameRepository";

export function GameFormComponent() {
    const params = useParams();
    const { gameId } = params;
    const [values, setValues] = useState({
        gameId: gameId,
    });

    const [dataOptions, setDataOptions] = useState();
    const [catButtons, setCatButtons] = useState([]);
    const [mechButtons, setMechButtons] = useState([]);
    const [desButtons, setDesButtons] = useState([]);
    const [artiButtons, setArtiButtons] = useState([]);
    const [pubButtons, setPubButtons] = useState([]);

    const [categories, setCategories] = useState([]);
    const [mechanics, setMechanics] = useState([]);
    const [artists, setArtists] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [designers, setDesigners] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllData();
        if (gameId) {
            getGame().then(() => {
                getAllDataById().then(() => {
                    console.log(values);
                    setLoading(false);
                });
            });
        } else {
            setLoading(false);
        }
    }, [gameId]);

    function applyEdit(e) {
        e.preventDefault();
        console.log(values);
        // applyChange();
    }

    async function applyChange() {
        if (gameId) {
            await editGame(values);
        } else {
            await createGame(values);
        }
    }

    function handleChange(e) {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    }

    async function getGame() {
        return await fetchByGameId(gameId).then((data) => {
            setValues(data);
            return data;
        });
    }

    async function getAllDataById() {
        await fetchAllDataByGameId(gameId).then((data) => {
            if (data) {
                const initCategories = [];
                const initCatButtons = data.catList.map((cat) => {
                    initCategories.push(cat.categoryId);
                    return {
                        id: cat.categoryId,
                        text: `${cat.category} (${cat.translate})`,
                    };
                });
                setCategories(initCategories);
                setCatButtons(initCatButtons);

                const initMechanics = [];
                const initMechButtons = data.mechList.map((mech) => {
                    initMechanics.push(mech.mechanicId);
                    return {
                        id: mech.mechanicId,
                        text: `${mech.mechanic} (${mech.translate})`,
                    };
                });
                setMechanics(initMechanics);
                setMechButtons(initMechButtons);

                const initArtists = [];
                const initArtiButtons = data.artiList.map((arti) => {
                    initArtists.push(arti.artistId);
                    return {
                        id: arti.artistId,
                        text: `${arti.artist} (${arti.translate})`,
                    };
                });
                setArtists(initArtists);
                setArtiButtons(initArtiButtons);

                const initPublisher = [];
                const initPubButtons = data.pubList.map((pub) => {
                    initPublisher.push(pub.publisherId);
                    return {
                        id: pub.publisherId,
                        text: `${pub.publisher} (${pub.translate})`,
                    };
                });
                setPublishers(initPublisher);
                setPubButtons(initPubButtons);

                const initDesigners = [];
                const initDesButtons = data.desList.map((des) => {
                    initDesigners.push(des.designerId);
                    return {
                        id: des.designerId,
                        text: `${des.designer} (${des.translate})`,
                    };
                });
                setDesigners(initDesigners);
                setDesButtons(initDesButtons);

                setValues({
                    ...values,
                    categories: initCategories,
                    mechanics: initMechanics,
                    designers: initDesigners,
                    artists: initArtists,
                    publisher: initPublisher,
                });
            }
        });
    }

    async function getAllData() {
        if (!dataOptions) {
            const data = await fetchAllData();
            setDataOptions(data);
        }
    }

    function onCatSelectChange(e) {
        const id = e.target.value;
        const text = e.target.options[e.target.selectedIndex].text;
        setCategories([...categories, id]);
        setCatButtons([...catButtons, { id, text }]);
        setValues({
            ...values,
            categories: [...categories, id],
        });
    }

    function catButtonOnClick(e) {
        console.log(e.target);
        const id = e.target.id;
        const list = categories.filter((item) => !(item == id));
        setCategories(list);
        const buttons = catButtons.filter((item) => !(item.id == id));
        setCatButtons(buttons);
        setValues({
            ...values,
            categories: list,
        });
    }

    function onMechSelectChange(e) {
        const id = e.target.value;
        const text = e.target.options[e.target.selectedIndex].text;
        setMechanics([...mechanics, id]);
        setMechButtons([...mechButtons, { id, text }]);
        setValues({
            ...values,
            machanics: [...mechanics, id],
        });
    }

    function mechButtonOnClick(e) {
        const id = e.target.id;
        const list = mechanics.filter((item) => !(item == id));
        setMechanics(list);
        const buttons = mechButtons.filter((item) => !(item.id == id));
        setMechButtons(buttons);
        setValues({
            ...values,
            machanics: list,
        });
    }

    function onDesSelectChange(e) {
        const id = e.target.value;
        const text = e.target.options[e.target.selectedIndex].text;
        setDesigners([...designers, id]);
        setDesButtons([...desButtons, { id, text }]);
        setValues({
            ...values,
            designers: [...designers, id],
        });
    }

    function desButtonOnClick(e) {
        const id = e.target.id;
        const list = designers.filter((item) => !(item == id));
        setDesigners(list);
        const buttons = desButtons.filter((item) => !(item.id == id));
        setDesButtons(buttons);
        setValues({
            ...values,
            designers: list,
        });
    }

    function onArtiSelectChange(e) {
        const id = e.target.value;
        const text = e.target.options[e.target.selectedIndex].text;
        setArtists([...artists, id]);
        setArtiButtons([...artiButtons, { id, text }]);
        setValues({
            ...values,
            artists: [...artists, id],
        });
    }

    function artiButtonOnClick(e) {
        const id = e.target.id;
        const list = artists.filter((item) => !(item == id));
        setArtists(list);
        const buttons = artiButtons.filter((item) => !(item.id == id));
        setArtiButtons(buttons);
        setValues({
            ...values,
            artists: list,
        });
    }

    function onPubSelectChange(e) {
        const id = e.target.value;
        const text = e.target.options[e.target.selectedIndex].text;
        setPublishers([...publishers, id]);
        setPubButtons([...pubButtons, { id, text }]);
        setValues({
            ...values,
            publishers: [...publishers, id],
        });
    }

    function pubButtonOnClick(e) {
        const id = e.target.id;
        const list = publishers.filter((item) => !(item == id));
        setPublishers(list);
        const buttons = pubButtons.filter((item) => !(item.id == id));
        setPubButtons(buttons);
        setValues({
            ...values,
            publishers: list,
        });
    }

    if (loading) {
        return (
            <div id="preloder">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <section className="spad">
            <div className="container">
                <form onSubmit={applyEdit}>
                    <div className="row">
                        <div className="row col-md-12 m-4">
                            <div className="col-md-2 row align-items-center">
                                <h5>썸네일</h5>
                            </div>
                            <div className="col-md-5">
                                <input
                                    type="file"
                                    name="thumbnail"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <hr style={{ border: "1px solid black" }} />
                    <div className="row">
                        <div className="row col-md-12 m-4">
                            <div className="col-md-2 row align-items-center">
                                <h5>게임 이미지</h5>
                            </div>
                            <div className="col-md-5">
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <hr style={{ border: "1px solid black" }} />
                    <div className="row">
                        <div className="row col-md-12 m-4">
                            <div className="col-md-2 row align-items-center">
                                <h5>게임명</h5>
                            </div>
                            <div className="col-md-5">
                                <input
                                    type="text"
                                    name="orgTitle"
                                    value={values.orgTitle}
                                    onChange={handleChange}
                                />
                                <span className="ml-1">영문 (원제)</span>
                                <hr style={{ border: 0 }} />
                                <input
                                    type="text"
                                    name="title"
                                    value={values.title}
                                    onChange={handleChange}
                                />
                                <span className="ml-1">한글</span>
                            </div>
                        </div>
                    </div>
                    <hr style={{ border: "1px solid black" }} />
                    <div className="row">
                        <div className="row col-md-12 m-4">
                            <div className="col-md-2 row align-items-center">
                                <h5>출시년도</h5>
                            </div>
                            <div className="col-md-5">
                                <input
                                    type="number"
                                    name="releaseDate"
                                    value={values.releaseDate}
                                    onChange={handleChange}
                                />
                                <span className="ml-1">년</span>
                            </div>
                        </div>
                    </div>
                    <hr style={{ border: "1px solid black" }} />
                    <div className="row">
                        <div className="row col-md-12 m-4">
                            <div className="col-md-2 row align-items-center">
                                <h5>플레이 최소인원</h5>
                            </div>
                            <div className="col-md-5">
                                <input
                                    type="number"
                                    name="minPlayer"
                                    value={values.minPlayer}
                                    onChange={handleChange}
                                />
                                <span className="ml-1">명</span>
                            </div>
                        </div>
                    </div>
                    <hr style={{ border: "1px solid black" }} />
                    <div className="row">
                        <div className="row col-md-12 m-4">
                            <div className="col-md-2 row align-items-center">
                                <h5>플레이 최대인원</h5>
                            </div>
                            <div className="col-md-5">
                                <input
                                    type="number"
                                    name="maxPlayer"
                                    value={values.maxPlayer}
                                    onChange={handleChange}
                                />
                                <span className="ml-1">명</span>
                            </div>
                        </div>
                    </div>
                    <hr style={{ border: "1px solid black" }} />
                    <div className="row">
                        <div className="row col-md-12 m-4">
                            <div className="col-md-2 row align-items-center">
                                <h5>평균 플레이 시간</h5>
                            </div>
                            <div className="col-md-5">
                                <input
                                    type="number"
                                    name="playingTime"
                                    value={values.playingTime}
                                    onChange={handleChange}
                                />
                                <span className="ml-1">분</span>
                            </div>
                        </div>
                    </div>
                    <hr style={{ border: "1px solid black" }} />
                    <div className="row">
                        <div className="row col-md-12 m-4">
                            <div className="col-md-2 row align-items-center">
                                <h5>사용 최소연령</h5>
                            </div>
                            <div className="col-md-5">
                                <input
                                    type="text"
                                    name="minAge"
                                    value={values.minAge}
                                    onChange={handleChange}
                                />
                                <span className="ml-1">세 이상</span>
                            </div>
                        </div>
                    </div>
                    <hr style={{ border: "1px solid black" }} />

                    <div className="row">
                        <div className="row col-md-12 m-4">
                            <div className="col-md-2 row align-items-center">
                                <h5>게임 카테고리</h5>
                            </div>
                            <div className="col-md-5">
                                <Form.Select onChange={onCatSelectChange}>
                                    <option>---</option>
                                    {dataOptions && dataOptions.catList ? (
                                        dataOptions.catList.map((cat) => {
                                            return (
                                                <option
                                                    key={cat.categoryId}
                                                    value={cat.categoryId}
                                                >
                                                    {cat.category} (
                                                    {cat.translate})
                                                </option>
                                            );
                                        })
                                    ) : (
                                        <></>
                                    )}
                                </Form.Select>
                                {catButtons.length > 0 ? (
                                    catButtons.map((cat) => {
                                        return (
                                            <>
                                                <Button
                                                    key={cat.id}
                                                    className="m-1"
                                                    value={cat.id}
                                                >
                                                    {cat.text}
                                                    <Badge
                                                        className="ml-1"
                                                        bg="secondary"
                                                        id={cat.id}
                                                        onClick={
                                                            catButtonOnClick
                                                        }
                                                    >
                                                        X
                                                    </Badge>
                                                </Button>
                                            </>
                                        );
                                    })
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    </div>
                    <hr style={{ border: "1px solid black" }} />
                    <div className="row">
                        <div className="row col-md-12 m-4">
                            <div className="col-md-2 row align-items-center">
                                <h5>게임 진행방식</h5>
                            </div>
                            <div className="col-md-5">
                                <Form.Select onChange={onMechSelectChange}>
                                    <option>---</option>
                                    {dataOptions && dataOptions.mechList ? (
                                        dataOptions.mechList.map((mech) => {
                                            return (
                                                <option
                                                    key={mech.mechanicId}
                                                    value={mech.mechanicId}
                                                >
                                                    {mech.mechanic} (
                                                    {mech.translate})
                                                </option>
                                            );
                                        })
                                    ) : (
                                        <></>
                                    )}
                                </Form.Select>
                                {mechButtons.length > 0 ? (
                                    mechButtons.map((mech) => {
                                        return (
                                            <>
                                                <Button
                                                    key={mech.id}
                                                    className="m-1"
                                                    value={mech.id}
                                                >
                                                    {mech.text}
                                                    <Badge
                                                        className="ml-1"
                                                        bg="secondary"
                                                        id={mech.id}
                                                        onClick={
                                                            mechButtonOnClick
                                                        }
                                                    >
                                                        X
                                                    </Badge>
                                                </Button>
                                            </>
                                        );
                                    })
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    </div>
                    <hr style={{ border: "1px solid black" }} />
                    <div className="row">
                        <div className="row col-md-12 m-4">
                            <div className="col-md-2 row align-items-center">
                                <h5>룰 디자이너</h5>
                            </div>
                            <div className="col-md-5">
                                <Form.Select onChange={onDesSelectChange}>
                                    <option>---</option>
                                    {dataOptions && dataOptions.desList ? (
                                        dataOptions.desList.map((des) => {
                                            return (
                                                <option
                                                    key={des.designerId}
                                                    value={des.designerId}
                                                >
                                                    {des.designer} (
                                                    {des.translate})
                                                </option>
                                            );
                                        })
                                    ) : (
                                        <></>
                                    )}
                                </Form.Select>
                                {desButtons.length > 0 ? (
                                    desButtons.map((des) => {
                                        return (
                                            <>
                                                <Button
                                                    key={des.id}
                                                    className="m-1"
                                                    value={des.id}
                                                >
                                                    {des.text}
                                                    <Badge
                                                        className="ml-1"
                                                        bg="secondary"
                                                        id={des.id}
                                                        onClick={
                                                            desButtonOnClick
                                                        }
                                                    >
                                                        X
                                                    </Badge>
                                                </Button>
                                            </>
                                        );
                                    })
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    </div>
                    <hr style={{ border: "1px solid black" }} />
                    <div className="row">
                        <div className="row col-md-12 m-4">
                            <div className="col-md-2 row align-items-center">
                                <h5>게임 아티스트</h5>
                            </div>
                            <div className="col-md-5">
                                <Form.Select onChange={onArtiSelectChange}>
                                    <option>---</option>
                                    {dataOptions && dataOptions.artiList ? (
                                        dataOptions.artiList.map((arti) => {
                                            return (
                                                <option
                                                    key={arti.artistId}
                                                    value={arti.artistId}
                                                >
                                                    {arti.artist} (
                                                    {arti.translate})
                                                </option>
                                            );
                                        })
                                    ) : (
                                        <></>
                                    )}
                                </Form.Select>
                                {artiButtons.length > 0 ? (
                                    artiButtons.map((arti) => {
                                        return (
                                            <>
                                                <Button
                                                    key={arti.id}
                                                    className="m-1"
                                                    value={arti.id}
                                                >
                                                    {arti.text}
                                                    <Badge
                                                        className="ml-1"
                                                        bg="secondary"
                                                        id={arti.id}
                                                        onClick={
                                                            artiButtonOnClick
                                                        }
                                                    >
                                                        X
                                                    </Badge>
                                                </Button>
                                            </>
                                        );
                                    })
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    </div>
                    <hr style={{ border: "1px solid black" }} />
                    <div className="row">
                        <div className="row col-md-12 m-4">
                            <div className="col-md-2 row align-items-center">
                                <h5>출판사</h5>
                            </div>
                            <div className="col-md-5">
                                <Form.Select onChange={onPubSelectChange}>
                                    <option>---</option>
                                    {dataOptions && dataOptions.pubList ? (
                                        dataOptions.pubList.map((pub) => {
                                            return (
                                                <option
                                                    key={pub.publisherId}
                                                    value={pub.publisherId}
                                                >
                                                    {pub.publisher} (
                                                    {pub.translate})
                                                </option>
                                            );
                                        })
                                    ) : (
                                        <></>
                                    )}
                                </Form.Select>
                                {pubButtons.length > 0 ? (
                                    pubButtons.map((pub) => {
                                        return (
                                            <>
                                                <Button
                                                    key={pub.id}
                                                    className="m-1"
                                                    value={pub.id}
                                                >
                                                    {pub.text}
                                                    <Badge
                                                        className="ml-1"
                                                        bg="secondary"
                                                        id={pub.id}
                                                        onClick={
                                                            pubButtonOnClick
                                                        }
                                                    >
                                                        X
                                                    </Badge>
                                                </Button>
                                            </>
                                        );
                                    })
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    </div>
                    <hr style={{ border: "1px solid black" }} />

                    <Button type="submit">적용</Button>
                </form>
            </div>
        </section>
    );
}
