export type UserType = {
  id: number;
  inspectionId: number;
  login: string;
  name: string;
  password: string;
  type: UserTypes;
};

enum UserTypes {
  ADMIN,
  VIEWER,
}
