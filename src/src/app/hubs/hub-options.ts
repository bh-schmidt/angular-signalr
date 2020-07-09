import * as signalR from '@aspnet/signalr';

export class HubOptions {
    logLevel?: signalR.LogLevel = signalR.LogLevel.None
    tryReconnectOnError?: boolean = false
    tryConnectInterval?: number = 60 * 1000
    maxAttemptsToConnect?: number = 30
    getBearerToken?: () => string
}