/*
 * @Descripttion: 
 * @Author: Liu SaiSai
 * @Date: 2023-04-06 22:08:45
 * @LastEditors: Liu SaiSai
 */
module.exports = {
  // 以当前版本为基础转换
  presets: [["@babel/preset-env", {targets: {node: "current"}}],
  "@babel/preset-typescript"
]
}
