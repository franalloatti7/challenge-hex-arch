/* eslint-disable @typescript-eslint/unbound-method */
import { CreateCompanyUseCase } from './create-company-use-case';
import { CompanyRepositoryInterface } from '@/company/domain/company.repository.interface';
import { Company } from '@/company/domain/company.entity';
import { v4 as uuidv4 } from 'uuid';
import { ConflictException } from '@nestjs/common';
// Este archivo contiene las pruebas unitarias para el caso de uso de creación de empresas.
describe('CreateCompanyUseCase', () => {
  let createCompanyUseCase: CreateCompanyUseCase;
  let mockCompanyRepository: jest.Mocked<CompanyRepositoryInterface>;

  beforeEach(() => {
    mockCompanyRepository = {
      findIfExist: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      getCompaniesAddedLastMonth: jest.fn(),
      getCompaniesWithTransfersLastMonth: jest.fn()
    };

    createCompanyUseCase = new CreateCompanyUseCase(mockCompanyRepository);
  });

  // Pruebas unitarias para el caso de uso de creación de empresas
  it('debería crear una empresa válida', async () => {
    const dto = {
      id: uuidv4(),
      cuit: '30-12345678-9',
      companyName: 'Mi Empresa',
      adhesionDate: new Date()
    };

    mockCompanyRepository.findIfExist.mockResolvedValue(null);
    mockCompanyRepository.create.mockResolvedValue(new Company(dto));

    const result = await createCompanyUseCase.execute(dto);

    expect(result.company.companyName).toBe('Mi Empresa');
    expect(mockCompanyRepository.findIfExist).toHaveBeenCalledWith(
      '30-12345678-9',
      'Mi Empresa'
    );
    expect(mockCompanyRepository.create).toHaveBeenCalled();
  });

  // Prueba para verificar que se lanza un error si la empresa ya existe
  it('debería lanzar un error si existe una empresa con los mismos datos', async () => {
    const dto = {
      id: uuidv4(),
      cuit: '30-12345678-9',
      companyName: 'Duplicada',
      adhesionDate: new Date()
    };

    mockCompanyRepository.findIfExist.mockResolvedValue(new Company(dto));

    await expect(createCompanyUseCase.execute(dto)).rejects.toThrow(
      ConflictException
    );
  });
});
