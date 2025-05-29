import { Controller, Get } from '@nestjs/common';
import { GetCompaniesWithTransfersLastMonthUseCase } from '@/company/application/get-companies-with-transfers-last-month-use-case/get-companies-with-transfers-last-month-use-case';
import { PrimitiveCompany } from '@/company/domain/company.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

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
  async run(): Promise<{ companies: PrimitiveCompany[] }> {
    return await this.getCompaniesWithTransfersLastMonthUseCase.execute();
  }
}
