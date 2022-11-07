import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.use(cookieSession({ keys: ['encryptionString'] })); // set in AppModule.configure()
  // app.useGlobalPipes(new ValidationPipe({ whitelist: true }));  // set in appmodule

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
