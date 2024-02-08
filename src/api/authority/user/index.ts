import request from "@/utils/request";
import type {
  UserResponseData,
  User,
  SetRoleData,
  AllRoleResponseData,
} from "./type";
const API = {
  //获取全部已有用户账号信息
  ALLUSER_URL: import.meta.env.VITE_APP_ALLUSER_URL as string,
  //添加一个新的用户账号
  ADDUSER_URL: import.meta.env.VITE_APP_ADDUSER_URL as string,
  //   //更新已有的用户账号
  UPDATEUSER_URL: import.meta.env.VITE_APP_UPDATEUSER_URL as string,
  SETROLE_URL: import.meta.env.VITE_APP_SETROLE_URL as string,
  ALLROLE_URL: import.meta.env.VITE_APP_ALLROLE_URL as string,
  DELETEUSER_URL: import.meta.env.VITE_APP_DELETEUSER_URL,
  //批量删除的接口
  DELETEALLUSER_URL: import.meta.env.VITE_APP_DELETEALLUSER_URL,
  //   //获取全部职位,当前账号拥有的职位接口
  //   ALLROLEURL = "/admin/acl/user/toAssign/",
  //   //给已有的用户分配角色接口
  //   SETROLE_URL = "/admin/acl/user/doAssignRole",
  //   //删除某一个账号
  //   DELETEUSER_URL = "/admin/acl/user/remove/",
  //   //批量删除的接口
  //   DELETEALLUSER_URL = "/admin/acl/user/batchRemove",
};
console.log("API List:", API);
//获取用户账号信息的接口
export const reqUserInfo = (page: number, limit: number, username: string) =>
  request.get<any, UserResponseData>(
    API.ALLUSER_URL + `${page}/${limit}/?username=${username}`
  );
export const reqAddOrUpdateUser = (data: User) => {
  //携带参数有ID更新
  if (data.id) {
    return request.put<any, any>(API.UPDATEUSER_URL, data);
  } else {
    return request.post<any, any>(API.ADDUSER_URL, data);
  }
};
export const reqAllRole = (userId: number) =>
  request.get<any, AllRoleResponseData>(API.ALLROLE_URL + userId);
export const reqSetUserRole = (data: SetRoleData) =>
  request.post<any, any>(API.SETROLE_URL, data);
export const reqRemoveUser = (userId: number) =>
  request.delete<any, any>(API.DELETEUSER_URL + userId);
export const reqSelectUser = (idList: number[]) =>
  request.delete(API.DELETEALLUSER_URL, { data: idList });
