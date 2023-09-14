import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { firstValueFrom, lastValueFrom } from 'rxjs';
dotenv.config();

@Injectable()
export class IcdService {
  private readonly apiUrl = 'http://id.who.int/icd/entity';
  private readonly scope = 'icdapi_access';
  private readonly tokenEndpoint =
    'https://icdaccessmanagement.who.int/connect/token';
  private readonly clientId = process.env.ICD_CLIENT_ID;
  private readonly clientSecret = process.env.ICD_CLIENT_SECRET;
  private accessToken: string;

  constructor(private readonly httpService: HttpService) {}

  async getToken(): Promise<string> {
    const req = this.httpService.post(
      this.tokenEndpoint,
      `grant_type=client_credentials&client_id=${this.clientId}&client_secret=${this.clientSecret}&scope=${this.scope}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    const token = (await lastValueFrom(req)).data.access_token;
    return token;
  }

  async getIcdSymptoms(symptom: string): Promise<any> {
    const queryUrl =
      this.apiUrl + '/search?q=' + symptom + '&useFlexisearch=true';
    return await this.fetchData(queryUrl);
  }

  async getIcdDiagnosisById(id: string): Promise<any> {
    const queryUrl = this.apiUrl + '/' + id;
    return await this.fetchData(queryUrl);
  }

  private extractNumberFromUrl(url: string): string | null {
    // Define a regular expression to match numbers at the end of the URL
    const regex = /(\d+)$/;

    // Use the regular expression to extract the number
    const match = url.match(regex);

    // Check if a match was found and return the number or null
    if (match) {
      return match[1];
    } else {
      return null;
    }
  }

  private fixName(input: string): string {
    const emRegex = /<em class='found'>(.*?)<\/em>/g;
    const formattedText = input.replace(emRegex, (_, match) => {
      return `${match}`;
    });

    return formattedText;
  }

  async fetchData(queryUrl: string) {
    this.accessToken = await this.getToken();

    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
      Accept: 'application/json',
      'Accept-Language': 'en',
      'API-Version': 'v2',
    };

    const req = this.httpService.get(queryUrl, { headers });
    const data = await lastValueFrom(req);
    const response = data.data.destinationEntities.map((e) => {
      return {
        id: this.extractNumberFromUrl(e.stemId),
        name: this.fixName(e.title),
        leaf: e.isLeaf,
      };
    });
    return response.filter((item: { leaf: boolean }) => item.leaf === true);
  }
}
