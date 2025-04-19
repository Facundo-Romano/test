import { ApiProperty } from '@nestjs/swagger';

export class CountryResponseDto {
  @ApiProperty({ description: 'ID del país', example: 1 })
  paisId: number;
  
  @ApiProperty({ description: 'ID del idioma del país', example: 1 })
  idiomaId: number;
  
  @ApiProperty({ description: 'Descripción del país', example: 'Argentina' })
  paisDesc: string;
  
  @ApiProperty({ description: 'Abreviatura del país', example: 'AR' })
  paisAbreviatura: string;
}