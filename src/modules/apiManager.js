const apiURL = "http://localhost:5002/";

const jAPI = {
    getWithId(str, id) {
        return fetch(apiURL + str + "/" + id).then(entries => entries.json());
    },
    get(str) {
        return fetch(apiURL + str).then(entries => entries.json());
    },
    userMovieExpand(entity, userId) {
        return fetch(apiURL + entity + "?userId=" + userId + "&_expand=movie").then(entries => entries.json())
    },
    movieExpand(entity) {
        console.log(apiURL + entity + "?_expand=movie", "MOVIE EXPAND")
        return fetch(apiURL + entity + "?_expand=movie").then(entries => entries.json())
    },
    movieAndUserExpand(entity) {
        console.log(apiURL + entity + "?_expand=movie&_expand=user", "MOVIE USER EXPAND")
        return fetch(apiURL + entity + "?_expand=movie&_expand=user").then(entries => entries.json())
    },
    save(objToSave, str) {
        return fetch(apiURL + str, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(objToSave)
        })
            .then(savedObj => savedObj.json())
    },
    delete(objToDeleteId, str) {
        return fetch(`${apiURL}${str}/${objToDeleteId}`, {
            method: "DELETE"
        });
    },
    edit(objToEditId, str) {
        return fetch(apiURL + str + "/" + objToEditId).then(entry => entry.json());
    },
    update(objToEdit, str) {
        return fetch(`${apiURL}${str}/${objToEdit.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(objToEdit)
        });
    },
    expand(str, toExpand) {
        return fetch(`${apiURL}${str}/?_expand=${toExpand}`).then(entries => entries.json());
    },
    embedWithId(str, id, toEmbed) {
        return fetch(`${apiURL}${str}/${id}?_embed=${toEmbed}`).then(entries => entries.json());
    },
    patch(objToEdit, str, id) {
        return fetch(`${apiURL}${str}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(id, objToEdit)
        });
    },
}
export default jAPI;

