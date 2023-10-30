const URL = "http://localhost:8080/api/game";

export async function fetchList(sort) {
    const { tab, category } = sort;
    const query = `tab=${tab}&cat=${category}`;
    try {
        const response = await fetch(`${URL}/list?${query}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function fetchByGameId(gameId) {
    try {
        const response = await fetch(`${URL}/${gameId}`, {
            method: "get",
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function editGame(form) {
    const { gameId } = form;
    try {
        const response = await fetch(`${URL}/${gameId}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function createGame(form) {
    try {
        const response = await fetch(`${URL}/create`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function fetchAllCategories() {
    try {
        const response = await fetch(`${URL}/categories`, {
            method: "get",
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function fetchCategoriesByGameId(gameId) {
    try {
        const response = await fetch(`${URL}/${gameId}/category`, {
            method: "get",
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function fetchAllMechanics() {
    try {
        const response = await fetch(`${URL}/mechanics`, {
            method: "get",
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function fetchMechanicsByGameId(gameId) {
    try {
        const response = await fetch(`${URL}/${gameId}/mechanic`, {
            method: "get",
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function fetchAllDesigners() {
    try {
        const response = await fetch(`${URL}/designers`, {
            method: "get",
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function fetchDesignersByGameId(gameId) {
    try {
        const response = await fetch(`${URL}/${gameId}/designer`, {
            method: "get",
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function fetchAllArtists() {
    try {
        const response = await fetch(`${URL}/artists`, {
            method: "get",
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function fetchArtistsByGameId(gameId) {
    try {
        const response = await fetch(`${URL}/${gameId}/artist`, {
            method: "get",
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function fetchAllPublishers() {
    try {
        const response = await fetch(`${URL}/publishers`, {
            method: "get",
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function fetchPublishersByGameId(gameId) {
    try {
        const response = await fetch(`${URL}/${gameId}/publisher`, {
            method: "get",
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function fetchAllDataByGameId(gameId) {
    try {
        const response = await fetch(`${URL}/data/${gameId}`, {
            method: "get",
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function fetchAllData() {
    try {
        const response = await fetch(`${URL}/data`, {
            method: "get",
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function fetchCommentsByGameId(gameId) {
    try {
        const response = await fetch(`${URL}/comment/${gameId}`, {
            method: "get",
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function saveGameComment(params) {
    const { gameId } = params;
    try {
        const response = await fetch(`${URL}/comment/${gameId}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
