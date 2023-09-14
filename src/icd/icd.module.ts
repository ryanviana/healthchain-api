import { Module } from '@nestjs/common';
import { IcdService } from './icd.service';
import { HttpModule } from '@nestjs/axios';
import { IcdController } from './icd.controller';

@Module({
  imports: [HttpModule],
  providers: [IcdService],
  controllers: [IcdController],
})
export class IcdModule {}
