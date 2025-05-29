import { Injectable } from '@nestjs/common';
import { Transfer } from '@/transfer/domain/transfer.entity';
import { TransferRepositoryInterface } from '@/transfer/domain/transfer.repository.interface';
import { PrismaService } from '@/prisma.service';

// Repositorio de transferencias que implementa la interfaz TransferRepositoryInterface
@Injectable()
export class TransferRepository implements TransferRepositoryInterface {
  constructor(private prisma: PrismaService) {}

  /**
   * Crea una nueva transferencia en la base de datos.
   * @param transfer - La transferencia a crear.
   * @returns La transferencia creada.
   */
  async create(transfer: Transfer): Promise<Transfer> {
    const transferToCreate = transfer.toValue();
    const created = await this.prisma.transfer.create({
      data: transferToCreate
    });
    return new Transfer(created);
  }
}
