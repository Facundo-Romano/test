import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { IA_BROKER_AXIOS_INSTANCE } from '../common/constants';

@Global() 
@Module({
  providers: [
    {
      provide: IA_BROKER_AXIOS_INSTANCE,
      useFactory: (configService: ConfigService): AxiosInstance => {
        const baseURL = configService.get<string>('IA_BROKER_API_URL') || 'IA_BROKER_API_URL not found';
        const instance = axios.create({ baseURL: baseURL });

        instance.interceptors.request.use((config) => {
          console.log(`Requesting ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
          return config;
        });

        instance.interceptors.response.use(
            (response) => response,
            (error) => {
                console.error(`Error al llamar a IA_BROKER_API: \n`, error.message);
                return Promise.reject(error);
            }
        );

        return instance;
      },
      inject: [ConfigService],
    },
  ],
  exports: [IA_BROKER_AXIOS_INSTANCE], 
})
export class HttpClientsModule {}