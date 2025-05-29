import { Body, Controller, Post } from '@nestjs/common';
import { CreateTransferUseCase } from '@/transfer/application/create-transfer-use-case/create-transfer-use-case';
import { CreateTransferHttpDto } from './create-transfer.http-dto';
import { PrimitiveTransfer } from '@/transfer/domain/transfer.entity';
import { Decimal } from '@prisma/client/runtime/library';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// Controlador para crear una nueva transferencia
@ApiTags('transfer')
@Controller('transfer')
export class CreateTransferController {
  constructor(private createTransferUseCase: CreateTransferUseCase) {}

  /**
   * Crea una nueva transferencia.
   * @param createTransferHttpDto - Datos de la transferencia a crear.
   * @returns Un objeto con la transferencia creada.
   */
  @Post()
  @ApiOperation({ summary: 'Crear una nueva transferencia' })
  @ApiResponse({
    status: 201,
    description: 'Transferencia creada correctamente'
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async run(
    @Body() createTransferHttpDto: CreateTransferHttpDto
  ): Promise<{ transfer: PrimitiveTransfer }> {
    return await this.createTransferUseCase.execute({
      amount: new Decimal(createTransferHttpDto.amount),
      debitAccount: createTransferHttpDto.debitAccount,
      creditAccount: createTransferHttpDto.creditAccount,
      companyId: createTransferHttpDto.companyId,
      createdAt: createTransferHttpDto.createdAt ?? undefined
    });
  }
}
