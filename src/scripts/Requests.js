import { saveCompletion, getRequests, deleteRequest, getPlumbers, getCompletions } from "./dataAccess.js"


export const Requests = () => {
    const requests = getRequests()
    let html = `
        <ul>
            ${requests.map(convertRequestToListElement).join("")}
        </ul>
    `
    return html
}

export const convertRequestToListElement = (request) => {
    const plumbers = getPlumbers()
    return `
    <li>
        ${request.description}
        <select class="plumbers" id="plumbers">
    <option value="">Choose</option>
    ${
        plumbers.map(plumber => {
                return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
            }).join("")
    }
</select>
        <button class="request__delete"
                id="request--${request.id}">
            Delete
        </button>
    </li>
`
}

export const Completions = () => {
    const completed = getCompletions()
    return completed.map((complete) => {
            return `<li>Order ${complete.id} has been completed</li>`
        })
}


const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})
mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")
            
            const request = requestId
            const plumber = plumberId 
            const date = request.neededBy
            const completion = { 
                requestId: request,
                plumberId: plumber,
                neededBy: date
            }
            saveCompletion(completion)
        }
    }
)

