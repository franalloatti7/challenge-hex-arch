/* eslint-disable @typescript-eslint/unbound-method */
import { Decimal } from '@prisma/client/runtime/library';
import { CreateTransferUseCase } from './create-transfer-use-case';
import { Transfer } from '@/transfer/domain/transfer.entity';
import { TransferRepositoryInterface } from '@/transfer/domain/transfer.repository.interface';
import { v4 as uuidv4 } from 'uuid';
import { CompanyRepositoryInterface } from '@/company/domain/company.repository.interface';
import { BadRequestException, NotFoundException } from '@nestjs/common';

// Este archivo contiene las pruebas unitarias para el caso de uso de creación de transferencias.
describe('CreateTransferUseCase', () => {
  let createTransferUseCase: CreateTransferUseCase;
  let transferRepository: jest.Mocked<TransferRepositoryInterface>;
  let companyRepository: jest.Mocked<CompanyRepositoryInterface>;

  beforeEach(() => {
    transferRepository = {
      create: jest.fn()
    } as unknown as jest.Mocked<TransferRepositoryInterface>;

    companyRepository = {
      findIfExist: jest.fn(),
      findById: jest.fn(),
      create: jest.fn()
    } as unknown as jest.Mocked<CompanyRepositoryInterface>;

    createTransferUseCase = new CreateTransferUseCase(
      transferRepository,
      companyRepository
    );
  });

  // Pruebas unitarias para el caso de uso de creación de transferencias
  it('debería lanzar error si la empresa no existe', async () => {
    const dto = {
      id: uuidv4(),
      amount: new Decimal('1000.00'),
      debitAccount: '0123456789012345678901',
      creditAccount: '1098765432109876543210',
      companyId: 'non-existent-company-id'
    };

    companyRepository.findById.mockResolvedValue(null); // ⬅️ Empresa no encontrada

    await expect(createTransferUseCase.execute(dto)).rejects.toThrow(
      NotFoundException
    );
  });

  // Prueba para verificar que se crea una transferencia correctamente
  it('debería lanzar un error si las cuentas débito y crédito son las mismas', async () => {
    const dto = {
      id: uuidv4(),
      amount: new Decimal('1500.75'),
      debitAccount: '0123456789101112131415',
      creditAccount: '0123456789101112131415',
      companyId: uuidv4()
    };

    transferRepository.create.mockResolvedValue(new Transfer(dto));

    await expect(createTransferUseCase.execute(dto)).rejects.toThrow(
      BadRequestException
    );
  });

  // Prueba para verificar que se crea una transferencia correctamente
  it('debería lanzar un error por monto inválido', async () => {
    const dto = {
      id: uuidv4(),
      amount: new Decimal('150456456456456450.755'),
      debitAccount: '0123456789101112131415',
      creditAccount: '1234567891011121314150',
      companyId: uuidv4()
    };

    await expect(createTransferUseCase.execute(dto)).rejects.toThrow(
      BadRequestException
    );

    expect(transferRepository.create).not.toHaveBeenCalled();
  });
});
