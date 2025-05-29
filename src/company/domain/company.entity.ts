import { v4 as uuidv4 } from 'uuid';

// Este archivo define la entidad Company y su lógica de creación y validación.
// Además, define la interfaz PrimitiveCompany que representa los datos primitivos de una empresa.
export interface PrimitiveCompany {
  id: string;
  cuit: string;
  companyName: string;
  adhesionDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Company {
  constructor(private attributes: PrimitiveCompany) {}

  static create(createCompany: {
    cuit: string;
    companyName: string;
    adhesionDate?: Date;
  }): Company {
    return new Company({
      id: uuidv4(),
      cuit: createCompany.cuit,
      companyName: createCompany.companyName,
      adhesionDate: createCompany.adhesionDate
    });
  }

  toValue(): PrimitiveCompany {
    return {
      id: this.attributes.id,
      cuit: this.attributes.cuit,
      companyName: this.attributes.companyName,
      adhesionDate: this.attributes.adhesionDate,
      createdAt: this.attributes.createdAt,
      updatedAt: this.attributes.updatedAt
    };
  }
}
