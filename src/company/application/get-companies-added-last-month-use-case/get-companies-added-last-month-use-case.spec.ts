/* eslint-disable @typescript-eslint/unbound-method */
import { GetCompaniesAddedLastMonthUseCase } from './get-companies-added-last-month-use-case';
import { CompanyRepositoryInterface } from '@/company/domain/company.repository.interface';
import { Company } from '@/company/domain/company.entity';

// Pruebas unitarias para el caso de uso de obtención de empresas adheridas el último mes
describe('GetCompaniesAddedLastMonthUseCase', () => {
  let useCase: GetCompaniesAddedLastMonthUseCase;
  let companyRepository: jest.Mocked<CompanyRepositoryInterface>;

  beforeEach(() => {
    companyRepository = {
      getCompaniesAddedLastMonth: jest.fn()
    } as unknown as jest.Mocked<CompanyRepositoryInterface>;

    useCase = new GetCompaniesAddedLastMonthUseCase(companyRepository);
  });

  // Pruebas unitarias para el caso de uso de obtención de empresas adheridas el último mes
  it('debería devolver las empresas adheridas el último mes', async () => {
    const fakeCompanies = [
      Company.create({
        cuit: '30-12345678-9',
        companyName: 'Empresa Uno',
        adhesionDate: new Date('2024-05-01')
      }),
      Company.create({
        cuit: '30-98765432-1',
        companyName: 'Empresa Dos',
        adhesionDate: new Date('2024-05-10')
      })
    ];

    companyRepository.getCompaniesAddedLastMonth.mockResolvedValue(
      fakeCompanies
    );

    const result = await useCase.execute();

    expect(companyRepository.getCompaniesAddedLastMonth).toHaveBeenCalled();
    expect(result.companies).toEqual(fakeCompanies.map((c) => c.toValue()));
  });

  // Prueba para verificar que se devuelve un array vacío si no hay empresas adheridas el último mes
  it('debería devolver un array vacío si no hay empresas', async () => {
    companyRepository.getCompaniesAddedLastMonth.mockResolvedValue([]);

    const result = await useCase.execute();

    expect(companyRepository.getCompaniesAddedLastMonth).toHaveBeenCalled();
    expect(result.companies).toEqual([]);
  });
});
