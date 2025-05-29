/* eslint-disable @typescript-eslint/unbound-method */
import { CreateTransferController } from './create-transfer.controller';
import { CreateTransferUseCase } from '@/transfer/application/create-transfer-use-case/create-transfer-use-case';
import { CreateTransferHttpDto } from './create-transfer.http-dto';
import { Decimal } from '@prisma/client/runtime/library';
import { PrimitiveTransfer } from '@/transfer/domain/transfer.entity';
import { v4 as uuidv4 } from 'uuid';

// Este archivo contiene las pruebas unitarias para el controlador de creación de transferencias.
describe('CreateTransferController', () => {
  let controller: CreateTransferController;
  let useCase: CreateTransferUseCase;

  beforeEach(() => {
    useCase = {
      execute: jest.fn()
    } as unknown as CreateTransferUseCase;

    controller = new CreateTransferController(useCase);
  });

  // Pruebas unitarias para el controlador de creación de transferencias
  it('debería crear una transferencia correctamente', async () => {
    const dto: CreateTransferHttpDto = {
      amount: '1234.56',
      debitAccount: '0123456789101112131415',
      creditAccount: '1234567891011121314151',
      companyId: uuidv4()
    };

    const mockTransfer: PrimitiveTransfer = {
      id: uuidv4(),
      amount: new Decimal(dto.amount),
      debitAccount: '2345678910111213141516',
      creditAccount: '3456789101112131415167',
      companyId: dto.companyId,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    (useCase.execute as jest.Mock).mockResolvedValue({
      transfer: mockTransfer
    });

    const result = await controller.run(dto);

    expect(useCase.execute).toHaveBeenCalledWith({
      amount: new Decimal(dto.amount),
      debitAccount: dto.debitAccount,
      creditAccount: dto.creditAccount,
      companyId: dto.companyId
    });

    expect(result).toEqual({ transfer: mockTransfer });
  });
});
