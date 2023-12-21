import type {
  loginFormData,
  loginResponseData,
  userInfoData,
  userInfoReponseData,
} from "@/api/user/type";
import { defineStore } from "pinia";
import { reqLogin, reqUserInfo } from "@/api/user/index";
import { reactive } from "vue";
// import { Ref, ref } from "vue";
export default defineStore("user", () => {
  // const token: Ref<string | null> = ref(getToken());
  const realUserInfo: userInfoData = reactive({
    routes: [],
    buttons: [],
    roles: [],
    name: "",
    avatar: "",
  });
  // const token = computed(() => {
  //   return localStorage.getItem("token");
  // });
  // function getToken(): string | null {

  // }
  function login(loginInfo: loginFormData): Promise<loginResponseData> {
    return reqLogin(loginInfo);
  }
  function info(): Promise<null> {
    // token.value = getToken();
    return reqUserInfo().then((res: userInfoReponseData) => {
      if (res.ok) {
        updInfo(res.data);
        return Promise.resolve(null);
      } else return Promise.reject(res.message);
    });
  }
  function updInfo(res: userInfoData): void {
    Object.keys(realUserInfo).forEach((key: string) => {
      realUserInfo[key] = res[key];
    });
  }
  return { realUserInfo, login, info };
});
