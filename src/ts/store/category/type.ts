//定义分类仓库state对象的ts类型
import type { CategoryObj } from "@/api/product/attr/type";
export interface CategoryState {
  c1Id: string | number;
  c1Arr: CategoryObj[];
  c2Arr: CategoryObj[];
  c2Id: string | number;
  c3Arr: CategoryObj[];
  c3Id: string | number;
}
