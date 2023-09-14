import { Body, Controller, Get } from '@nestjs/common';
import { IcdService } from './icd.service';

@Controller('icd')
export class IcdController {
  constructor(private readonly icdService: IcdService) {}

  @Get()
  async getSymptomList(@Body('symptoms') prompt: string) {
    // return await this.icdService.getIcdSymptoms(prompt).then((res) => res);
    return await this.icdService.getIcdSymptoms(prompt).then((res) => res);
  }
}
