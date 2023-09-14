import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GptModule } from './gpt/gpt.module';
import { IcdModule } from './icd/icd.module';
import { OpenfdaModule } from './openfda/openfda.module';
import { BlockchainModule } from './blockchain/blockchain.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    GptModule,
    IcdModule,
    OpenfdaModule,
    BlockchainModule,
  ],
})
export class AppModule {}
