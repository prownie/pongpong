"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const gameGateway_functions_1 = require("./gameGateway.functions");
let GameGateway = class GameGateway {
    constructor() {
        this.logger = new common_1.Logger('GameGateway');
    }
    handleMessage(client, message) {
        client.broadcast.emit('gameToClient', message);
    }
    handleStartMatchmaking(client, message) {
        var roomid = gameGateway_functions_1.generateRoomId();
        client.data.username = message.username;
        client.join(message.matchtype);
        console.log(this.wss.adapter());
        console.log('client', client.data.username, 'joined matchmaking for :', message.matchtype);
        client.emit('inQueue', { name: "badGuy" });
    }
    afterInit(server) {
        this.logger.log('Initialized!');
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    handleConnection(client, ...args) {
        this.logger.log(`Client connected: ${client.id}`);
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", socket_io_1.Server)
], GameGateway.prototype, "wss", void 0);
__decorate([
    websockets_1.SubscribeMessage('gameToServer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "handleMessage", null);
__decorate([
    websockets_1.SubscribeMessage('startMatchmaking'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "handleStartMatchmaking", null);
GameGateway = __decorate([
    websockets_1.WebSocketGateway(3001)
], GameGateway);
exports.GameGateway = GameGateway;
//# sourceMappingURL=game.gateway.js.map