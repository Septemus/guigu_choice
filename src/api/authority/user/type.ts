export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}
export interface User {
  id?: number;
  createTime?: string;
  updateTime?: string;
  username?: string;
  password?: string;
  name?: string;
  phone?: null;
  roleName?: string;
}
//数组包含全部的用户信息
export type Records = User[];
export interface UserResponseData extends ResponseData {
  data: {
    records: Records;
    total: number;
    size: number;
    current: number;
    pages: number;
  };
}

export interface RoleData {
  id?: number;
  createTime?: string;
  updateTime?: string;
  roleName: string;
  remark: null;
}
//全部职位的列表
export type AllRole = RoleData[];

export interface SetRoleData {
  roleIdList: number[];
  userId: number;
}
export interface AllRoleResponseData extends ResponseData {
  data: {
    assignRoles: AllRole;
    allRolesList: AllRole;
  };
}
