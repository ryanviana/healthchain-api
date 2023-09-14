import { Controller, Get, Query } from '@nestjs/common';
import { OpenfdaService } from './openfda.service';

@Controller('openfda')
export class OpenfdaController {
  constructor(private readonly openfdaService: OpenfdaService) {}

  @Get()
  async fetchData(@Query('endpoint') endpoint: string) {
    return await this.openfdaService.fetchData(endpoint);
  }

  @Get('/search')
  async searchDrug(@Query('name') name: string) {
    return await this.openfdaService.fetchDrugByPartialName(name);
  }
}
