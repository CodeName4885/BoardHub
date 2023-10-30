export function GameDetailCategory({ categories }) {
    return (
        <div>
            <div>
                <h2 style={{ fontWeight: "bold" }}>카테고리</h2>
            </div>
            <div className="row mt-2 ml-1">
                {categories?.map((c) => {
                    return (
                        <div
                            key={c.categoryId}
                            className="mr-4 d-flex align-items-center justify-content-center"
                            style={{
                                backgroundColor: "gray",
                                minHeight: 70,
                                width: 170,
                            }}
                        >
                            <h4 style={{ fontWeight: "bold" }}>
                                {c.translate}
                            </h4>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
