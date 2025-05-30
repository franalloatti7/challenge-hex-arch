import { Module } from '@nestjs/common';
import { CompanyModule } from './company/infrastructure/company.module';
import { PrismaModule } from './common/prisma/prisma.module';
import { TransferModule } from './transfer/infrastructure/transfer.module';

// Módulo principal de la aplicación
@Module({
  imports: [PrismaModule, CompanyModule, TransferModule],
  controllers: [],
  providers: []
})
export class AppModule {}
