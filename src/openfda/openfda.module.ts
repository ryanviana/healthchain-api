import { Module } from '@nestjs/common';
import { OpenfdaController } from './openfda.controller';
import { OpenfdaService } from './openfda.service';

@Module({
  controllers: [OpenfdaController],
  providers: [OpenfdaService]
})
export class OpenfdaModule {}
