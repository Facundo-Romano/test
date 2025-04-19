import { Inject, Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { IA_BROKER_AXIOS_INSTANCE } from 'src/common/constants';
import { Sex } from './sex.entity';

@Injectable()
export class SexService {
  constructor(
    @Inject(IA_BROKER_AXIOS_INSTANCE) private readonly aiBrokerApi: AxiosInstance,
  ) {}

  async findAll(): Promise<Sex[]> {
    try {
      const apiResponse = await this.aiBrokerApi.get(`/Sexo`);

      return apiResponse.data;
    } catch (e) {
      throw new Error(e);
    }
  }
}
