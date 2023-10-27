import Logo from "../static/game-warrior/img/BoardHub-Logo-Tp.png";
import { useState } from "react";
import TermModal from "./TermModal";
import UserTermModal from "./UserTermModal";
import joincss from "../static/game-warrior/css/join.module.css";

function JoinAgree() {
    const [modalOpen1, setModalOpen1] = useState(false);
    const [sectionDisplay, setSectionDisplay] = useState("block");
    const [bgc, setBgc] = useState("#ffffff");

    const showModal1 = () => {
        setModalOpen1(true);
        setSectionDisplay("none");
        setBgc("#00000099");
    };
    const [modalOpen2, setModalOpen2] = useState(false);

    const showModal2 = () => {
        setModalOpen2(true);
        setSectionDisplay("none");
        setBgc("#00000099");
    };

    const [allChecked, setAllChecked] = useState(false);
    const [serviceChecked, setServiceChecked] = useState(false);
    const [userinfoChecked, setUserinfoChecked] = useState(false);
    const handleAllChecked = (e) => {
        setAllChecked(e.target.checked);
        setServiceChecked(e.target.checked);
        setUserinfoChecked(e.target.checked);
    };

    const isButtonDisabled = !(serviceChecked && userinfoChecked);
    const entry = () => {
        window.location.href = "http://localhost:3000/entry-info";
    };
    return (
        <>
            <div className={joincss["body"]} style={{ backgroundColor: bgc }}>
                <section
                    className={joincss["wrap"]}
                    style={{ display: sectionDisplay }}
                >
                    <div
                        className={joincss["logo"]}
                        style={{
                            backgroundImage: `url(${Logo})`,
                            width: "200px",
                            height: "200px",
                            backgroundSize: "cover",
                        }}
                    ></div>
                    <div className={joincss["all-ck"]}>
                        <input
                            id="all_ck"
                            className={joincss["agree-ckbox"]}
                            type="checkbox"
                            checked={allChecked}
                            onChange={handleAllChecked}
                        />
                        <label htmlFor="all_ck">
                            <div className={joincss["cktext-box"]}>
                                <span className={joincss["cktext"]}>
                                    모두 동의
                                </span>
                            </div>
                        </label>
                    </div>
                    <div className={joincss["service-agree"]}>
                        <input
                            id="service-ck"
                            className={joincss["agree-ckbox"]}
                            type="checkbox"
                            checked={serviceChecked}
                            onChange={(e) =>
                                setServiceChecked(e.target.checked)
                            }
                        />
                        <label htmlFor="service-ck">
                            <div className={joincss["cktext-box"]}>
                                <span className={joincss["cktext"]}>
                                    &#91;BoardHub&#93; 서비스 약관 동의
                                </span>
                            </div>
                        </label>
                        <div className={joincss["view-terms"]}>
                            <button
                                className={joincss["termsbtn"]}
                                onClick={showModal1}
                            >
                                &gt;
                            </button>
                        </div>
                    </div>
                    <div className={joincss["userinfo-collect-agree"]}>
                        <input
                            id="info-ck"
                            className={joincss["agree-ckbox"]}
                            type="checkbox"
                            checked={userinfoChecked}
                            onChange={(e) =>
                                setUserinfoChecked(e.target.checked)
                            }
                        />
                        <label htmlFor="info-ck">
                            <div className={joincss["cktext-box"]}>
                                <span className={joincss["cktext"]}>
                                    &#91;BoardHub&#93; 개인정보 수집 및 이용동의
                                </span>
                            </div>
                        </label>
                        <div className={joincss["view-terms"]}>
                            <button
                                className={joincss["termsbtn"]}
                                onClick={showModal2}
                            >
                                &gt;
                            </button>
                        </div>
                    </div>
                    <button
                        className={`${joincss["agree-after-btn"]} ${
                            isButtonDisabled ? joincss["disabled"] : ""
                        }`}
                        disabled={isButtonDisabled}
                        onClick={entry}
                    >
                        동의 후 계속하기
                    </button>
                </section>
                {modalOpen1 && (
                    <TermModal
                        setModalOpen1={setModalOpen1}
                        setSectionDisplay={setSectionDisplay}
                        setBgc={setBgc}
                    />
                )}
                {modalOpen2 && (
                    <UserTermModal
                        setModalOpen2={setModalOpen2}
                        setSectionDisplay={setSectionDisplay}
                        setBgc={setBgc}
                    />
                )}
            </div>
        </>
    );
}

export default JoinAgree;
