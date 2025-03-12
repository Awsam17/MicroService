import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports : [
   ClientsModule.register([
      {
        name : 'OPENAI_SERVICE',
        transport : Transport.GRPC,
        options : {
          package : 'openai',
          protoPath : join(__dirname, '../../protos/openai.proto'), 
          url : '127.0.0.1:50052'
        }
      }
    ]),
  ],
  controllers: [ClientController]
})
export class ClientModule {}
