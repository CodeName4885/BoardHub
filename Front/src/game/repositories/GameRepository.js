const url = "http://localhost:8080/api/game";

export async function fetchList(sort) {
    const { tab, category } = sort;
    const query = `tab=${tab}&cat=${category}`;
    try {
        const response = await fetch(`${url}/list?${query}`, {
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
        const response = await fetch(`${url}/${gameId}`, {
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
    console.log(form);
    try {
        const response = await fetch(`${url}/${gameId}`, {
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
        const response = await fetch(`${url}/create`, {
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
        const response = await fetch(`${url}/categories`, {
            method: "get",
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function fetchCategoriesByGameId(gameId) {
    console.log("fetchcategory");
    try {
        const response = await fetch(`${url}/${gameId}/category`, {
            method: "get",
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function fetchAllMechanics() {
    try {
        const response = await fetch(`${url}/mechanics`, {
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
        const response = await fetch(`${url}/${gameId}/mechanic`, {
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
        const response = await fetch(`${url}/designers`, {
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
        const response = await fetch(`${url}/${gameId}/designer`, {
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
        const response = await fetch(`${url}/artists`, {
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
        const response = await fetch(`${url}/${gameId}/artist`, {
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
        const response = await fetch(`${url}/publishers`, {
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
        const response = await fetch(`${url}/${gameId}/publisher`, {
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
        const response = await fetch(`${url}/data/${gameId}`, {
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
        const response = await fetch(`${url}/data`, {
            method: "get",
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
