import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
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
  async generate(prompt: string): Promise<any> {
    try {
      const openai = new OpenAI({ apiKey: this.apiKey });
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'system', content: prompt }],
      });
      console.log(response.choices[0].message.content);
      return response;
    } catch (error) {
      console.log('deu ruim: ', error);
    }
  }

  generateResponse(prompt: string): Observable<AxiosResponse> {
    const data = {
      prompt: prompt,
      max_tokens: 150,
      n: 1,
      stop: null,
      temperature: 1,
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    };

    return this.httpService.post(this.apiUrl, data, { headers: headers });
  }
}
