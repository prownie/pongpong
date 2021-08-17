"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const session = require("express-session");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const server = require('http').createServer(app);
    const io = require('socket.io')(server);
    const sessionMiddleware = session({
        secret: 'ft_transcendance',
        resave: false,
        saveUninitialized: false,
    });
    app.use(sessionMiddleware);
    io.use((socket, next) => {
        sessionMiddleware(socket.request, {}, next);
    });
    io.on('connection', (socket) => {
        const session = socket.request.session;
        session.connections++;
        session.save();
    });
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map