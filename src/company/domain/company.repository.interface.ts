import { Company } from './company.entity';

// Interfaz del repositorio de empresas
export abstract class CompanyRepositoryInterface {
  abstract findById(companyId: string): Promise<Company | null>;
  abstract findIfExist(
    cuit: string,
    companyName: string
  ): Promise<Company | null>;
  abstract create(company: Company): Promise<Company>;
  abstract getCompaniesAddedLastMonth(): Promise<Company[] | null>;
  abstract getCompaniesWithTransfersLastMonth(): Promise<Company[] | null>;
}
