// 关键注意点：
// https://cn.vuejs.org/v2/guide/reactivity.html#检测变化的注意事项
// 最好提前在你的 store state 中初始化好所有所需属性。
// 当需要在对象上添加新属性时，你应该
// 使用 Vue.set(obj, 'newProp', 123), 或者
// 以新对象替换老对象。例如，利用对象展开运算符我们可以这样写
// state.obj = { ...state.obj, newProp: 123 } 或者
// 使用Object.assign)
// state.obj = Object.assign({}, state.obj, { name: 1, age: 2 })
export default {
  // 示例：通过actions中获取用户信息的http接口拿到用户信息在这里对state.user进行更新
  updateUser (state, payload) {
    state.user = { ...state.user, ...payload }
  }
}
