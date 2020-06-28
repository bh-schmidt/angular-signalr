import { environment } from 'src/environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http'

const options = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}

export abstract class BaseService {
    constructor(
        private controller: string,
        protected httpClient: HttpClient) {

    }

    post(route: string, body: any) {
        const json = JSON.stringify(body)

        this.httpClient.post(`${environment.backendUri}/api/${this.controller}/${route}`, json, options)
            .subscribe(() => {
            }, err => {
                console.log(err)
            })
    }
}