import { Inject, Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { IA_BROKER_AXIOS_INSTANCE } from 'src/common/constants';
import { Locality } from './locality.entity';

@Injectable()
export class LocalityService {
  constructor(
    @Inject(IA_BROKER_AXIOS_INSTANCE) private readonly aiBrokerApi: AxiosInstance,
  ) {}

  async findByProvinceId(id: string): Promise<Locality[]> {
    try {
      const apiResponse = await this.aiBrokerApi.get(`/ObtenerLocalidadesByIdProvincia/${id}`);

      return apiResponse.data;
    } catch (e) {
      throw new Error(e);
    }
  }
}
