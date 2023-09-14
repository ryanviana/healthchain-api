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

  async analyzeSymptoms(prompt: string): Promise<any> {
    try {
      const openai = new OpenAI({ apiKey: this.apiKey });
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are a medical diagnosis API.' +
              'Based on a list of symptons you provide possible ICD-10 diagnoses along with their estimated percentage of certainty',
          },
          {
            role: 'system',
            content:
              'Return in the format: [{disease: string, chance: number}]. The chance must be calculated based on the symptoms provided. Return only the JSON without any further text or explanation.',
          },
          {
            role: 'system',
            content:
              'If the provided symptoms are not enough to provide a diagnosis, return a message informing the user that the symptoms are not enough to provide a diagnosis.',
          },
          {
            role: 'system',
            content:
              'if the symptoms are not valid, return a message informing the user that the symptoms are not valid.',
          },
          {
            role: 'system',
            content:
              'if the prompt is the same as the previous prompt, return the same response as the previous prompt.',
          },
          {
            role: 'system',
            content:
              'the user prompt will be something like this: ["symptom", "symptom", "symptom"]',
          },
          { role: 'user', content: prompt },
        ],
      });
      const responseList = response.choices[0].message.content;
      const responseJson = JSON.parse(responseList);
      return responseJson;
    } catch (error) {
      console.log('deu ruim: ', error);
    }
  }
}
