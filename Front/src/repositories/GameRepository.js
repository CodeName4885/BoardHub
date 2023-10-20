import { API_URL } from "../Constants";

const url = API_URL + "game";

export async function fetchList(sort) {
    console.log("asdasd");
    try {
        const response = await fetch(`${url}/list`, {
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

export async function getCategoriesById(gameId) {
    try {
        const response = await fetch(`${url}/${gameId}/categories`, {
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
        const response = await fetch(`${url}/${form.gameId}`, {
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

export async function getCategoriesByGameId(gameId) {
    try {
        const response = await fetch(`${url}/${gameId}/category`, {
            method: "get",
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getMechaicsByGameId(gameId) {
    try {
        const response = await fetch(`${url}/${gameId}/mechanic`, {
            method: "get",
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getDesignersByGameId(gameId) {
    try {
        const response = await fetch(`${url}/${gameId}/designer`, {
            method: "get",
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getArtistsByGameId(gameId) {
    try {
        const response = await fetch(`${url}/${gameId}/artist`, {
            method: "get",
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getPublisherByGameId(gameId) {
    try {
        const response = await fetch(`${url}/${gameId}/publisher`, {
            method: "get",
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}
