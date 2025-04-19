import { Module } from "@nestjs/common"
import { DashboardController } from "./dashboard.controller"
import { DashboardService } from "./dashboard.service"
import { FileStorageModule } from "src/file-storage/file-storage.module"

@Module({
  imports: [FileStorageModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}

