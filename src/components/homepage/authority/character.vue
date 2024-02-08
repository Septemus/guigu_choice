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
            >
              分配权限
            </el-button>
            <el-button
              type="primary"
              size="small"
              icon="Edit"
            >
              编辑
            </el-button>
            <el-popconfirm
              :title="`你确定要删除${row.roleName}?`"
              width="260px"
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
    <el-dialog>
      <el-form ref="form">
        <el-form-item
          label="职位名称"
          prop="roleName"
        >
          <el-input placeholder="请你输入职位名称"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button
          type="primary"
          size="default"
        >
          取消
        </el-button>
        <el-button
          type="primary"
          size="default"
          >确定</el-button
        >
      </template>
    </el-dialog>
    <el-drawer>
      <template #header>
        <h4>分配菜单与按钮的权限</h4>
      </template>
      <template #default>
        <el-tree
          ref="tree"
          show-checkbox
          node-key="id"
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
import { ref, onMounted } from "vue";
import { reqAllRoleList } from "@/api/authority/character";
import type { RoleResponseData, Records } from "@/api/authority/character/type";
import useLayoutStore from "@/ts/store/layout";
let keyword = ref<string>("");
let pageNo = ref<number>(1);
let pageSize = ref<number>(10);
let total = ref<number>(0);
let allRole = ref<Records>([]);
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
</script>
<style lang="scss" scoped></style>
