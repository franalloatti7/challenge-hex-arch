import { CompanyRepositoryInterface } from '@/company/domain/company.repository.interface';
import { CreateCompanyDto } from './create-company.dto';
import { Company, PrimitiveCompany } from '@/company/domain/company.entity';
import { Injectable, ConflictException } from '@nestjs/common';

// Caso de uso para crear una empresa
@Injectable()
export class CreateCompanyUseCase {
  constructor(private readonly companyRepository: CompanyRepositoryInterface) {}

  /**
   * Crea una nueva empresa en el sistema.
   * @param dto - Datos de la empresa a crear.
   * @returns La empresa creada.
   * @throws ConflictException si ya existe una empresa con el mismo CUIT o nombre.
   */
  async execute(dto: CreateCompanyDto): Promise<{ company: PrimitiveCompany }> {
    const existing = await this.companyRepository.findIfExist(
      dto.cuit,
      dto.companyName
    );
    if (existing) {
      throw new ConflictException(
        'Ya existe una empresa con estos datos (Razon Social y/o CUIT)'
      );
    }

    const company = Company.create(dto);

    await this.companyRepository.create(company);

    return { company: company.toValue() };
  }
}
