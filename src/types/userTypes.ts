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

enum UserTypes {
  ADMIN,
  VIEWER,
}
