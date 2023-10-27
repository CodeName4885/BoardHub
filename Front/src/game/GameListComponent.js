import { useEffect, useState } from "react";
import { Form, Tab, Tabs } from "react-bootstrap";
import { fetchAllCategories, fetchList } from "../repositories/GameRepository";
import { GameListItemComponent } from "./GameListItemComponent";

export function GameListComponent() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cateList, setCateList] = useState([]);

    // 1 = 베스트50, 2 = 최신게임, 3 = 장르별
    const [tab, setTab] = useState(1);
    const [category, setCategory] = useState(0);
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
        setTab(v);
        setSort({ tab: v, category: category });
    }

    function selectChange(v) {
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
    }

    return (
        <>
            <section className="review-section spad">
                <div className="container">
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
                    </div>
                </div>
            </section>
        </>
    );
}
