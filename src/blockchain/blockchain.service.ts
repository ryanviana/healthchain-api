import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class BlockchainService {
  private provider: ethers.providers.JsonRpcProvider;

  async getProvider(): Promise<ethers.providers.JsonRpcProvider> {
    if (!this.provider) {
      this.provider = new ethers.providers.JsonRpcProvider(
        process.env.SEPOLIA_API_URL,
      );
    }
    return this.provider;
  }

  async getContract(): Promise<any> {
    const provider = await this.getProvider();
    const contract = new ethers.Contract(
      process.env.SEPOLIA_CONTRACT_ADDRESS,
      process.env.SEPOLIA_CONTRACT_ABI,
      provider,
    );
    return contract;
  }

  async runContractFunction(functionName: string, args: any[]): Promise<any> {
    const contract = await this.getContract();
    const response = await contract[functionName](...args);
    return response;
  }
}
