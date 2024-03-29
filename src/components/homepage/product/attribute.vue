<template>
  <div>
    <!-- 三级分类全局组件 -->
    <Category :scene="scene" />
    <el-card style="margin: 10px 0px">
      <div v-show="scene == 0">
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          :disabled="categoryStore.c3Id ? false : true"
          @click="addAttr"
        >
          添加属性
        </el-button>
        <el-table
          border
          style="margin: 10px 0px"
          :data="attrArr"
        >
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
          ></el-table-column>
          <el-table-column
            label="属性名称"
            width="120px"
            prop="attrName"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template #default="{ row }">
              <el-tag
                v-for="item in row.attrValueList"
                :key="item.id"
                style="margin: 5px"
              >
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="120px"
          >
            <!-- row：已有的属性对象 -->
            <template #default="{ row }">
              <!-- 修改已有属性的按钮 -->
              <el-button
                type="primary"
                size="small"
                icon="Edit"
                @click="updateAttr(row)"
              ></el-button>
              <el-popconfirm
                :title="`你确定删除${row.attrName}?`"
                width="200px"
                @confirm="deleteAttr(row.id)"
              >
                <template #reference>
                  <el-button
                    type="primary"
                    size="small"
                    icon="Delete"
                  ></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene == 1">
        <!-- 展示添加属性与修改数据的结构 -->
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input
              v-model="attrParams.attrName"
              placeholder="请你输入属性名称"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          @click="addAttrValue"
        >
          添加属性值
        </el-button>
        <el-button
          type="primary"
          size="default"
          @click="cancel"
        >
          取消
        </el-button>
        <el-table
          border
          style="margin: 10px 0px"
          :data="attrParams.attrValueList"
        >
          <el-table-column
            label="序号"
            width="80px"
            type="index"
            align="center"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <!-- row:即为当前属性值对象 -->
            <template #default="{ row, $index }">
              <el-input
                v-if="row.flag"
                :ref="(vc: any) => (inputArr[$index] = vc)"
                v-model="row.valueName"
                size="small"
                placeholder="请你输入属性值名称"
                @blur="toLook(row, $index)"
              ></el-input>
              <div
                v-else
                @click="toEdit(row, $index)"
              >
                {{ row.valueName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作">
            <template #default="{ $index }">
              <el-button
                type="primary"
                size="small"
                icon="Delete"
                @click="attrParams.attrValueList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          size="default"
          :disabled="attrParams.attrValueList.length > 0 ? false : true"
          @click="save"
        >
          保存
        </el-button>
        <el-button
          type="primary"
          size="default"
          @click="cancel"
        >
          取消
        </el-button>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, nextTick, watch } from "vue";
import useCategoryStore from "@/ts/store/category";
import type {
  Attr,
  AttrValue,
  AttrResponseData,
} from "@/api/product/attr/type";
import { reqAddOrUpdateAttr, reqAttr, reqRemoveAttr } from "@/api/product/attr";
import { ElMessage } from "element-plus";

let scene = ref<number>(0);
let categoryStore = useCategoryStore();
let attrArr = ref<Attr[]>([]);
let inputArr = ref<any>([]);
let attrParams = reactive<Attr>({
  attrName: "", //新增的属性的名字
  attrValueList: [
    //新增的属性值数组
  ],
  categoryId: "", //三级分类的ID
  categoryLevel: 3, //代表的是三级分类
});
const addAttr = () => {
  //每一次点击的时候,先清空一下数据再收集数据
  Object.assign(attrParams, {
    attrName: "", //新增的属性的名字
    attrValueList: [
      //新增的属性值数组
    ],
    categoryId: categoryStore.c3Id, //三级分类的ID
    categoryLevel: 3, //代表的是三级分类
  });
  //切换为添加与修改属性的结构
  scene.value = 1;
};
//添加属性值按钮的回调
const addAttrValue = () => {
  //点击添加属性值按钮的时候,向数组添加一个属性值对象
  attrParams.attrValueList.push({
    valueName: "",
    flag: true, //控制每一个属性值编辑模式与切换模式的切换
  });
  //获取最后el-input组件聚焦
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus();
  });
};
//table表格修改已有属性按钮的回调
const updateAttr = (row: Attr) => {
  //切换为添加与修改属性的结构
  scene.value = 1;
  //将已有的属性对象赋值给attrParams对象即为
  //ES6->Object.assign进行对象的合并
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)));
};
//保存按钮的回调
const save = async () => {
  //发请求
  let result: any = await reqAddOrUpdateAttr(attrParams);
  //添加属性|修改已有的属性已经成功
  if (result.code == 200) {
    //切换场景
    scene.value = 0;
    //提示信息
    ElMessage({
      type: "success",
      message: attrParams.id ? "修改成功" : "添加成功",
    });
    //获取全部已有的属性与属性值
    getAttr();
  } else {
    ElMessage({
      type: "error",
      message: attrParams.id ? "修改失败" : "添加失败",
    });
  }
};
watch(
  () => categoryStore.c3Id,
  () => {
    //清空上一次查询的属性与属性值
    attrArr.value = [];
    //保证三级分类得有才能发请求
    if (!categoryStore.c3Id) return;
    //获取分类的ID
    getAttr();
  }
);

//删除某一个已有的属性方法回调
const deleteAttr = async (attrId: number) => {
  //发相应的删除已有的属性的请求
  let result: any = await reqRemoveAttr(attrId);
  //删除成功
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "删除成功",
    });
    //获取一次已有的属性与属性值
    getAttr();
  } else {
    ElMessage({
      type: "error",
      message: "删除失败",
    });
  }
};

//属性值表单元素失却焦点事件回调
const toLook = (row: AttrValue, $index: number) => {
  //非法情况判断1
  if (row.valueName.trim() == "") {
    //删除调用对应属性值为空的元素
    attrParams.attrValueList.splice($index, 1);
    //提示信息
    ElMessage({
      type: "error",
      message: "属性值不能为空",
    });
    return;
  }
  //非法情况2
  let repeat = attrParams.attrValueList.find((item) => {
    //切记把当前失却焦点属性值对象从当前数组扣除判断
    if (item != row) {
      return item.valueName === row.valueName;
    }
  });

  if (repeat) {
    //将重复的属性值从数组当中干掉
    attrParams.attrValueList.splice($index, 1);
    //提示信息
    ElMessage({
      type: "error",
      message: "属性值不能重复",
    });
    return;
  }
  //相应的属性值对象flag:变为false,展示div
  row.flag = false;
};
//取消按钮的回调
const cancel = () => {
  scene.value = 0;
};
//获取已有的属性与属性值方法
const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore;
  //获取分类下的已有的属性与属性值
  let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id);
  if (result.code == 200) {
    attrArr.value = result.data;
  }
};
const toEdit = (row: AttrValue, $index: number) => {
  //相应的属性值对象flag:变为true,展示input
  row.flag = true;
  //nextTick:响应式数据发生变化,获取更新的DOM(组件实例)
  nextTick(() => {
    inputArr.value[$index].focus();
  });
};
</script>
<style lang="scss" scoped></style>
