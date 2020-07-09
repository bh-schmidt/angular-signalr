import * as signalR from '@aspnet/signalr';
import { environment } from 'src/environments/environment';
import { HubOptions } from './hub-options';

export abstract class HubService {
    protected hubConnection: signalR.HubConnection

    constructor(
        private route: string,
        private options: HubOptions) {
        this.options = {...new HubOptions(), ...options}
        this.buildConnection();
    }

    protected buildConnection() {
        var builder = new signalR.HubConnectionBuilder()
            .withUrl(`${environment.backendUri}/hubs/${this.route}`, {
                accessTokenFactory: this.options.getBearerToken
            })

        if (this.options.logLevel)
            builder.configureLogging(this.options.logLevel)

        this.hubConnection = builder.build();
    }

    protected async connect() {
        await this.hubConnection
            .start();

        if (this.options.tryReconnectOnError)
            this.configureTryReconnectOnError();
    }

    protected disconnect() {
        return this.hubConnection
            .stop()
    }

    protected tryConnect(
        attemptNumber: number,
        onConnect: () => void = () => { },
        onError: (error: any) => void = () => { }) {
        if (attemptNumber > this.options.maxAttemptsToConnect)
            return;
        attemptNumber += 1

        this.connect()
            .then(onConnect)
            .catch(error => {
                onError(error)
                setTimeout(() => this.tryConnect(attemptNumber), this.options.tryConnectInterval)
            })
    }
    
    private configureTryReconnectOnError() {
        this.hubConnection.onclose(error => {
            console.error(error)
            if (error)
                this.tryConnect(1);
        })
    }
}
