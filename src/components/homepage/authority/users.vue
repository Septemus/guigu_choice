<template>
  <div class="users">
    <el-card style="height: 80px">
      <el-form
        :inline="true"
        class="form"
      >
        <el-form-item label="用户名:">
          <el-input
            v-model="keyword"
            placeholder="请你输入搜索用户名"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="default"
            >搜索</el-button
          >
          <el-button
            type="primary"
            size="default"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0">
      <el-button
        type="primary"
        size="default"
        @click="addUser"
        >添加用户</el-button
      >
      <el-button
        type="primary"
        size="default"
        >批量删除</el-button
      >
      <!-- table展示用户信息 -->
      <el-table
        style="margin: 10px 0"
        border
        :data="userArr"
      >
        <el-table-column
          type="selection"
          align="center"
        ></el-table-column>
        <el-table-column
          label="#"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column
          label="ID"
          align="center"
          prop="id"
        ></el-table-column>
        <el-table-column
          label="用户名字"
          align="center"
          prop="username"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="用户名称"
          align="center"
          prop="name"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="用户角色"
          align="center"
          prop="roleName"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="创建时间"
          align="center"
          prop="createTime"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="更新时间"
          align="center"
          prop="updateTime"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="操作"
          width="300px"
          align="center"
        >
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="User"
              @click="setRole(row)"
              >分配角色</el-button
            >
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              >编辑</el-button
            >
            <el-popconfirm
              :title="`你确定要删除${row.username}?`"
              width="260px"
            >
              <template #reference>
                <el-button
                  type="primary"
                  size="small"
                  icon="Delete"
                  >删除</el-button
                >
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[5, 7, 9, 11]"
        :background="true"
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="total"
        @current-change="getHasUser"
        @size-change="getHasUser()"
      />
    </el-card>
    <!-- 抽屉结构:完成添加新的用户账号|更新已有的账号信息 -->
    <el-drawer v-model="drawer">
      <!-- 头部标题:将来文字内容应该动态的 -->
      <template #header>
        <h4>{{ userParams.id ? "更新用户" : "添加用户" }}</h4>
      </template>
      <!-- 身体部分 -->
      <template #default>
        <el-form
          ref="formRef"
          :model="userParams"
          :rules="rules"
        >
          <el-form-item
            label="用户姓名"
            prop="username"
          >
            <el-input
              v-model="userParams.username"
              placeholder="请您输入用户姓名"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="用户昵称"
            prop="name"
          >
            <el-input
              v-model="userParams.name"
              placeholder="请您输入用户昵称"
            ></el-input>
          </el-form-item>
          <el-form-item
            v-if="!userParams.id"
            label="用户密码"
            prop="password"
          >
            <el-input
              v-model="userParams.password"
              placeholder="请您输入用户密码"
            ></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancel">取消</el-button>
          <el-button
            type="primary"
            @click="save"
            >确定</el-button
          >
        </div>
      </template>
    </el-drawer>
    <!-- 抽屉结构:用户某一个已有的账号进行职位分配 -->
    <el-drawer v-model="drawer1">
      <template #header>
        <h4>分配角色(职位)</h4>
      </template>
      <template #default>
        <el-form>
          <el-form-item label="用户姓名">
            <el-input
              v-model="userParams.username"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="职位列表">
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
            >
              全选
            </el-checkbox>
            <!-- 显示职位的的复选框 -->
            <el-checkbox-group
              v-model="userRole"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox
                v-for="(role, index) in allRole"
                :key="index"
                :label="role"
              >
                {{ role.roleName }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawer1 = false">取消</el-button>
          <el-button
            type="primary"
            @click="confirmClick"
            >确定</el-button
          >
        </div>
      </template>
    </el-drawer>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive, nextTick } from "vue";
import {
  Records,
  UserResponseData,
  User,
  AllRole,
  SetRoleData,
  AllRoleResponseData,
} from "@/api/authority/user/type";
import {
  reqUserInfo,
  reqAddOrUpdateUser,
  reqSetUserRole,
  reqAllRole,
} from "@/api/authority/user";
import { ElMessage } from "element-plus";

onMounted(() => {
  getHasUser();
});
let pageNo = ref<number>(1);
//一页展示几条数据
let pageSize = ref<number>(5);
//用户总个数
let total = ref<number>(0);
//存储全部用户的数组
let userArr = ref<Records>([]);

let keyword = ref<string>("");

let userParams = reactive<User>({
  username: "",
  name: "",
  password: "",
});

let drawer = ref<boolean>(false);

let drawer1 = ref<boolean>(false);

const checkAll = ref<boolean>(false);

const isIndeterminate = ref<boolean>(true);

let formRef = ref<unknown>();

let userRole = ref<AllRole>([]);

