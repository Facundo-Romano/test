import { Inject, Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { IA_BROKER_AXIOS_INSTANCE } from 'src/common/constants';
import { MaritalStatus } from './marital-status.entity';

@Injectable()
export class MaritalStatusService {
    constructor(
        @Inject(IA_BROKER_AXIOS_INSTANCE) private readonly aiBrokerApi: AxiosInstance,
    ) {}
  
    async findAll(): Promise<MaritalStatus[]> {
        try {
            const apiResponse = await this.aiBrokerApi.get(`/EstadoCivil`);

            return apiResponse.data;
        } catch (e) {
            throw new Error(e);
        }
    }

    async findById(id: string): Promise<MaritalStatus> {
        try {
            const apiResponse = await this.aiBrokerApi.get(`/EstadoCivil/${id}`);

            return apiResponse.data;
        } catch (e) {
            throw new Error(e);
        }
    }
}
