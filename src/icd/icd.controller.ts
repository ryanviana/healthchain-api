import { Body, Controller, Get, Post } from '@nestjs/common';
import { IcdService } from './icd.service';

@Controller('icd')
export class IcdController {
  constructor(private readonly icdService: IcdService) {}

  @Post()
  async getSymptomList(@Body('symptoms') prompt: string) {
    return await this.icdService.getIcdSymptoms(prompt).then((res) => res);
  }
}
