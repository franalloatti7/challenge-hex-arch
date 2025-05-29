// DTO para la creación de una empresa
export interface CreateCompanyDto {
  cuit: string;
  companyName: string;
  adhesionDate?: Date | undefined;
  createdAt?: Date;
  updatedAt?: Date;
}
