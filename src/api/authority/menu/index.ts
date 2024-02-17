import request from "@/utils/request";
//获取菜单数据
import type { PermissionResponseData, MenuParams } from "./type.ts";

const API = {
  //获取全部菜单与按钮的标识数据
  ALLPERMISSION_URL: import.meta.env.VITE_APP_ALLPERMISSION_URL,
  UPDATE_URL: import.meta.env.VITE_APP_UPDATE_URL,
  ADDMENU_URL: import.meta.env.VITE_APP_ADDMENU_URL,
  DELETEMENU_URL: import.meta.env.VITE_APP_DELETEMENU_URL,
};

export const reqAllPermission = () =>
  request.get<any, PermissionResponseData>(API.ALLPERMISSION_URL);
export const reqAddOrUpdateMenu = (data: MenuParams) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATE_URL, data);
  } else {
    return request.post<any, any>(API.ADDMENU_URL, data);
  }
};

export const reqRemoveMenu = (id: number) =>
  request.delete<any, any>(API.DELETEMENU_URL + id);
