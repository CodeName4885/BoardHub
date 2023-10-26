export function GameDetailCategory({ categories }) {
    const categoryItems = categories?.map((c) => {
        return (
            <div
                className="mr-4 d-flex align-items-center justify-content-center"
                style={{
                    backgroundColor: "gray",
                    minHeight: 70,
                    width: 170,
                }}
            >
                <h4 style={{ fontWeight: "bold" }}>{c.category}</h4>
            </div>
        );
    });

    return (
        <div>
            <div className="mt-3">
                <h2 style={{ fontWeight: "bold" }}>주요 정보</h2>
            </div>
            <div className="row mt-2 ml-1">{categoryItems}</div>
        </div>
    );
}
