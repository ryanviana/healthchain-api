import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OpenfdaService {
  async fetchDrugByPartialName(query: string): Promise<any> {
    try {
      const response = await axios.get(
        `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${query}&limit=10`,
        // `https://api.fda.gov/drug/label.json?search:${query}&limit=10`,
      );
      //   return response.data.results.map((result) => result.openfda.brand_name);
      return response.data.results.map(
        (result: { openfda: any }) => result.openfda,
      );
    } catch (error) {
      throw new HttpException(
        'Error fetching data from OpenFDA',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async fetchData(endpoint: string): Promise<any> {
    try {
      const response = await axios.get(`https://api.fda.gov/${endpoint}`);
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Error fetching data from OpenFDA',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
