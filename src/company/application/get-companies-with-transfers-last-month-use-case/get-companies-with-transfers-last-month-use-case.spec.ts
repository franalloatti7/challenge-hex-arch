/* eslint-disable @typescript-eslint/unbound-method */
import { GetCompaniesWithTransfersLastMonthUseCase } from './get-companies-with-transfers-last-month-use-case';
import { CompanyRepositoryInterface } from '@/company/domain/company.repository.interface';
import { Company } from '@/company/domain/company.entity';

// Pruebas unitarias para el caso de uso de obtención de empresas con transferencias del último mes
describe('GetCompaniesWithTransfersLastMonthUseCase', () => {
  let useCase: GetCompaniesWithTransfersLastMonthUseCase;
  let companyRepository: jest.Mocked<CompanyRepositoryInterface>;

  beforeEach(() => {
    companyRepository = {
      getCompaniesWithTransfersLastMonth: jest.fn()
    } as unknown as jest.Mocked<CompanyRepositoryInterface>;

    useCase = new GetCompaniesWithTransfersLastMonthUseCase(companyRepository);
  });

  // Pruebas unitarias para el caso de uso de obtención de empresas con transferencias del último mes
  it('debería retornar un array de empresas con transferencias del último mes', async () => {
    const mockCompany = Company.create({
      cuit: '30-12345678-9',
      companyName: 'Empresa Test',
      adhesionDate: new Date()
    });

    companyRepository.getCompaniesWithTransfersLastMonth.mockResolvedValue([
      mockCompany
    ]);

    const result = await useCase.execute();

    expect(result.companies).toHaveLength(1);
    expect(result.companies[0]).toEqual(mockCompany.toValue());
    expect(
      companyRepository.getCompaniesWithTransfersLastMonth
    ).toHaveBeenCalled();
  });

  // Prueba para verificar que se retorna un array vacío si no hay empresas con transferencias
  it('debería retornar un array vacío si no hay empresas', async () => {
    companyRepository.getCompaniesWithTransfersLastMonth.mockResolvedValue([]);

    const result = await useCase.execute();

    expect(result.companies).toEqual([]);
    expect(
      companyRepository.getCompaniesWithTransfersLastMonth
    ).toHaveBeenCalled();
  });
});
