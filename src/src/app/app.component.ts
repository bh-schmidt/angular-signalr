import { Component, OnInit } from '@angular/core';
import { MessageHubService } from './hubs/message.hub';
import { Message } from './message';
import { MessageService } from './services/message.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    username = ''
    message = ''
    messages: Message[] = []

    constructor(
        private messageSignalRService: MessageHubService,
        private mesageService: MessageService) { }

    ngOnInit() {
        this.messageSignalRService.messageEmmiter
            .subscribe((message: Message) => {
                if (message)
                    this.messages.push(message)
            })
    }

    sendMessage() {
        this.mesageService.sendMessage(this.username, this.message);
    }
}
