import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ValidateTokenInterceptor } from './validate/validate-jwt-token';
import { JwtService } from '@nestjs/jwt';
import { connectProducer } from './kafka/producer';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // remove unknown fields
      forbidNonWhitelisted: true, // throw error if extra fields
      transform: true,            // auto transform DTO types
    }),
  );
  app.useGlobalInterceptors(new ValidateTokenInterceptor())
  const port = process.env.PORT ? Number(process.env.PORT) : 2026;
  
  await app.listen(port);

  const logger = new Logger('Bootstrap');
  logger.log(`order-service is running on: http://localhost:${process.env.PORT ?? 3000}`);
  await connectProducer(); // ✅ connect Kafka

}
bootstrap();
