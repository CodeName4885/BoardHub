<<<<<<< HEAD
import { useEffect, useState } from "react";
import { Form, Tab, Tabs } from "react-bootstrap";
import { fetchAllCategories, fetchList } from "../repositories/GameRepository";
import { GameListItemComponent } from "./GameListItemComponent";

export function GameListComponent() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cateList, setCateList] = useState([]);
=======
import "../static/game-warrior/css/animate.css";
import "../static/game-warrior/css/bootstrap.min.css";
import "../static/game-warrior/css/style.css";
import { Select, Tabs } from "antd";
import { useEffect, useState } from "react";
import { GameListItemComponent } from "./GameListItemComponent";
import { CATEGORY } from "../Constants";
import { fetchList } from "../repositories/GameRepository";

export function GameListComponent() {
    const [games, setGames] = useState([]);
    const [sort, setSort] = useState({});
>>>>>>> c78795c565dca992dd7c51979aa55b10585ea39d

    // 1 = 베스트50, 2 = 최신게임, 3 = 장르별
    const [tab, setTab] = useState(1);
    const [category, setCategory] = useState(0);
<<<<<<< HEAD
    const [sort, setSort] = useState({ tab: 1, category: 0 });

    useEffect(() => {
        getGameList();
        getAllCategories();
    }, [sort]);

    async function getGameList() {
        const response = await fetchList(sort);
        setGames(response);
        if (games) {
            setLoading(false);
        }
    }

    async function getAllCategories() {
        if (cateList.length < 1) {
            const response = await fetchAllCategories();
            if (response) {
                setCateList(response);
            }
        }
    }

    function onTabChange(v) {
=======

    function onChange(v) {
>>>>>>> c78795c565dca992dd7c51979aa55b10585ea39d
        setTab(v);
        setSort({ tab: v, category: category });
    }

    function selectChange(v) {
<<<<<<< HEAD
        const value = v.target.value;
        setCategory(value);
        setSort({ tab: tab, category: value });
    }

    if (loading) {
        return (
            <div id="preloder">
                <div className="loader"></div>
            </div>
        );
=======
        setCategory(v);
        setSort({ tab: tab, category: v });
    }

    const options = [];
    for (let i = 0; i < CATEGORY.length; i++) {
        options.push({
            value: i + 1,
            label: CATEGORY[i],
        });
    }

    const items = [
        {
            key: 1,
            label: "베스트 50",
        },
        {
            key: 2,
            label: "최신 게임",
        },
        {
            key: 3,
            label: "장르별",
            children: [
                <Select
                    allowClear
                    style={{
                        width: "100%",
                        maxWidth: 500,
                        marginBottom: 10,
                    }}
                    placeholder="장르 선택"
                    defaultValue={[]}
                    onChange={selectChange}
                    options={options}
                />,
            ],
        },
    ];

    useEffect(() => {
        getGameList();
    }, [sort]);

    async function getGameList() {
        const data = await fetchList(sort);
        setGames(data);
>>>>>>> c78795c565dca992dd7c51979aa55b10585ea39d
    }

    return (
        <>
            <section className="review-section spad">
                <div className="container">
<<<<<<< HEAD
                    <Tabs className="mb-3" onSelect={onTabChange}>
                        <Tab eventKey="1" title="베스트 50"></Tab>
                        <Tab eventKey="2" title="최신순"></Tab>
                        <Tab eventKey="3" title="카테고리">
                            <Form.Select onChange={selectChange}>
                                {cateList.map((cat) => {
                                    return (
                                        <option value={cat.categoryId}>
                                            {cat.category} ({cat.translate})
                                        </option>
                                    );
                                })}
                            </Form.Select>
                        </Tab>
                    </Tabs>

                    <div className="row">
                        {games ? (
                            games.map((item, key) => (
                                <GameListItemComponent key={key} games={item} />
                            ))
                        ) : (
                            <></>
                        )}
=======
                    <Tabs
                        defaultActiveKey="1"
                        size="large"
                        items={items}
                        onChange={onChange}
                    />
                    <div className="row">
                        {games.map((item, key) => (
                            <GameListItemComponent key={key} games={item} />
                        ))}
>>>>>>> c78795c565dca992dd7c51979aa55b10585ea39d
                    </div>
                </div>
            </section>
        </>
    );
}
