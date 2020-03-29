// 关键注意点：
// Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。
// 就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，
// 且只有当它的依赖值发生了改变才会被重新计算。
// getter 可以返回一个属性和一个方法（传参）,方法调用时候不会
export default {
  // 示例：返回一个属性，我们通过getter获取用户的email,当state.user用户信息的email被改变，getUserEmail返回的值也会被更新
  getUserEmail: (state, getters) => {
    return state.user.email
  },
  // 示例：返回一个方法，我们通过传入的参数获取该参数对应的值，结果不会被缓存，调用的时候取最新的值。
  getUserInfo: (state, getters) => {
    return function (p) {
      let info = state.user[p]
      return info
    }
  }
}
