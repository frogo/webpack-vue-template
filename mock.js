const Mock = require('mockjs')
// 该方法用于拦截带参数的地址
let getRegExpUrl = (url) => {
  return RegExp(url + '.*')
}

// 获取 mock.Random 对象
// const Random = Mock.Random
//       nickname: Random.cname(),
//       name: Random.cname(),
//       city: Random.city(),
//       email: Random.email(),
//       address: Random.region()

/* 使用template,无法获取options: { url: '',type: '', params: ''},但可以使用字符串模板随机数据 */
Mock.mock(getRegExpUrl('/api/get-demo'), 'get', { 'mocktest|4-6': [
  {
    'name': '@cname', // 中文名称
    'id|+1': 88, // 属性值自动加 1，初始值为88
    'age|18-28': 0, // 18至28以内随机整数, 0只是用来确定类型
    'birthday': '@date("yyyy-MM-dd")', // 日期
    'city': '@city(true)', // 中国城市
    'color': '@color', // 16进制颜色
    'isMale|1': true, // 布尔值
    'isFat|1-2': true, // true的概率是1/3
    'brother|1': ['jack', 'jim'], // 随机选取 1 个元素
    'sister|+1': ['jack', 'jim', 'lily'], // array中顺序选取元素作为结果
    'friends|2': ['jack', 'jim'] // 重复2次属性值生成一个新数组
  }
]
})

/* 使用options,可以获取options: { url: '',type: '', params: ''}  */
Mock.mock(getRegExpUrl('/api/post-demo'), 'post', function (options) {
  // eslint-disable-next-line no-console
  // console.log(options) // 可根据post的不同入参返回你想定义的数据，同时模板随机数据功能无效
  return {
    'name': '@cname', // 中文名称
    'id|+1': 88, // 属性值自动加 1，初始值为88
    'age|18-28': 0, // 18至28以内随机整数, 0只是用来确定类型
    'birthday': '@date("yyyy-MM-dd")', // 日期
    'city': '@city(true)', // 中国城市
    'color': '@color', // 16进制颜色
    'isMale|1': true, // 布尔值
    'isFat|1-2': true, // true的概率是1/3
    'brother|1': ['jack', 'jim'], // 随机选取 1 个元素
    'sister|+1': ['jack', 'jim', 'lily'], // array中顺序选取元素作为结果
    'friends|2': ['jack', 'jim'] // 重复2次属性值生成一个新数组
  }
})

Mock.mock(getRegExpUrl('/api/user-info'), 'get', {
  'code': '1',
  'msg': '成功',
  'data': {
    'name': 'frogo',
    'sex': 'male',
    'age': '101',
    'email': '66118181@qq.com'
  }
})
