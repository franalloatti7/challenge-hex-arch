import { Injectable } from '@nestjs/common';
import { Company, PrimitiveCompany } from '@/company/domain/company.entity';
import { CompanyRepositoryInterface } from '@/company/domain/company.repository.interface';
import { PrismaService } from '@/prisma.service';

// Repositorio de empresas que implementa la interfaz CompanyRepositoryInterface
@Injectable()
export class CompanyRepository implements CompanyRepositoryInterface {
  constructor(private prisma: PrismaService) {}

  /**
   * Crea una nueva empresa en la base de datos.
   * @param company - La empresa a crear.
   * @returns La empresa creada.
   */
  async create(company: Company): Promise<Company> {
    const companyToCreate = company.toValue();
    if (!companyToCreate.adhesionDate) {
      companyToCreate.adhesionDate = new Date();
    }
    const created = await this.prisma.company.create({
      data: {
        ...companyToCreate
      }
    });
    return new Company(created);
  }

  /**
   * Busca una empresa por CUIT o nombre.
   * @param cuit - El CUIT de la empresa.
   * @param companyName - El nombre de la empresa.
   * @returns La empresa encontrada o null si no existe.
   */
  async findIfExist(
    cuit: string,
    companyName: string
  ): Promise<Company | null> {
    const company = await this.prisma.company.findMany({
      where: {
        OR: [{ cuit: cuit }, { companyName: companyName }]
      }
    });

    return company[0] ? new Company(company[0]) : null;
  }

  /**
   * Busca una empresa por su ID.
   * @param companyId - El ID de la empresa.
   * @returns La empresa encontrada o null si no existe.
   */
  async findById(companyId: string): Promise<Company | null> {
    const company = await this.prisma.company.findUnique({
      where: { id: companyId }
    });

    return company ? new Company(company) : null;
  }

  /**
   * Obtiene todas las empresas creadas en el último mes.
   * @returns Una lista de empresas creadas en el último mes.
   */
  async getCompaniesAddedLastMonth(): Promise<Company[]> {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const companies = await this.prisma.company.findMany({
      where: { adhesionDate: { gte: lastMonth } }
    });

    return companies.map((c: PrimitiveCompany) => new Company(c));
  }

  /**
   * Obtiene las empresas que hicieron transferencias en el último mes.
   * @returns Una lista de empresas con transferencias en el último mes.
   */
  async getCompaniesWithTransfersLastMonth(): Promise<Company[]> {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const companies = await this.prisma.company.findMany({
      where: {
        transfers: {
          some: {
            createdAt: { gte: lastMonth }
          }
        }
      }
    });

    return companies.map((c: PrimitiveCompany) => new Company(c));
  }
}
