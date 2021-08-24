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
const socket_service_1 = require("../socket.service");
const movePad_interface_1 = require("../interfaces/movePad.interface");
const moveBall_interface_1 = require("../interfaces/moveBall.interface");
let GameGateway = class GameGateway {
    constructor(socketService) {
        this.socketService = socketService;
        this.logger = new common_1.Logger('GameGateway');
    }
    handleGameToServer(client, gameData) {
        this.socketService.sendGameData(client, gameData);
    }
    handleMovePad(client, movePad) {
        this.socketService.movePad(client, movePad);
    }
    handleMoveBall(client, moveBall) {
        this.socketService.moveBall(client, moveBall);
    }
    handleStartMatchmaking(client, message) {
        this.socketService.joinMatchMaking(client, message);
    }
    handlePlayerReady(client) {
        this.socketService.setPlayerReady(client);
    }
    afterInit(server) {
        this._server = server;
        this.socketService.init(this._server);
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    handleConnection(client, ...args) {
        this.logger.log(`Client connected: ${client.id}`);
    }
};
__decorate([
    websockets_1.SubscribeMessage('gameToServer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "handleGameToServer", null);
__decorate([
    websockets_1.SubscribeMessage('movePad'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "handleMovePad", null);
__decorate([
    websockets_1.SubscribeMessage('moveBall'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "handleMoveBall", null);
__decorate([
    websockets_1.SubscribeMessage('startMatchmaking'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "handleStartMatchmaking", null);
__decorate([
    websockets_1.SubscribeMessage('playerReady'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "handlePlayerReady", null);
GameGateway = __decorate([
    websockets_1.WebSocketGateway(3001),
    __metadata("design:paramtypes", [socket_service_1.SocketService])
], GameGateway);
exports.GameGateway = GameGateway;
//# sourceMappingURL=game.gateway.js.map