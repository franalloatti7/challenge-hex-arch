import { Body, Controller, Post } from '@nestjs/common';
import { CreateTransferUseCase } from '@/transfer/application/create-transfer-use-case/create-transfer-use-case';
import { CreateTransferHttpDto } from './create-transfer.http-dto';
import { PrimitiveTransfer } from '@/transfer/domain/transfer.entity';
import { Decimal } from '@prisma/client/runtime/library';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOperation,
  ApiTags,
  getSchemaPath
} from '@nestjs/swagger';
import { ApiResponseDto } from '@/common/dto/api-response.dto';

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
  @ApiExtraModels(ApiResponseDto, CreateTransferHttpDto)
  @ApiCreatedResponse({
    description: 'Transferencia creada exitosamente',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            data: {
              type: 'object',
              properties: {
                company: { $ref: getSchemaPath(CreateTransferHttpDto) }
              }
            }
          }
        }
      ]
    }
  })
  @ApiBadRequestResponse({ description: 'Error al crear transferencia' })
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
