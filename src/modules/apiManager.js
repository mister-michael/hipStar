const apiURL = "http://localhost:5002/";

const jAPI = {
    getWithId(str, userId) {
        return fetch(apiURL + str + "/" + userId).then(entries => entries.json());
    },
    get(str) {
        return fetch(apiURL + str).then(entries => entries.json());
    },
    getLoveHate(movieId, userId) {

    },
    save(objToSave, str) {
        return fetch(apiURL + str, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(objToSave)
        })
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
      getFriendList: (userId) => {
        return fetch (`${apiURL}friendships/?_expand=user&activeId=${userId}`)
        .then(r=>r.json());
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
            body: JSON.stringify(objToEdit)
        });
    }, 
}
export default jAPI;

