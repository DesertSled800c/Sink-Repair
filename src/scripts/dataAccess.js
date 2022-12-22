const applicationState = {
    requests: [],
    plumbers: [],
    completions: []
}


const API = "http://localhost:8088"

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then((serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            })
}
export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(response => response.json())
        .then((data) => {
                applicationState.plumbers = data
            })
}
export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
        .then(response => response.json())
        .then((completions) => {
                applicationState.completions = completions
            })
}

fetchRequests()
fetchPlumbers()
fetchCompletions()

export const getRequests = () => {
    return [...applicationState.requests]
}
export const getPlumbers = () => {
    return [...applicationState.plumbers]
}
export const getCompletions = () => {
    return [...applicationState.completions]
}



export const sendRequest = (userServiceRequest) => {
    const mainContainer = document.querySelector("#container")
    const fetchOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(userServiceRequest)
    }
    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent('stateChanged'))
        })

}

export const saveCompletion = (serviceReciept) => {
    const mainContainer = document.querySelector("#container")
    const fetchOptions = {
        method: "Post",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify((serviceReciept))
    }
    return fetch(`${API}/completions`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const deleteRequest = (id) => {
    const mainContainer = document.querySelector("#container")
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

