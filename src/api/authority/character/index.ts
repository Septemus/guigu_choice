import request from "@/utils/request";
import type { RoleResponseData, MenuResponseData, RoleData } from "./type";
//枚举地址
const API = {
  //获取全部的职位接口
  ALLROLE_URL: import.meta.env.VITE_APP_ALLROLE_URL,
  //新增岗位的接口地址
  ADDROLE_URL: import.meta.env.VITE_APP_ADDROLE_URL,
  //更新已有的职位
  UPDATEROLE_URL: import.meta.env.VITE_APP_UPDATEROLE_URL,
  //获取全部的菜单与按钮的数据
  ALLPERMISSTION: import.meta.env.VITE_APP_ALLPERMISSTION,
  //给相应的职位分配权限
  SETPERMISTION_URL: import.meta.env.VITE_APP_SETPERMISTION_URL,
  //删除已有的职位
  REMOVEROLE_URL: import.meta.env.VITE_APP_REMOVEROLE_URL,
};
export const reqAllRoleList = (page: number, limit: number, roleName: string) =>
  request.get<any, RoleResponseData>(
    API.ALLROLE_URL + `${page}/${limit}/?roleName=${roleName}`
  );

//获取全部菜单与按钮权限数据
export const reqAllMenuList = (roleId: number) =>
  request.get<any, MenuResponseData>(API.ALLPERMISSTION + roleId);

export const reqAddOrUpdateRole = (data: RoleData) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEROLE_URL, data);
  } else {
    return request.post<any, any>(API.ADDROLE_URL, data);
  }
};
export const reqRemoveRole = (roleId: number) =>
  request.delete<any, any>(API.REMOVEROLE_URL + roleId);
