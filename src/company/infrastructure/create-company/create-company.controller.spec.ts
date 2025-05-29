import { Test, TestingModule } from '@nestjs/testing';
import { CreateCompanyController } from './create-company.controller';
import { CreateCompanyUseCase } from '@/company/application/create-company-use-case/create-company-use-case';
import { CreateCompanyHttpDto } from './create-company.http-dto';
import { PrimitiveCompany } from '@/company/domain/company.entity';
import { v4 as uuidv4 } from 'uuid';

// Este archivo contiene las pruebas unitarias para el controlador de creación de empresas.
describe('CreateCompanyController', () => {
  let controller: CreateCompanyController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let useCase: CreateCompanyUseCase;

  const mockUseCase = {
    execute: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateCompanyController],
      providers: [
        {
          provide: CreateCompanyUseCase,
          useValue: mockUseCase
        }
      ]
    }).compile();

    controller = module.get<CreateCompanyController>(CreateCompanyController);
    useCase = module.get<CreateCompanyUseCase>(CreateCompanyUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería crear una empresa correctamente', async () => {
    const dto: CreateCompanyHttpDto = {
      cuit: '30-12345678-9',
      companyName: 'Empresa Test',
      adhesionDate: new Date('2024-01-01')
    };

    const expected: PrimitiveCompany = {
      id: uuidv4(),
      cuit: dto.cuit,
      companyName: dto.companyName,
      adhesionDate: dto.adhesionDate
    };

    mockUseCase.execute.mockResolvedValue({ company: expected });

    const result = await controller.run(dto);

    expect(result).toEqual({ company: expected });
    expect(mockUseCase.execute).toHaveBeenCalledWith(dto);
  });
});
