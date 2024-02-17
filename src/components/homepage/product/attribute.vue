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
              ></el-button>
              <el-popconfirm
                :title="`你确定删除${row.attrName}?`"
                width="200px"
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
            <el-input placeholder="请你输入属性名称"></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          size="default"
          icon="Plus"
        >
          添加属性值
        </el-button>
        <el-button
          type="primary"
          size="default"
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
                size="small"
                placeholder="请你输入属性值名称"
              ></el-input>
              <div v-else>
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
        >
          保存
        </el-button>
        <el-button
          type="primary"
          size="default"
        >
          取消
        </el-button>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import useCategoryStore from "@/ts/store/category";
import type { Attr } from "@/api/product/attr/type";
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
</script>
<style lang="scss" scoped></style>
