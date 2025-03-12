import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport , MicroserviceOptions } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.GRPC,
        options: {
            package: 'openai',
            protoPath: join(__dirname, '../protos/openai.proto'),
            url: '127.0.0.1:50052', // Change port to avoid conflicts with HTTP
        },
    });

    await app.startAllMicroservices();
    await app.listen(3000); // Start HTTP server

    console.log('🚀 HTTP server running on port 3000');
    console.log('🚀 gRPC chatbot service running on port 50052');
}
bootstrap();
