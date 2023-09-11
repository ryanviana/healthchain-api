import { Module } from '@nestjs/common';
import { GptService } from './services/gpt/gpt.service';
import { OpenaiController } from './controllers/gpt/gpt.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [OpenaiController],
  providers: [GptService],
})
export class GptModule {}
