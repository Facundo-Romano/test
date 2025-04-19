import { Inject, Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { IA_BROKER_AXIOS_INSTANCE } from 'src/common/constants';
import { IndividualClient } from './individual-client.entity';
import { CreateIndividualClientDto } from './dto/create-individual-client.dto';
import { UpdateIndividualClientDto } from './dto/update-individual-client.dto';

@Injectable()
export class IndividualClientService {
  constructor(
    @Inject(IA_BROKER_AXIOS_INSTANCE) private readonly aiBrokerApi: AxiosInstance,
  ) {}

  async findById(id: string): Promise<IndividualClient> {
    try {
      const apiResponse = await this.aiBrokerApi.get(`/ClientesPersona/${id}`);
      return apiResponse.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async create(createClientDto: CreateIndividualClientDto): Promise<IndividualClient> {
    try {
      const apiResponse = await this.aiBrokerApi.post(`/ClientesPersona`, createClientDto);
      return apiResponse.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async update(id: string, updateClientDto: UpdateIndividualClientDto): Promise<void> {
    try {
      await this.aiBrokerApi.put(`/ClientesPersona/${id}`, updateClientDto);
    } catch (e) {
      throw new Error(e);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.aiBrokerApi.delete(`/ClientesPersona/${id}`);
    } catch (e) {
      throw new Error(e);
    }
  }
}
