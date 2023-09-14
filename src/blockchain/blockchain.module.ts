import { Module } from '@nestjs/common';
import { BlockchainController } from './blockchain.controller';
import { ServiceController } from './service.controller';
import { BlockchainService } from './blockchain.service';

@Module({
  controllers: [BlockchainController, ServiceController],
  providers: [BlockchainService],
})
export class BlockchainModule {}
