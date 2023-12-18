module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-recommended-vue/scss",
    "stylelint-config-rational-order",
  ],
  // plugins: ["stylelint-scss"],
  overrides: [
    // 扫描.vue/html文件中的<style>标签内的样式
    {
      files: ["**/*.{vue,html}"],
      customSyntax: "postcss-html",
    },
  ],
  rules: {
    // "declaration-empty-line-before":null
  },
};
