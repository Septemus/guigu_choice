import { TradeMarkResponseData } from "./type";
import request from "@/utils/request";
const API = {
  TRADEMARK_URL: import.meta.env.VITE_APP_TRADEMARK_URL,
};
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`
  );
