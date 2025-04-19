import { Injectable } from "@nestjs/common"
import { v4 as uuidv4 } from "uuid"
import { Kpi, KpiType, New, NewStatus, NewType, Notification } from "./dashboard.entity"
import { FileStorageService } from "src/file-storage/file-storage.service"

@Injectable()
export class DashboardService {
  private readonly KpiFile = "kpis"
  private readonly NewsFile = "news"
  private readonly NotificationsFile = "notifications"

  constructor(private readonly fileStorageService: FileStorageService) {
    this.initializeDashboard()
  }

  private async initializeDashboard() {
    const kpis = await this.fileStorageService.readFile<Kpi>(this.KpiFile)
    const news = await this.fileStorageService.readFile<New>(this.NewsFile)
    const notifications = await this.fileStorageService.readFile<Notification>(this.NotificationsFile)

    if (kpis?.length === 0) {
      // Create some sample kpi items
      const sampleKpis: Kpi[] = [
        {
          id: uuidv4(),
          title: "Cotizaciones",
          description: "+20.1% desde el mes pasado",
          value: 45,
          type: KpiType.QUOTATION,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          title: "Pólizas Activas",
          description: "+10.1% desde el mes pasado",
          value: 2350,
          type: KpiType.POLICY,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          title: "Siniestros",
          description: "+19% desde el mes pasado",
          value: 89,
          type: KpiType.CLAIM,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          title: "Activos Ahora",
          description: "+201 desde la última hora",
          value: 573,
          type: KpiType.ACTIVITY,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]

      for (const kpi of sampleKpis) {
        await this.fileStorageService.create<Kpi>(this.KpiFile, kpi)
      }
    }

    if (news?.length === 0) {
      // Create some sample news items
      const sampleNews: New[] = [
        {
          id: uuidv4(),
          title: "Actualización del sistema a v2.5",
          type: NewType.SYSTEM,
          createdBy: 'Admin',
          status: NewStatus.COMPLETE,
          createdAt: new Date(2025, 2, 5),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          title: "Nuevas funcionalidades de reportes",	
          type: NewType.FEATURE,
          createdBy: 'Desarrollo',
          status: NewStatus.IN_PROGRESS,
          createdAt: new Date(2025, 2, 4),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          title: "Mentenimiento programado",
          type: NewType.MAINTENANCE,
          createdBy: 'Soporte',
          status: NewStatus.PENDING,
          createdAt: new Date(2025, 2, 3),
          updatedAt: new Date(),
        },
      ]

      for (const news of sampleNews) {
        await this.fileStorageService.create<New>(this.NewsFile, news)
      }
    }

    if (notifications?.length === 0) {
      // Create some sample notification items
      const sampleNotifications: Notification[] = [
        {
          id: uuidv4(),
          title: "Actualización del sistema",
          description: "Actualización del sistema a v2.5",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          title: "Nueva póliza creada",
          description: "Se ha creado una nueva póliza #12345",
          createdAt: new Date(),  
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          title: "Siniestro reportado",
          description: "Se ha reportado un nuevo siniestro #S-789",
          createdAt: new Date(),  
          updatedAt: new Date(),
        },
      ]

      for (const notification of sampleNotifications) {
        await this.fileStorageService.create<Notification>(this.NotificationsFile, notification)
      }
    }
  }

  async getKpis(): Promise<Kpi[]> {
    return this.fileStorageService.readFile<Kpi>(this.KpiFile)
  }

  async getKpi(id: string): Promise<Kpi | undefined> {
    return this.fileStorageService.findById<Kpi>(this.KpiFile, id)
  }

  async getNews(): Promise<New[]> {
    return this.fileStorageService.readFile<New>(this.NewsFile)
  }

  async getNotifications(): Promise<Notification[]> {
    return this.fileStorageService.readFile<Notification>(this.NotificationsFile)
  }
}