let allRole = ref<AllRole>([]);

const handleCheckAllChange = (val: boolean) => {
  //val:true(全选)|false(没有全选)
  userRole.value = val ? allRole.value : [];
  //不确定的样式(确定样式)
  isIndeterminate.value = false;
};

const handleCheckedCitiesChange = (value: string[]) => {
  //顶部复选框的勾选数据
  //代表:勾选上的项目个数与全部的职位个数相等，顶部的复选框勾选上
  checkAll.value = value.length === allRole.value.length;
  //不确定的样式
  isIndeterminate.value = value.length !== allRole.value.length;
};

//校验用户名字回调函数
const validatorUsername = (rule: any, value: string, callBack: any) => {
  //用户名字|昵称,长度至少五位
  rule = null;
  if (value.trim().length >= 5) {
    callBack();
  } else {
    callBack(new Error("用户名字至少五位"));
  }
};
//校验用户名字回调函数
const validatorname = (rule: any, value: string, callBack: any) => {
  //用户名字|昵称,长度至少五位
  rule = null;
  if (value.trim().length >= 5) {
    callBack();
  } else {
    callBack(new Error("用户昵称至少五位"));
  }
};
const validatorPassword = (rule: any, value: string, callBack: any) => {
  //用户名字|昵称,长度至少五位
  rule = null;
  if (value.trim().length >= 6) {
    callBack();
  } else {
    callBack(new Error("用户密码至少六位"));
  }
};
//表单校验的规则对象
const rules = {
  //用户名字
  username: [{ required: true, trigger: "blur", validator: validatorUsername }],
  //用户昵称
  name: [{ required: true, trigger: "blur", validator: validatorname }],
  //用户的密码
  password: [{ required: true, trigger: "blur", validator: validatorPassword }],
};

const getHasUser = async (pager = 1) => {
  //收集当前页码
  pageNo.value = pager;
  let result: UserResponseData = await reqUserInfo(
    pageNo.value,
    pageSize.value,
    keyword.value
  );
  if (result.code == 200) {
    total.value = result.data.total;
    userArr.value = result.data.records;
  }
};
const addUser = () => {
  //抽屉显示出来
  drawer.value = true;
  //清空数据
  Object.assign(userParams, {
    id: 0,
    username: "",
    name: "",
    password: "",
  });
  //清除上一次的错误的提示信息
  nextTick(() => {
    (formRef.value as { clearValidate: (arg: string) => void }).clearValidate(
      "username"
    );
    (formRef.value as { clearValidate: (arg: string) => void }).clearValidate(
      "name"
    );
    (formRef.value as { clearValidate: (arg: string) => void }).clearValidate(
      "password"
    );
  });
};

const setRole = async (row: User) => {
  //存储已有的用户信息
  Object.assign(userParams, row);
  //获取全部的职位的数据与当前用户已有的职位的数据
  let result: AllRoleResponseData = await reqAllRole(userParams.id as number);
  if (result.code == 200) {
    //存储全部的职位
    allRole.value = result.data.allRolesList;
    //存储当前用户已有的职位
    userRole.value = result.data.assignRoles;
    //抽屉显示出来
    drawer1.value = true;
  }
};
const cancel = () => {
  //关闭抽屉
  drawer.value = false;
};
const save = async () => {
  //点击保存按钮的时候,务必需要保证表单全部复合条件在去发请求
  await (formRef.value as { validate: () => boolean }).validate();
  //保存按钮:添加新的用户|更新已有的用户账号信息
  let result: any = await reqAddOrUpdateUser(userParams);
  //添加或者更新成功
  if (result.code == 200) {
    //关闭抽屉
    drawer.value = false;
    //提示消息
    ElMessage({
      type: "success",
      message: userParams.id ? "更新成功" : "添加成功",
    });
    //获取最新的全部账号的信息
    // getHasUser(userParams.id ? pageNo.value : 1);
    //浏览器自动刷新一次
    window.location.reload();
  } else {
    //关闭抽屉
    drawer.value = false;
    //提示消息
    ElMessage({
      type: "error",
      message: userParams.id ? "更新失败" : "添加失败",
    });
  }
};
const confirmClick = async () => {
  //收集参数
  let data: SetRoleData = {
    userId: userParams.id as number,
    roleIdList: userRole.value.map((item) => {
      return item.id as number;
    }),
  };
  //分配用户的职位
  let result: any = await reqSetUserRole(data);
  if (result.code == 200) {
    //提示信息
    ElMessage({ type: "success", message: "分配职务成功" });
    //关闭抽屉
    drawer1.value = false;
    //获取更新完毕用户的信息,更新完毕留在当前页
    getHasUser(pageNo.value);
  }
};
</script>

<style lang="scss" scoped>
.users {
  .form {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
