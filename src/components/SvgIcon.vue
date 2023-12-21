<template>
  <svg>
    <use
      :xlink:href="prefix + name"
      :fill="color"
    ></use>
  </svg>
</template>

<script setup lang="ts">
defineProps({
  //xlink:href属性值的前缀
  prefix: {
    type: String,
    default: "#icon-",
  },
  //svg矢量图的名字
  name: {
    type: String,
    required: true,
  },
  //svg图标的颜色
  color: {
    type: String,
    default: "",
  },
});
</script>
<style scoped lang="scss"></style>
