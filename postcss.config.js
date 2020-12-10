// PostCSS配置 基于node.js

module.exports = {
  // 配置要使用的插件
  plugins: {
    //   自动添加浏览器厂商声明前缀，兼容不同浏览器
    // vue cli默认配置了
    // autoprefixer: {
    //   // 用来配置要兼容的浏览器版本
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    'postcss-pxtorem': {
      //  vant是基于375逻辑像素设计的
      rootValue: 37.5,
      //  配置需要转换成rem的属性
      propList: ['*']
    }
  }
}
