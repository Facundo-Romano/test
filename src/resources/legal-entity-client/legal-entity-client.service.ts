import { Inject, Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { IA_BROKER_AXIOS_INSTANCE } from 'src/common/constants';
import { LegalEntityClient } from './legal-entity-client.entity';
import { CreateLegalEntityClientDto } from './dto/create-legal-entity-client.dto';
import { UpdateLegalEntityClientDto } from './dto/update-legal-entity-client.dto';

@Injectable()
export class LegalEntityClientService {
  constructor(
    @Inject(IA_BROKER_AXIOS_INSTANCE) private readonly aiBrokerApi: AxiosInstance,
  ) {}

  async findById(id: string): Promise<LegalEntityClient> {
    try {
      const apiResponse = await this.aiBrokerApi.get(`/ClientesPersonaJuridica/${id}`);
      
      return apiResponse.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async create(createClientDto: CreateLegalEntityClientDto): Promise<LegalEntityClient> {
    try {
      const apiResponse = await this.aiBrokerApi.post(`/ClientesPersonaJuridica`, createClientDto);

      return apiResponse.data
    } catch (e) {
      throw new Error(e);
    }
  }

  async update(id: string, updateClientDto: UpdateLegalEntityClientDto): Promise<void> {
    try {
      await this.aiBrokerApi.put(`/ClientesPersonaJuridica/${id}`, updateClientDto);
    } catch (e) {
      throw new Error(e);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.aiBrokerApi.delete(`/ClientesPersonaJuridica/${id}`);
    } catch (e) {
      throw new Error(e);
    }
  }
}
