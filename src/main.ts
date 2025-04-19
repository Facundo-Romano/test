import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { AppModule } from "./app.module"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn", "log", "debug", "verbose"],
  })
  const configService = app.get(ConfigService)

  //Config swagger
  const config = new DocumentBuilder()
    .setTitle('Safer be')
    .setDescription('Endpoints de la API')
    .setVersion('1.0')
    .addTag('auth')
    .addBearerAuth()
    .addServer(`${configService.get<string>("BASE_URL") || 'http://149.50.149.81/api'}`) 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.enableCors()
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  )

  const port = configService.get<number>("PORT") || 5000
  await app.listen(port)
  console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()

