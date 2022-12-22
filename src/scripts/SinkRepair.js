import { ServiceForm } from "./ServiceForm.js"
import { Requests, Completions } from "./Requests.js"


export const SinkRepair = () => {
    return `
        <h1>Maude and Merle's Sink Repair</h1>
        <section class="serviceForm">
            ${ServiceForm()}
        </section>

        <section class="serviceRequests">
            <h2>Service Requests</h2>
            ${Requests()}
        </section>
        <section class="completed">
        <h2>Completed Jobs</h2>
            ${Completions()}
        </section>
    `
}



