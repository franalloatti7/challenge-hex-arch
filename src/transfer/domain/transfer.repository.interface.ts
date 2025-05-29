import { Transfer } from './transfer.entity';

// Interfaz del repositorio de transferencias
export abstract class TransferRepositoryInterface {
  abstract create(transfer: Transfer): Promise<Transfer>;
}
