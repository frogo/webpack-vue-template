<template lang="html">
  <div class="home">
    <h2>这是主页</h2>
    <p>
      一些开发约定<router-link to="convention">
        请点击
      </router-link>
    </p>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { getDemo, postDemo } from '@/request/api'

export default {
  data () {
    return {
      configTitle: ''
    }
  },
  computed: {
    // 使用对象展开运算符将 state 混入到computed 对象中
    ...mapState([
      'user' // 映射 this.user 为 store.state.user
    ]),
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'getUserEmail', // 把 `this.getUserEmail` 映射为 `this.$store.getters.getUserEmail`
      'getUserInfo'
    ])
  },
  watch: {
    // 监听
  },
  mounted () {
    // 调用vuex actions中的异步服务更新vuex state的user信息
    this.syncGetUser()
    // 读取config.js 数据
    window.config && (this.configTitle = window.config.title)
    // getDemo请求调用
    getDemo({ mock_key: 'mock_value' }).then(res => {
      // eslint-disable-next-line no-console
      // console.log(res)
    })
    // postDemo请求调用
    postDemo({ mock_id: '101', mock_name: 'frogo' }).then(res => {
      // eslint-disable-next-line no-console
      // console.log(res)
    })
  },
  methods: {
    ...mapMutations([
      'updateUser'// 将 `this.updateUser()` 映射为 `this.$store.commit('updateUser')`
      // 'updateOther'
    ]),
    ...mapActions([
      'syncGetUser'// 将 `this.syncGetUser()` 映射为 `this.$store.dispatch('syncGetUser')`
      // 'syncGetOther'
    ])
  }
}
</script>

<style lang="scss">
.home{
  h2{ font-size: 18px;margin: 10px 0}
  p{
    font-size: 12px;
    line-height: 2em;
  }
  padding:20px;
}
</style>
