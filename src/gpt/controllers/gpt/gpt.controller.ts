import { Controller, Post, Body } from '@nestjs/common';
import { GptService } from 'src/gpt/services/gpt/gpt.service';

@Controller()
export class OpenaiController {
  constructor(private readonly gptService: GptService) {}

  @Post('gpt')
  async createChatCompletion(@Body('symptoms') prompt: string) {
    return await this.gptService.analyzeSymptoms(prompt).then((res) => res);
  }
}
