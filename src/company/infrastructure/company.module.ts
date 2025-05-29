import { Module } from '@nestjs/common';
import { CreateCompanyController } from './create-company/create-company.controller';
import { CreateCompanyUseCase } from '@/company/application/create-company-use-case/create-company-use-case';
import { CompanyRepository } from './repository/company.repository';
import { CompanyRepositoryInterface } from '@/company/domain/company.repository.interface';
import { GetCompaniesAddedLastMonthController } from './get-companies-added-last-month/get-companies-added-last-month.controller';
import { GetCompaniesAddedLastMonthUseCase } from '@/company/application/get-companies-added-last-month-use-case/get-companies-added-last-month-use-case';
import { GetCompaniesWithTransfersLastMonthController } from './get-companies-with-transfers-last-month/get-companies-with-transfers-last-month.controller';
import { GetCompaniesWithTransfersLastMonthUseCase } from '@/company/application/get-companies-with-transfers-last-month-use-case/get-companies-with-transfers-last-month-use-case';

// Módulo de la infraestructura de la empresa
@Module({
  controllers: [
    CreateCompanyController,
    GetCompaniesAddedLastMonthController,
    GetCompaniesWithTransfersLastMonthController
  ],
  providers: [
    CreateCompanyUseCase,
    GetCompaniesAddedLastMonthUseCase,
    GetCompaniesWithTransfersLastMonthUseCase,
    CompanyRepository,
    {
      provide: CompanyRepositoryInterface,
      useExisting: CompanyRepository
    }
  ],
  exports: [
    CreateCompanyUseCase,
    GetCompaniesAddedLastMonthUseCase,
    GetCompaniesWithTransfersLastMonthUseCase
  ]
})
export class CompanyModule {}
