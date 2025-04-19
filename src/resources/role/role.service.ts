import { Inject, Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { IA_BROKER_AXIOS_INSTANCE } from 'src/common/constants';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
  constructor(
    @Inject(IA_BROKER_AXIOS_INSTANCE) private readonly aiBrokerApi: AxiosInstance,
  ) {}

  async findAll(): Promise<Role[]> {
    try {
      const apiResponse = await this.aiBrokerApi.get(`/Roles`);

      return apiResponse.data;
    } catch (e) {
      throw new Error(e);
    }
  }
}
