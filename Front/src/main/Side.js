import { useEffect, useState } from "react";
import side from "../static/game-warrior/css/side.module.css";
import { AiOutlineCaretRight, AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
function Side() {

    const [rankingData, setRankingData] = useState([]);

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:5000/sse');

        eventSource.onmessage = (event) => {
            const eventData = JSON.parse(event.data);
            setRankingData(eventData.rankingData);
        };

        window.addEventListener('beforeunload', () => {
            if (eventSource) {
              eventSource.close();
            }
          });
      
          return () => {
            if (eventSource) {
              eventSource.close();
            }
            window.removeEventListener('beforeunload', () => {
              if (eventSource) {
                eventSource.close();
              }
            });
          };
    }, []);


    const [isSideOpen, setIsSideOpen] = useState(false);

    const handleSideTogle = () => {
        setIsSideOpen(!isSideOpen);
    };

    const sideWrapStyle = {
        left: isSideOpen ? "10px" : "-300px",
        transform: isSideOpen ? "translateX(0)" : "translateX(-10px)",
    };

    const sideBtnIconSttyle = {
        transform: isSideOpen ? "rotate(180deg)" : "rotate(0)",
    };
    return (
        <section className={side["side-wrap"]} style={sideWrapStyle}>
            <div className={side["side-btn"]} onClick={handleSideTogle}>
                <AiOutlineCaretRight
                    className={side["side-btn-icon"]}
                    style={sideBtnIconSttyle}
                    size={50}
                    color="#FFE649"
                />
            </div>
            <table className={side['hot-table']}>
                <thead className={side['hot-thead']}>
                    <th>순위</th>
                    <th>이름</th>
                    <th>평점</th>
                </thead>
                <tbody className={side['hot-tbody']}>
                    {rankingData.map((item, index) => (
                        <tr key={index}>
                            <th>{item.rank}<br/>
                            {item.delta !== 0 ? (
                            <div>
                                {item.delta > 0 ? (
                                <AiOutlineCaretUp className={side['arrow-icon-class-name']} />
                                ) : (
                                <AiOutlineCaretDown className={side['arrow-icon-class-name']} />
                                )}
                                <span className={side['delta-value']}>
                                    {item.delta < 0 ? -item.delta : item.delta}
                                </span>
                            </div>
                            ) : (
                            '-'
                            )}
                            </th>
                            <td>{item.name}</td>
                            <td>{item.score.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

export default Side;
