import { Inject, Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { IA_BROKER_AXIOS_INSTANCE } from 'src/common/constants';
import { ClientType } from './client-type.entity';

@Injectable()
export class ClientTypeService {
  constructor(
    @Inject(IA_BROKER_AXIOS_INSTANCE) private readonly aiBrokerApi: AxiosInstance,
  ) {}

  async findAll(): Promise<ClientType[]> {
    try {
      const apiResponse = await this.aiBrokerApi.get(`/TipoCliente`);

      return apiResponse.data;
    } catch (e) {
      throw new Error(e);
    }
  }
}
