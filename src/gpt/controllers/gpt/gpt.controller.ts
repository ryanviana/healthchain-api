import { Controller, Post, Body } from '@nestjs/common';
import { GptService } from 'src/gpt/services/gpt/gpt.service';

@Controller()
export class OpenaiController {
  constructor(private readonly gptService: GptService) {}

  @Post('gpt')
  async createChatCompletion(@Body('prompt') prompt: string) {
    // console.log(await this.gptService.generate(prompt).then((res) => res));
    return await this.gptService.generate(prompt).then((res) => res);
  }
}
