<template>
  <div class="character">
    <el-card>
      <el-form
        :inline="true"
        class="form"
      >
        <el-form-item label="职位搜索">
          <el-input
            v-model="keyword"
            placeholder="请你输入搜索职位关键字"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="default"
            :disabled="keyword ? false : true"
            @click="search"
          >
            搜索
          </el-button>
          <el-button
            type="primary"
            size="default"
            @click="refresh"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0px">
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        @click="addRole"
      >
        添加职位
      </el-button>
      <el-table
        border
        style="margin: 10px 0px"
        :data="allRole"
      >
        <el-table-column
          type="index"
          align="center"
          label="#"
        ></el-table-column>
        <el-table-column
          label="ID"
          align="center"
          prop="id"
        ></el-table-column>
        <el-table-column
          label="职位名称"
          align="center"
          prop="roleName"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="创建世间"
          align="center"
          show-overflow-tooltip
          prop="createTime"
        ></el-table-column>
        <el-table-column
          label="更新时间"
          align="center"
          show-overflow-tooltip
          prop="updateTime"
        ></el-table-column>
        <el-table-column
          label="操作"
          width="280px"
          align="center"
        >
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="User"
              @click="setPermisstion(row)"
            >
              分配权限
            </el-button>
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateRole(row)"
            >
              编辑
            </el-button>
            <el-popconfirm
              :title="`你确定要删除${row.roleName}?`"
              width="260px"
              @confirm="removeRole(row.id)"
            >
              <template #reference>
                <el-button
                  type="primary"
                  size="small"
                  icon="Delete"
                >
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :background="true"
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="total"
        @current-change="getHasRole"
      />
    </el-card>
    <el-dialog
      v-model="dialogVisite"
      :title="RoleParams.id ? '更新职位' : '添加职位'"
    >
      <el-form ref="form">
        <el-form-item
          label="职位名称"
          prop="roleName"
        >
          <el-input
            v-model="RoleParams.roleName"
            placeholder="请你输入职位名称"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button
          type="primary"
          size="default"
          @click="dialogVisite = false"
        >
          取消
        </el-button>
        <el-button
          type="primary"
          size="default"
          @click="save"
          >确定</el-button
        >
      </template>
    </el-dialog>
    <el-drawer v-model="drawer">
      <template #header>
        <h4>分配菜单与按钮的权限</h4>
      </template>
      <template #default>
        <el-tree
          ref="tree"
          show-checkbox
          node-key="id"
          :data="menuArr"
          :default-checked-keys="selectArr"
          :props="defaultProps"
          default-expand-all
        />
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button>取消</el-button>
          <el-button type="primary">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive, nextTick } from "vue";
import {
  reqAllRoleList,
  reqAllMenuList,
  reqAddOrUpdateRole,
  reqRemoveRole,
} from "@/api/authority/character";
import type {
  RoleResponseData,
  Records,
  RoleData,
  MenuResponseData,
  MenuList,
} from "@/api/authority/character/type";
import { ElMessage } from "element-plus";
import useLayoutStore from "@/ts/store/layout";
let keyword = ref<string>("");
let pageNo = ref<number>(1);
let pageSize = ref<number>(10);
let total = ref<number>(0);
let allRole = ref<Records>([]);
let drawer = ref<boolean>(false);
let menuArr = ref<MenuList>([]);
let selectArr = ref<number[]>([]);
let dialogVisite = ref<boolean>(false);
let form = ref<any>();
const defaultProps = {
  children: "children",
  label: "name",
};
let RoleParams = reactive<RoleData>({
  roleName: "",
});
const layoutStore = useLayoutStore();

const getHasRole = async (pager = 1) => {
  //修改当前页码
  pageNo.value = pager;
  let result: RoleResponseData = await reqAllRoleList(
    pageNo.value,
    pageSize.value,
    keyword.value
  );
  if (result.code == 200) {
    total.value = result.data.total;
    allRole.value = result.data.records;
  }
};

const search = () => {
  //再次发请求根据关键字
  getHasRole();
  keyword.value = "";
};

const { refresh } = layoutStore;

onMounted(() => {
  //获取职位请求
  getHasRole();
});

const setPermisstion = async (row: RoleData) => {
  //抽屉显示出来
  drawer.value = true;
  //收集当前要分类权限的职位的数据
  Object.assign(RoleParams, row);
  //根据职位获取权限的数据
  let result: MenuResponseData = await reqAllMenuList(RoleParams.id as number);
  if (result.code == 200) {
    menuArr.value = result.data;
    console.log(`this is menuarr:@@`, menuArr.value);

    selectArr.value = filterSelectArr(menuArr.value, []);
  }
};
const filterSelectArr = (allData: MenuList, initArr: any[]) => {
  allData.forEach((item) => {
    if (item.select && item.level == 4) {
      initArr.push(item.id);
    }
    if (item.children && item.children.length > 0) {
      filterSelectArr(item.children, initArr);
    }
  });
  return initArr;
};
const addRole = () => {
  //对话框显示出来
  dialogVisite.value = true;
  //清空数据
  Object.assign(RoleParams, {
    roleName: "",
    id: 0,
  });
  //清空上一次表单校验错误结果
  nextTick(() => {
    form.value.clearValidate("roleName");
  });
};
const save = async () => {
  //表单校验结果,结果通过在发请求、结果没有通过不应该在发生请求
  await form.value.validate();
  //添加职位|更新职位的请求
  let result: any = await reqAddOrUpdateRole(RoleParams);
  if (result.code == 200) {
    //提示文字
    ElMessage({
      type: "success",
      message: RoleParams.id ? "更新成功" : "添加成功",
    });
    //对话框显示
    dialogVisite.value = false;
    //再次获取全部的已有的职位
    getHasRole(RoleParams.id ? pageNo.value : 1);
  }
};
const updateRole = (row: RoleData) => {
  //显示出对话框
  dialogVisite.value = true;
  //存储已有的职位----带有ID的
  Object.assign(RoleParams, row);
  //清空上一次表单校验错误结果
  nextTick(() => {
    form.value.clearValidate("roleName");
  });
};
const removeRole = async (id: number) => {
  let result: any = await reqRemoveRole(id);
  if (result.code == 200) {
    //提示信息
    ElMessage({ type: "success", message: "删除成功" });
    getHasRole(allRole.value.length > 1 ? pageNo.value : pageNo.value - 1);
  }
};
</script>
<style lang="scss" scoped></style>
