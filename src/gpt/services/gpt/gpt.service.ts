import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';
dotenv.config();

@Injectable()
export class GptService {
  private readonly apiKey: string;
  private readonly apiUrl: string;

  constructor(private readonly httpService: HttpService) {
    this.apiKey = process.env.OPENAI_API_KEY;
    this.apiUrl = 'https://api.openai.com/v1/chat/completions';
  }

  async getModels(): Promise<any> {
    try {
      const openai = new OpenAI({ apiKey: this.apiKey });
      const list = await openai.models.list();
      const models = list.data;
      for await (const model of list) {
        console.log(model);
      }
      return models;
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  async analyzeSymptoms(prompt: string): Promise<any> {
    try {
      const openai = new OpenAI({ apiKey: this.apiKey });
      const response = await openai.chat.completions.create({
        // model: 'gpt-3.5-turbo',
        model: 'gpt-4',
        temperature: 0.0,
        // top_p: 0.1,
        messages: [
          {
            role: 'system',
            content:
              'Analyze the list of symptoms provided by the user and return only a JSON structured as [{disease: string, chance: number}], where the chance value should be a decimal between 0 and 1, rounded to two decimal places (e.g., 0.32), not using multiples of 5 or 0. Do not provide any additional text or explanations. Handle insufficient, invalid, or repeated symptoms appropriately within the JSON format. Begin analysis immediately after receiving user input.',
          },
          { role: 'user', content: prompt },
        ],
      });
      const responseList = response.choices[0].message.content;
      const responseJson = JSON.parse(responseList);
      return responseJson;
    } catch (error) {
      console.log('Error: ', error);
    }
  }
}
