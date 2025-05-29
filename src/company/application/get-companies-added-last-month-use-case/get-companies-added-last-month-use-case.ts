import { Injectable } from '@nestjs/common';
import { PrimitiveCompany } from '@/company/domain/company.entity';
import { CompanyRepositoryInterface } from '@/company/domain/company.repository.interface';

// Caso de uso para obtener las empresas que se dieron de alta en el último mes
@Injectable()
export class GetCompaniesAddedLastMonthUseCase {
  constructor(private readonly companyRepository: CompanyRepositoryInterface) {}

  /**
   * Obtiene las empresas que se adhirieron el último mes.
   * @returns Un objeto con un array de empresas.
   */
  async execute(): Promise<{ companies: PrimitiveCompany[] }> {
    const companies = await this.companyRepository.getCompaniesAddedLastMonth();
    return { companies: companies ? companies.map((c) => c.toValue()) : [] };
  }
}
