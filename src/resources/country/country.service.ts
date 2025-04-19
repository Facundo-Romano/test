import { Inject, Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { IA_BROKER_AXIOS_INSTANCE } from 'src/common/constants';
import { Country } from './country.entity';

@Injectable()
export class CountryService {
  constructor(
    @Inject(IA_BROKER_AXIOS_INSTANCE) private readonly aiBrokerApi: AxiosInstance,
  ) {}

  async findAll(): Promise<Country[]> {
    try {
      const apiResponse = await this.aiBrokerApi.get(`/Paises`);

      return apiResponse.data;
    } catch (e) {
      throw new Error(e);
    }
  }}
