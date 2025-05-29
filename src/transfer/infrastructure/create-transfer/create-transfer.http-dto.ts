import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// DTO para crear una nueva transferencia
export class CreateTransferHttpDto {
  @IsNotEmpty({ message: 'El monto es obligatorio' })
  @Matches(/^\d{1,8}(\.\d{1,2})?$/, {
    message: 'El monto debe tener hasta 10 dígitos y como máximo 2 decimales'
  })
  @ApiProperty({
    description: 'Monto de la transferencia',
    type: String,
    example: '100.00'
  })
  amount!: string;

  @IsString()
  @IsNotEmpty()
  @Length(22, 22, {
    message: 'La cuenta débito debe tener exactamente 22 dígitos (CBU)'
  })
  @Matches(/^(\d{22})$/, {
    message: 'La cuenta débito solo puede contener números (CBU)'
  })
  @ApiProperty({
    description: 'Cuenta de débito (CBU)',
    type: String,
    example: '1234567890123456789012'
  })
  debitAccount!: string;

  @IsString()
  @IsNotEmpty()
  @Length(22, 22, {
    message: 'La cuenta crédito debe tener exactamente 22 dígitos (CBU)'
  })
  @Matches(/^(\d{22})$/, {
    message: 'La cuenta crédito solo puede contener números (CBU)'
  })
  @ApiProperty({
    description: 'Cuenta de crédito (CBU)',
    type: String,
    example: '1234567890123456789013'
  })
  creditAccount!: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID de la empresa',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  companyId!: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  createdAt?: Date;
}
