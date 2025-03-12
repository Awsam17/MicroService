import { Controller, Get , Query ,Inject , Body} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';
import { Request,Response } from './client.interface';
interface OpenaiGrpcService {
  send(data: Request): Promise<Response>;
}

@Controller('openai')
export class ClientController {
    private openaiService : OpenaiGrpcService;

    constructor(@Inject('OPENAI_SERVICE') private client:ClientGrpc) {}

    onModuleInit() {
      this.openaiService = this.client.getService<OpenaiGrpcService>('OpenaiService');
    }

    @Get('send')
    async request(@Body() data : Request): Promise<Response> {

      if (!data) {
          throw new Error("Data is missing in the request");
      }    
  
      console.log('HTTP Request Received:', data);
  
      return this.openaiService.send(data);
    }
}
