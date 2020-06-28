import { EventEmitter, Injectable } from '@angular/core';
import { Message } from '../message';
import { HubService } from './base.hub';

@Injectable({
    providedIn: 'root'
})
export class MessageHubService extends HubService {
    messageEmmiter = new EventEmitter<Message>()

    constructor() {
        super('message-hub', {
            tryReconnectOnError: true,
            getBearerToken: () => this.getBearerToken()
        })

        const timeToReconnect = 10 * 60
        this.tryConnect(timeToReconnect, () => this.registerSignalEvents(), error => console.log(error))
    }

    private registerSignalEvents() {
        this.hubConnection
            .on('SendMessage', (username: string, message: string) => {
                this.messageEmmiter.emit({ username, message })
            })
    }

    private getBearerToken() {
        return Math.floor(Math.random() * 100000000).toString()
    }
}
