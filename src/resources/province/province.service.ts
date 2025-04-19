import { Inject, Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { IA_BROKER_AXIOS_INSTANCE } from 'src/common/constants';
import { Province } from './province.entity';

@Injectable()
export class ProvinceService {
  constructor(
    @Inject(IA_BROKER_AXIOS_INSTANCE) private readonly aiBrokerApi: AxiosInstance,
  ) {}

  async findByCountryId(id: string): Promise<Province[]> {
    try {
      const apiResponse = await this.aiBrokerApi.get(`/ObtenerProvinciaByIdPais/${id}`);

      return apiResponse.data;
    } catch (e) {
      throw new Error(e);
    }
  }
}
