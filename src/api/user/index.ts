import axios from "@/utils/request";
import type {
  loginFormData,
  loginResponseData,
  userInfoReponseData,
} from "./type";
const API: {
  LOGIN_URL: string;
  USERINFO_URL: string;
} = {
  LOGIN_URL: import.meta.env.VITE_APP_LOGIN_API,
  USERINFO_URL: import.meta.env.VITE_APP_USERINFO_API,
};

//登录接口
export const reqLogin = (data: loginFormData) =>
  axios.post<any, loginResponseData>(API.LOGIN_URL, data);
//获取用户信息
export const reqUserInfo = () =>
  axios.get<any, userInfoReponseData>(API.USERINFO_URL);
//退出登录
