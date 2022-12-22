import { fetchRequests, fetchCompletions, fetchPlumbers } from "./dataAccess.js"
import { SinkRepair } from "./SinkRepair.js"


const render = () => {
    fetchRequests()
        .then(() => fetchCompletions())
        .then(() => fetchPlumbers())
        .then(
            () => {
                mainContainer.innerHTML = SinkRepair()
            }
        )
}

render()


const mainContainer = document.querySelector("#container")

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)