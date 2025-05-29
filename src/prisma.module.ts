import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// Módulo de Prisma que proporciona el servicio PrismaService
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {}
