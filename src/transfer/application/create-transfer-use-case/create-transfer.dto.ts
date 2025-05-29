import { Decimal } from '@prisma/client/runtime/library';

// DTO para la creación de transferencias.
export interface CreateTransferDto {
  amount: Decimal;
  debitAccount: string;
  creditAccount: string;
  createdAt?: Date;
  updatedAt?: Date;
  companyId: string;
}
