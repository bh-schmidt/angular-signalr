import * as signalR from '@aspnet/signalr';
import { environment } from 'src/environments/environment';
import { HubOptions } from './hub-options';

export abstract class HubService {
    protected hubConnection: signalR.HubConnection

    constructor(
        private route: string,
        private options = new HubOptions()) {
        console.log(options)
        this.buildConnection();
    }

    public buildConnection() {
        var builder = new signalR.HubConnectionBuilder()
            .withUrl(`${environment.backendUri}/hubs/${this.route}`, {
                accessTokenFactory: this.options.getBearerToken
            })

        if (this.options.logLevel)
            builder.configureLogging(this.options.logLevel)

        this.hubConnection = builder.build();
    }

    protected tryConnect(
        interval: number,
        onConnect: () => void = () => { },
        onError: (error: any) => void = () => { }) {
        this.connect()
            .then(onConnect)
            .catch(error => {
                onError(error)
                setTimeout(() => this.tryConnect(interval), interval)
            })
    }

    protected connect() {
        return this.hubConnection
            .start()
            .then(() => {
                if (this.options.tryReconnectOnError)
                    this.configureTryReconnectOnError();
            })
    }

    private configureTryReconnectOnError() {
        this.hubConnection.onclose(error => {
            console.log(error)
            if (error)
                this.tryConnect(this.options.tryReconnectInterval);
        })
    }
}
