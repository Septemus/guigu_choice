//小仓库:layout组件相关配置仓库
import { defineStore } from "pinia";
import { reactive, nextTick } from "vue";
const useLayOutSettingStore = defineStore("SettingStore", {
  state: () => {
    return reactive({
      fold: false, //用户控制菜单折叠还是收起控制
      refsh: false, //仓库这个属性用于控制刷新效果
    });
  },
  actions: {
    refresh() {
      console.log(`clicked refresh!@@`);
      this.refsh = true;
      nextTick(() => {
        this.refsh = false;
      });
    },
  },
});

export default useLayOutSettingStore;
