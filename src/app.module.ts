import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { APP_GUARD } from "@nestjs/core"
import { AuthModule } from "./auth/auth.module"
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard"
import { FileStorageModule } from "./file-storage/file-storage.module"
import { HttpClientsModule } from "./http-clients/http-clients.module"
import { UsersModule } from "./resources/users/users.module"
import { DashboardModule } from "./resources/dashboard/dashboard.module"
import { ClientModule } from "./resources/client/client.module"
import { ClientTypeModule } from "./resources/client-type/client-type.module"
import { ProvinceModule } from "./resources/province/province.module"
import { LocalityModule } from "./resources/locality/locality.module"
import { IvaStatusModule } from "./resources/iva-status/iva-status.module"
import { SexModule } from "./resources/sex/sex.module"
import { RoleModule } from "./resources/role/role.module"
import { CountryModule } from "./resources/country/country.module"
import { MaritalStatusModule } from "./resources/marital-status/marital-status.module"
import { LegalEntityClientModule } from './resources/legal-entity-client/legal-entity-client.module'
import { IndividualClientModule } from "./resources/individual-client/individual-client.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    HttpClientsModule,
    FileStorageModule,
    UsersModule,
    AuthModule,
    DashboardModule,
    ClientModule,
    ClientTypeModule,
    CountryModule,
    ProvinceModule,
    LocalityModule,
    IvaStatusModule,
    SexModule,
    RoleModule,
    MaritalStatusModule,
    LegalEntityClientModule,
    IndividualClientModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}

