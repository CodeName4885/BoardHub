import { API_URL } from "../Constants";

export async function fetchList(sort) {
    try {
        const response = await fetch(`${API_URL}game/list`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(sort),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function fetchByGameId(gameId) {
    try {
        const response = await fetch(`${API_URL}game/${gameId}`, {
            method: "get",
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
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
    }
}

export async function editGame(form) {
    try {
        const response = await fetch(`${API_URL}game/${form.gameId}`, {
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
        return [];
    }
}
