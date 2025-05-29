import { Body, Controller, Post } from '@nestjs/common';
import { CreateCompanyUseCase } from '@/company/application/create-company-use-case/create-company-use-case';
import { CreateCompanyHttpDto } from './create-company.http-dto';
import { PrimitiveCompany } from '@/company/domain/company.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

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
  @ApiResponse({
    status: 201,
    description: 'Empresa creada correctamente'
  })
  @ApiResponse({
    status: 409,
    description: 'Ya existe una empresa con estos datos (Razon Social y/o CUIT)'
  })
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
