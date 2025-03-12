import { Body, Controller } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Request, Response } from './openai.interface';

@Controller()
export class OpenaiController {
    constructor (private readonly openaiService: OpenaiService){}

    @GrpcMethod('OpenaiService', 'send')
    async request(data: Request): Promise<Response> {
        console.log("Incoming data:", JSON.stringify(data, null, 2));

        if (!data) {
            throw new Error("Data is missing in the request");
        }

        return this.openaiService.sendMessage(data);
    }
}
