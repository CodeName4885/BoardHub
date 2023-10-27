// import { MdOutlineArrowBackIosNew } from "react-icons/md";

export function GameDetailCompare({ game }) {
    // 현재 게임에 이미지로 되어있는데 나중에 난이도별로 3개 받아서 뿌려야함
    const levelItems = (
        <div
            className="mt-3 ml-1 col-md-4"
            style={{
                backgroundImage: `url("${game?.image}")`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                maxWidth: 320,
                minHeight: 320,
            }}
        ></div>
    );

    return (
        <>
            <div className="mt-5">
                <h2 style={{ fontWeight: "bold" }}>게임 난이도 비교</h2>
            </div>
            <div className="row align-items-center">
                {levelItems}{" "}
                {/* <MdOutlineArrowBackIosNew style={{ fontSize: 50 }} /> */}
                {levelItems}
                {/* <MdOutlineArrowBackIosNew style={{ fontSize: 50 }} /> */}
                {levelItems}
            </div>
        </>
    );
}
