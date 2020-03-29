// 关键注意点：
// Action 提交的是 mutation，而不是直接变更state状态。
// Action 可以包含任意异步操作。
import { getUser } from '@/request/api'
export default {
  // 示例：通过getUser接口请求获取用户信息，并提交mutation
  syncGetUser (context, params) {
    getUser().then(res => {
      // state.user = res.data.data // 错误，不能直接变更state
      context.commit('updateUser', res.data)
    })
  }
}
