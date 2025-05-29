import { Controller, Get } from '@nestjs/common';
import { GetCompaniesAddedLastMonthUseCase } from '@/company/application/get-companies-added-last-month-use-case/get-companies-added-last-month-use-case';
import { PrimitiveCompany } from '@/company/domain/company.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

// Controlador para listar las empresas que se adhirieron el último mes
@ApiTags('company')
@Controller('company')
export class GetCompaniesAddedLastMonthController {
  constructor(
    private readonly getCompaniesAddedLastMonthUseCase: GetCompaniesAddedLastMonthUseCase
  ) {}

  /**
   * Obtiene las empresas que se adhirieron el último mes.
   * @returns Un objeto con un array de empresas.
   */
  @Get('added-last-month')
  @ApiOperation({
    summary: 'Listar las empresas que se adhirieron el último mes'
  })
  async run(): Promise<{ companies: PrimitiveCompany[] }> {
    return await this.getCompaniesAddedLastMonthUseCase.execute();
  }
}
