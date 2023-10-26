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

    // 1 = 베스트50, 2 = 최신게임, 3 = 장르별
    const [tab, setTab] = useState(1);
    const [category, setCategory] = useState(0);

    function onChange(v) {
        setTab(v);
        setSort({ tab: v, category: category });
    }

    function selectChange(v) {
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
    }

    return (
        <>
            <section className="review-section spad">
                <div className="container">
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
                    </div>
                </div>
            </section>
        </>
    );
}
