"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const server = require('http').createServer(app);
    const io = require('socket.io')(server);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map