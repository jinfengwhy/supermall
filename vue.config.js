module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // 脚手架3默认已经配置了'src'的别名
        // '@': 'src',
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}

