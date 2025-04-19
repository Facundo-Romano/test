import { Inject, Injectable } from '@nestjs/common';
import { Client, ClientStatus } from './client.entity';
import { UpdateClientDto } from './dto/update-client.dto';
import { CreateClientDto } from './dto/create-client.dto';
import { AxiosInstance } from 'axios';
import { IA_BROKER_AXIOS_INSTANCE } from 'src/common/constants';

@Injectable()
export class ClientService {
  constructor(
    @Inject(IA_BROKER_AXIOS_INSTANCE) private readonly aiBrokerApi: AxiosInstance,
  ) {}

  async findAll(): Promise<Client[]> {
    try {
      const apiResponse = await this.aiBrokerApi.get(`/Clientes`);

      return apiResponse.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async findById(id: string): Promise<Client> {
    try {
      const apiResponse = await this.aiBrokerApi.get(`/Clientes/${id}`);

      return apiResponse.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async create(createClientDto: CreateClientDto): Promise<Client> {
    try {
      const newClient = {
        ...createClientDto,
        clienteEstado: ClientStatus.ACTIVE,
        fechaAlta: new Date(),
      }

      const apiResponse = await this.aiBrokerApi.post(`/Clientes`, newClient);

      return apiResponse.data
    } catch (e) {
      throw new Error(e);
    }
  }

  async update(id: string, updateClientDto: UpdateClientDto): Promise<void> {
    try {
      const updatedClient = {
        clienteId: id,
        ...updateClientDto,
        fechaModif: new Date().toISOString(),
      }

      await this.aiBrokerApi.put(`/Clientes/${id}`, updatedClient);
    } catch (e) {
      throw new Error(e);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.aiBrokerApi.delete(`/Clientes/${id}`);
    } catch (e) {
      throw new Error(e);
    }
  }
}
