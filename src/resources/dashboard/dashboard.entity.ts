import { ApiProperty } from "@nestjs/swagger"

export enum KpiType {
    QUOTATION = "quotation",
    POLICY = "policy",
    ACTIVITY = "activity",
    CLAIM = "claim",
}

export enum NewStatus {
    PENDING = "pending",
    IN_PROGRESS = "inProgress",
    COMPLETE = "complete",
}

export enum NewType {
    SYSTEM = "System",
    FEATURE = "Feature",
    MAINTENANCE = "Maintenance",
}

export class Kpi {
  @ApiProperty({ description: 'ID del indicador', example: '123e4567-e89b-12d3-a456-426614174000' })  
  id: string
  
  @ApiProperty({ description: 'Título del indicador', example: 'Nueva actualización disponible' })
  title: string
  
  @ApiProperty({ description: 'Descripción del indicador', example: 'Nueva actualización disponible' })
  description: string
  
  @ApiProperty({ description: 'Valor del indicador', example: 100 })
  value: number
  
  @ApiProperty({ description: 'Tipo de indicador', example: 'quotation' })
  type: KpiType
  
  @ApiProperty({ description: 'Fecha de creación', example: '2021-01-01T00:00:00.000Z' })
  createdAt: Date
  
  @ApiProperty({ description: 'Fecha de actualización', example: '2021-01-01T00:00:00.000Z' })
  updatedAt: Date
}

export class New {
  @ApiProperty({ description: 'ID de la notificación', example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string
  
  @ApiProperty({ description: 'Título de la notificación', example: 'Nueva actualización disponible' })
  title: string
  
  @ApiProperty({ description: 'Tipo de notificación', example: 'Feature' })
  type: NewType
  
  @ApiProperty({ description: 'Creado por', example: 'John Doe' })
  createdBy: string
  
  @ApiProperty({ description: 'Estado de la notificación', example: 'pending' })
  status: NewStatus
  
  @ApiProperty({ description: 'Fecha de creación', example: '2021-01-01T00:00:00.000Z' })
  createdAt: Date
  
  @ApiProperty({ description: 'Fecha de actualización', example: '2021-01-01T00:00:00.000Z' })
  updatedAt: Date
}

export class Notification {
  @ApiProperty({ description: 'ID de la notificación', example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string
  
  @ApiProperty({ description: 'Título de la notificación', example: 'Nueva actualización disponible' })
  title: string
  
  @ApiProperty({ description: 'Descripción de la notificación', example: 'Nueva actualización disponible' })
  description: string
  
  @ApiProperty({ description: 'Fecha de creación', example: '2021-01-01T00:00:00.000Z' })
  createdAt: Date
  
  @ApiProperty({ description: 'Fecha de actualización', example: '2021-01-01T00:00:00.000Z' })
  updatedAt: Date
}