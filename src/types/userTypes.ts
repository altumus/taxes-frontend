import { IsNumber, IsString } from "class-validator";

export type UserType = {
  id: number;
  inspectionId: number;
  login: string;
  name: string;
  password: string;
  type: UserTypes;
  inspectionCode: string;
  inspectionName: string;
};

export type CreateUserType = {
  inspectionId: number;
  login: string;
  name: string;
  password: string;
  type: string;
};

export class EditUserDto {
  @IsNumber()
  id: number;

  @IsString()
  login: string;

  @IsString()
  name: string;

  @IsString()
  password: string;
}

enum UserTypes {
  ADMIN,
  VIEWER,
}
