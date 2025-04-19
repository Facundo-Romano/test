import { Controller, Get, Param, NotFoundException } from "@nestjs/common"
import { DashboardService } from "./dashboard.service"
import { Kpi, New, Notification } from "./dashboard.entity"
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Dashboard')
@Controller("dashboard")
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}


  @ApiOperation({ summary: 'Obtener notificaciones' })
  @ApiResponse({ status: 200, description: 'Notificaciones obtenidas', type: [New] })
  @Get('news')
  async getNews(): Promise<New[]> {
    return this.dashboardService.getNews()
  }

  @ApiOperation({ summary: 'Obtener novedades' })
  @ApiResponse({ status: 200, description: 'Novedades obtenidas', type: [Notification] })
  @Get('notifications')
  async getNotifications(): Promise<Notification[]> {
    return this.dashboardService.getNotifications()
  }

  @ApiOperation({ summary: 'Obtener indicadores' })
  @ApiResponse({ status: 200, description: 'Indicadores obtenidos', type: [Kpi] })
  @Get('kpi')
  async getKpis(): Promise<Kpi[]> {
    return this.dashboardService.getKpis()
  }

  @ApiOperation({ summary: 'Obtener un indicador por id' })
  @ApiParam({ name: 'id', description: 'ID del indicador a obtener' })
  @ApiResponse({ status: 200, description: 'Indicador obtenido', type: Kpi })
  @Get('kpi/:id')
  async getKpi(@Param('id') id: string): Promise<Kpi> {
    const item = await this.dashboardService.getKpi(id);
    
    if (!item) {
      throw new NotFoundException(`Dashboard Kpi with ID ${id} not found`);
    }
    
    return item;
  }
}

