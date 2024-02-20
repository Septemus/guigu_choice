<template>
  <div>
    <el-card class="box-card">
      <!-- 卡片顶部添加品牌按钮 -->
      <el-button
        v-has="`btn.Trademark.add`"
        type="primary"
        size="default"
        icon="Plus"
      >
        添加品牌
      </el-button>
      <!-- 表格组件：用于展示已有得平台数据 -->
      <!-- table:---border:可以设置表格纵向是否有边框
                table-column:---label:某一个列表 ---width:设置这列宽度 ---align:设置这一列对齐方式    
            -->
      <el-table
        style="margin: 10px 0px"
        border
        :data="trademarkArr"
      >
        <el-table-column
          label="序号"
          width="80px"
          align="center"
          type="index"
        ></el-table-column>
        <!-- table-column:默认展示数据用div -->
        <el-table-column
          label="品牌名称"
          prop="tmName"
        ></el-table-column>
        <el-table-column label="品牌LOGO">
          <template #default="{ row }">
            <img
              :src="row.logoUrl"
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
            ></el-button>
            <el-popconfirm
              :title="`您确定要删除${row.tmName}?`"
              width="250px"
              icon="Delete"
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
      <!-- 分页器组件
                pagination
                   v-model:current-page:设置分页器当前页码
                   v-model:page-size:设置每一个展示数据条数
                   page-sizes:用于设置下拉菜单数据
                   background:设置分页器按钮的背景颜色
                   layout:可以设置分页器六个子组件布局调整
            -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="limit"
        :total="total"
        :pager-count="9"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout="prev, pager, next, jumper,->,sizes,total"
        @size-change="getHasTrademark"
        @current-change="getHasTrademark"
      />
    </el-card>
    <!-- 对话框组件:在添加品牌与修改已有品牌的业务时候使用结构 -->
    <!-- 
            v-model:属性用户控制对话框的显示与隐藏的 true显示 false隐藏
             title:设置对话框左上角标题
        -->
    <el-dialog>
      <el-form
        ref="formRef"
        style="width: 80%"
      >
        <el-form-item
          label="品牌名称"
          label-width="100px"
          prop="tmName"
        >
          <el-input placeholder="请您输入品牌名称"></el-input>
        </el-form-item>
        <el-form-item
          label="品牌LOGO"
          label-width="100px"
          prop="logoUrl"
        >
          <!-- upload组件属性:action图片上传路径书写/api,代理服务器不发送这次post请求  -->
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
          >
            <img class="avatar" />
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- 具名插槽:footer -->
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
        >
          确定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";

import { Records, TradeMarkResponseData } from "@/api/product/brand/type.ts";

import { reqHasTrademark } from "@/api/product/brand";
//当前页码
let pageNo = ref<number>(1);
//每一页展示多少条数据
let limit = ref<number>(3);
//存储已有品牌数据总数
let total = ref<number>(0);
//存储已有品牌的数据
let trademarkArr = ref<Records>([]);

const getHasTrademark = async (pager = 1) => {
  //当前页码
  pageNo.value = pager;
  let result: TradeMarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value
  );
  if (result.code == 200) {
    //存储已有品牌总个数
    total.value = result.data.total;
    trademarkArr.value = result.data.records;
  }
};
//组件挂载完毕钩子---发一次请求,获取第一页、一页三个已有品牌数据
onMounted(() => {
  getHasTrademark();
});
</script>
<style lang="scss" scoped></style>
