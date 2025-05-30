import { Body, Controller, Post } from '@nestjs/common';
import { CreateCompanyUseCase } from '@/company/application/create-company-use-case/create-company-use-case';
import { CreateCompanyHttpDto } from './create-company.http-dto';
import { PrimitiveCompany } from '@/company/domain/company.entity';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath
} from '@nestjs/swagger';
import { ApiResponseDto } from '@/common/dto/api-response.dto';

// Controlador para crear una nueva empresa
@ApiTags('company')
@Controller('company')
export class CreateCompanyController {
  constructor(private createCompanyUseCase: CreateCompanyUseCase) {}

  /**
   * Crea una nueva empresa.
   * @param createCompanyHttpDto - Datos de la empresa a crear.
   * @returns La empresa creada.
   */
  @Post()
  @ApiOperation({ summary: 'Crear una nueva empresa' })
  @ApiExtraModels(ApiResponseDto, CreateCompanyHttpDto)
  @ApiCreatedResponse({
    description: 'Empresa creada exitosamente',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            statusCode: { type: 'integer', example: 201 },
            data: {
              type: 'object',
              properties: {
                company: { $ref: getSchemaPath(CreateCompanyHttpDto) }
              }
            }
          }
        }
      ]
    }
  })
  @ApiResponse({
    status: 409,
    description: 'Ya existe una empresa con estos datos (Razon Social y/o CUIT)'
  })
  @ApiBadRequestResponse({ description: 'Error al crear empresa' })
  async run(
    @Body() createCompanyHttpDto: CreateCompanyHttpDto
  ): Promise<{ company: PrimitiveCompany }> {
    return await this.createCompanyUseCase.execute({
      cuit: createCompanyHttpDto.cuit,
      companyName: createCompanyHttpDto.companyName,
      adhesionDate: createCompanyHttpDto.adhesionDate
    });
  }
}
