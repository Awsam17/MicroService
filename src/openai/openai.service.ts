import { Injectable } from '@nestjs/common';
import { Request, Response } from './openai.interface';
import * as dotenv from 'dotenv';
import { OpenAI } from "openai";
import { wrapOpenAI } from "langsmith/wrappers";

dotenv.config();


@Injectable()
export class OpenaiService {
    private openai: OpenAI;

    constructor() {
        this.openai = wrapOpenAI(new OpenAI({
            apiKey : process.env.OPENAI_API_KEY
        }));
    
    }

    
    async sendMessage(data: Request): Promise<Response> {
        try {

            if (!data) {
                throw new Error('Invalid message: expected a non-empty string');
            }
            const prompt = `
                You are an assistant that evaluates how well customer service agent in a company answers
                a user questions by comparing the response of the agent to the expert (ideal) response for each question from the user .
                You're given the history messages between that are between the user and the agent, also the company data is used by this agent .

                You should compare between each answer from the agent to the ideal answer for each question from the user in the Message History .

                Compare based on the given criterias between triple dashes . 

                ---
                1. the agent answer is a subset of expert answer and is proportionate with it .
                2. the agent answer is a superset of expert answer and is proportionate with it .
                3. there is a common information between the agent answer and expert answer .
                4. there is a differ, but this difference doesn't affect the process . 
                5. there is a conflict between the agent answer and the expert answer .
                --- 

                You should output the score for each answer that describes how well the agent answers the user question compared
                to the expert answer, also output the reason of that score by showing the details of comparing .
                Stick to the given output format .

                Output a list of json objects, where each one of the objects has the following format :
                    'score' : <percentage that describes the quality of the agent answer compared
                        to the expert answer for each question based on the criterias e.g. 75.0,66.5,...>
                    'reason' : <which descirbes the reason for the given score
                        e.g. (for 60.0 score) the agent didn't mention the price of the item .>


                You are comparing based on given data delimited by triple double quotes .

                """
                [MESSAGE HISTORY] : ${data.msgHist}
                
                [AGENT OUTPUT] : ${data.agentOutput}
                
                [COMPANY DATA] : ${data.companyData}
                
                [EXPERT] : ${data.ideal}
                """
                
            `

            const response = await this.openai.chat.completions.create({
                model : "gpt-4o-mini",
                messages : [{role : "user",content : prompt}],
                temperature : 0
            });

            const content = response.choices[0].message.content || "" ;

            return { response: content };
        } catch (error) {
            console.error('Error calling OpenAI API:', error);
            throw new Error('Failed to fetch response from OpenAI');
        }
    }
}