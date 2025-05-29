import { TransferRepositoryInterface } from '@/transfer/domain/transfer.repository.interface';
import { CreateTransferDto } from './create-transfer.dto';
import { Transfer, PrimitiveTransfer } from '@/transfer/domain/transfer.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { CompanyRepositoryInterface } from '@/company/domain/company.repository.interface';

// Caso de uso para crear una transferencia
@Injectable()
export class CreateTransferUseCase {
  constructor(
    private readonly transferRepository: TransferRepositoryInterface,
    private readonly companyRepository: CompanyRepositoryInterface
  ) {}

  /**
   * Crea una nueva transferencia en el sistema.
   * @param dto - Datos de la transferencia a crear.
   * @returns La transferencia creada.
   * @throws BadRequestException si el monto no es válido o las cuentas son iguales.
   * @throws NotFoundException si la empresa no existe.
   */
  async execute(
    dto: CreateTransferDto
  ): Promise<{ transfer: PrimitiveTransfer }> {
    if (!/^\d{1,10}(\.\d{1,2})?$/.test(dto.amount.toString())) {
      throw new BadRequestException(
        'El monto debe tener hasta 10 dígitos y como máximo 2 decimales'
      );
    }
    if (dto.debitAccount === dto.creditAccount) {
      throw new BadRequestException(
        'La cuenta débito y crédito no pueden ser iguales'
      );
    }
    const company = await this.companyRepository.findById(dto.companyId);
    if (!company) {
      throw new NotFoundException(
        `La empresa con ID ${dto.companyId} no existe`
      );
    }
    const transfer = Transfer.create(dto);

    await this.transferRepository.create(transfer);

    return { transfer: transfer.toValue() };
  }
}
