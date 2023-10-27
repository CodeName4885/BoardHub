<<<<<<< HEAD
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
=======
import { API_URL } from "../Constants";

export async function fetchList(sort) {
    try {
        const response = await fetch(`${API_URL}game/list`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(sort),
>>>>>>> c78795c565dca992dd7c51979aa55b10585ea39d
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
<<<<<<< HEAD
=======
        return [];
>>>>>>> c78795c565dca992dd7c51979aa55b10585ea39d
    }
}

export async function fetchByGameId(gameId) {
    try {
<<<<<<< HEAD
        const response = await fetch(`${url}/${gameId}`, {
=======
        const response = await fetch(`${API_URL}game/${gameId}`, {
>>>>>>> c78795c565dca992dd7c51979aa55b10585ea39d
            method: "get",
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
<<<<<<< HEAD
=======
        return [];
    }
}

export async function getCategoriesById(gameId) {
    try {
        const response = await fetch(`${API_URL}game/${gameId}/categories`, {
            method: "get",
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
>>>>>>> c78795c565dca992dd7c51979aa55b10585ea39d
    }
}

export async function editGame(form) {
<<<<<<< HEAD
    const { gameId } = form;
    console.log(form);
    try {
        const response = await fetch(`${url}/${gameId}`, {
=======
    try {
        const response = await fetch(`${API_URL}game/${form.gameId}`, {
>>>>>>> c78795c565dca992dd7c51979aa55b10585ea39d
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
<<<<<<< HEAD
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
    try {
        const response = await fetch(`${url}/${gameId}/category`, {
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
=======
        return [];
>>>>>>> c78795c565dca992dd7c51979aa55b10585ea39d
    }
}
