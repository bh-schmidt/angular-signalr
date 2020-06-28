import * as signalR from '@aspnet/signalr';

export class HubOptions {
    logLevel?: signalR.LogLevel = signalR.LogLevel.None
    tryReconnectOnError?: boolean = false
    tryReconnectInterval?: number = 10 * 60
    getBearerToken?: () => string
}