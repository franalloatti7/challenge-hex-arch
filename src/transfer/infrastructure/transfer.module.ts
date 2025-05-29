import { Module } from '@nestjs/common';
import { CreateTransferController } from './create-transfer/create-transfer.controller';
import { CreateTransferUseCase } from '@/transfer/application/create-transfer-use-case/create-transfer-use-case';
import { TransferRepository } from './repository/transfer.repository';
import { TransferRepositoryInterface } from '@/transfer/domain/transfer.repository.interface';
import { CompanyRepository } from '@/company/infrastructure/repository/company.repository';
import { CompanyRepositoryInterface } from '@/company/domain/company.repository.interface';

// Módulo de la infraestructura de la transferencia
@Module({
  controllers: [CreateTransferController],
  providers: [
    CreateTransferUseCase,
    TransferRepository,
    {
      provide: TransferRepositoryInterface,
      useExisting: TransferRepository
    },
    CompanyRepository,
    {
      provide: CompanyRepositoryInterface,
      useExisting: CompanyRepository
    }
  ],
  exports: [CreateTransferUseCase]
})
export class TransferModule {}
