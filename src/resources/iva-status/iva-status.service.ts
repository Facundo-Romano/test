import { Inject, Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { IA_BROKER_AXIOS_INSTANCE } from 'src/common/constants';
import { IvaStatus } from './iva-status.entity';

@Injectable()
export class IvaStatusService {
  constructor(
    @Inject(IA_BROKER_AXIOS_INSTANCE) private readonly aiBrokerApi: AxiosInstance,
  ) {}

  async findAll(): Promise<IvaStatus[]> {
    try {
      const apiResponse = await this.aiBrokerApi.get(`/SituacionIva`);

      return apiResponse.data;
    } catch (e) {
      throw new Error(e);
    }
  }
}
