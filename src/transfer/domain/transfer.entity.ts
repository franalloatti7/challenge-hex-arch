import { Decimal } from '@prisma/client/runtime/library';
import { v4 as uuidv4 } from 'uuid';

// Este archivo define la entidad Transfer y su lógica de creación y validación.
// Además, define la interfaz PrimitiveTransfer que representa los datos primitivos de una transferencia.
export interface PrimitiveTransfer {
  id: string;
  amount: Decimal;
  debitAccount: string;
  creditAccount: string;
  companyId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Transfer {
  constructor(private attributes: PrimitiveTransfer) {}

  static create(createTransfer: {
    amount: Decimal;
    debitAccount: string;
    creditAccount: string;
    companyId: string;
    createdAt?: Date;
  }): Transfer {
    return new Transfer({
      id: uuidv4(),
      amount: createTransfer.amount,
      debitAccount: createTransfer.debitAccount,
      creditAccount: createTransfer.creditAccount,
      companyId: createTransfer.companyId,
      createdAt: createTransfer.createdAt ?? undefined
    });
  }

  toValue(): PrimitiveTransfer {
    return {
      id: this.attributes.id,
      amount: this.attributes.amount,
      debitAccount: this.attributes.debitAccount,
      creditAccount: this.attributes.creditAccount,
      companyId: this.attributes.companyId,
      createdAt: this.attributes.createdAt,
      updatedAt: this.attributes.updatedAt
    };
  }
}
