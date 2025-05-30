import { Controller, Get } from '@nestjs/common';
import { GetCompaniesWithTransfersLastMonthUseCase } from '@/company/application/get-companies-with-transfers-last-month-use-case/get-companies-with-transfers-last-month-use-case';
import { PrimitiveCompany } from '@/company/domain/company.entity';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath
} from '@nestjs/swagger';
import { ApiResponseDto } from '@/common/dto/api-response.dto';
import { CreateCompanyHttpDto } from '@/company/infrastructure/create-company/create-company.http-dto';

// Controlador para listar las empresas que hicieron transferencias el último mes
@ApiTags('company')
@Controller('company')
export class GetCompaniesWithTransfersLastMonthController {
  constructor(
    private readonly getCompaniesWithTransfersLastMonthUseCase: GetCompaniesWithTransfersLastMonthUseCase
  ) {}

  /**
   * Obtiene las empresas que hicieron transferencias el último mes.
   * @returns Un objeto con un array de empresas.
   */
  @Get('with-transfers-last-month')
  @ApiOperation({
    summary: 'Listar las empresas que hicieron transferencias el último mes'
  })
  @ApiExtraModels(ApiResponseDto, CreateCompanyHttpDto)
  @ApiOkResponse({
    description: 'Empresas listadas exitosamente',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            statusCode: { type: 'integer', example: 200 },
            message: { type: 'string', example: 'OK' },
            data: {
              type: 'object',
              properties: {
                companies: {
                  type: 'array',
                  items: { $ref: getSchemaPath(CreateCompanyHttpDto) }
                }
              }
            }
          }
        }
      ]
    }
  })
  async run(): Promise<{ companies: PrimitiveCompany[] }> {
    return await this.getCompaniesWithTransfersLastMonthUseCase.execute();
  }
}
