import { IsString, IsNumber, IsBoolean } from "class-validator";

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

export class EditClientRequest {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  inn: string;

  @IsString()
  phone: string;

  @IsString()
  email: string;

  @IsString()
  clientType: string;

  @IsBoolean()
  isArchived: boolean;
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
  haveOwe: boolean;
  isArchived: boolean;
};

export type Taxes = {
  id: number;
  paymentDate: string;
  nextPaymentDate: string;
  income: number;
  mustPay: string;
};

export type SuccessTaxes = {
  id: number;
  organizationId: number;
  paymentDate: string;
  paymentSum: string;
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
  TaxesPayment: Taxes[];
  TaxesSuccessPayment: SuccessTaxes[];
  isArchived: string;
  archiveDate: string;
};

export class CreatePaymentRequest {
  @IsNumber()
  clientId: number;

  @IsNumber()
  organizationId: number;

  @IsNumber()
  income: number;
}

export class EditOrganizationDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  organizationInn: string;

  @IsString()
  organizationJuridicalAddress: string;

  @IsString()
  organizationKpp: string;

  @IsString()
  organizationOgrn: string;

  @IsString()
  organizationPhysicalAddress: string;

  @IsString()
  ownerPosition: string;

  @IsNumber()
  taxesTypeId: number;
}

export const TaxesTypes = [
  {
    title: "УСН ДОХОДЫ ИП",
    bid: 6,
  },
  {
    title: "УСН ДОХОДЫ МИНУС РАСХОДЫ ИП",
    bid: 15,
  },
  {
    title: "ПСН",
    bid: 6,
  },
  {
    title: "НПМ",
    bid: 4,
  },
  {
    title: "УСН ДОХОДЫ ЮЛ",
    bid: 6,
  },
  {
    title: "УСН ДОХОДЫ МИНУС РАСХОДЫ ЮЛ",
    bid: 15,
  },
  {
    title: "ОРН ИП",
    bid: 13,
  },
  {
    title: "ОРН ЮЛ",
    bid: 20,
  },
];
