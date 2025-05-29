import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// DTO para crear una nueva empresa
export class CreateCompanyHttpDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^(20|23|24|27|30|33|34)-[0-9]{8}-[0-9]$/, {
    message: 'CUIT debe ser en formato XX-XXXXXXXX-X'
  })
  @ApiProperty({
    description: 'Cuit de la empresa',
    type: String,
    example: '20-12345678-9'
  })
  cuit!: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 50, {
    message: 'La Razón social debe tener entre 6 y 50 caracteres'
  })
  @ApiProperty({
    description: 'Razón social de la empresa',
    type: String,
    example: 'Empresa Test'
  })
  companyName!: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @ApiProperty({
    description: 'Fecha de adhesión de la empresa',
    type: Date,
    required: false,
    example: '2025-05-29T00:00:00.000Z'
  })
  adhesionDate?: Date;
}
