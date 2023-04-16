import { IsString, IsNumber } from "class-validator";

export class CreateClientRequest {
  @IsNumber()
  inspectionId: number;

  @IsString()
  inn: string;

  @IsString()
  phone: string;

  @IsString()
  email: string;

  @IsString()
  clientType: string;

  @IsString()
  name: string;
}

export class CreateOrganizationRequest {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  organizationInn: string;

  @IsString()
  organizationKpp: string;

  @IsString()
  organizationOgrn: string;

  @IsString()
  organizationPhysicalAddress: string;

  @IsString()
  organizationJuridicalAddress: string;

  @IsString()
  ownerPosition: string;

  @IsNumber()
  inspectionId: number;

  @IsNumber()
  taxesTypeId: number;

  @IsNumber()
  clientId: number;
}

export type Client = {
  id: number;
  clientType: string;
  dateCreate: string;
  email: string;
  inn: string;
  name: string;
  phone: string;
  organizations: Organization[];
  TaxesPayment: Taxes[];
};

export type Taxes = {
  id: number;
  paymentDate: string;
  nextPaymentDate: string;
  income: number;
};

export type Organization = {
  id: number;
  name: string;
  organizationInn: string;
  organizationKpp: string;
  organizationOgrn: string;
  organizationPhysicalAddress: string;
  organizationJuridicalAddress: string;
  ownerPosition: string;
  inspectionId: number;
  taxesTypeId: number;
  clientId: number;
};

export class CreatePaymentRequest {
  @IsNumber()
  clientId: number;

  @IsNumber()
  organizationId: number;

  @IsNumber()
  income: number;
}
