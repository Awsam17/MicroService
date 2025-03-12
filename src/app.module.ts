import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenaiModule } from './openai/openai.module';
import { ClientModule } from './client/client.module';

@Module({
  imports: [OpenaiModule, ClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
