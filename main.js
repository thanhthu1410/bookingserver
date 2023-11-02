"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const server = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: true,
    });
    server.enableCors();
    server.setGlobalPrefix('api');
    server.enableVersioning({
        type: common_1.VersioningType.URI,
        defaultVersion: '1',
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Booking example')
        .setDescription('Booking Salon API description')
        .setVersion('1.0')
        .addTag('Booking Salon')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(server, config);
    swagger_1.SwaggerModule.setup('api', server, document);
    server.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    await server.listen(process.env.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map