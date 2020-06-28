import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
    providedIn: 'root'
})
export class MessageService extends BaseService {
    constructor(httpClient: HttpClient) {
        super('message', httpClient)
    }

    sendMessage(username: string, message: string) {
        return this.post(`${username}/send-message`, message);
    }
}
