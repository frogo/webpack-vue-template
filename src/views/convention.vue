<template lang="html">
  <div class="convention">
    <h2>约定</h2>
    <p>
      PS：约定不是为了限制和禁锢研发人员的开发思想，
      是为了降低前端之间协作开发的沟通成本，提高整体研发效率,
      只有当你提前完成工作任务，才有更多的时间去写你想写的代码。
    </p>
    <dl>
      <dt>1.svg图标使用</dt>
      <dd>
        需要UI提供标准规格的svg文件（画板512*512，图标448*448，图标和四个画板边缘距离32px）放入src/icons/svg/文件夹下即可,<br>
        示例：<img src="@/assets/image/svg-specs.jpg" width="200px">
        组件封装在src/components/_svgicons/下,<br>
        vue中通过&lt;svg-icon icon-class=&quot;home&quot; style=&quot;color:red&quot;&gt;&lt;/svg-icon&gt;调用，<br>
        icon-class的名字就是svg文件的名字 。
      </dd>
      <dd><svg-icon icon-class="home" style="color:red" /></dd>

    <dt>2.配置文件</dt>
    <dd>
      配置文件是不会被webpack编译的文件，<br>
      方便产品，运维等前场人员修改一些例如ip地址，标题等频繁变动的信息。<br>
      你有两种选择方案:config.js和config.json,<br>
      config.js在public文件夹下的index.html用script标签引入，<br>
      通过window.config.xxx获取配置变量:<br>
      window.config = {
      'title': '标题'
      }<br>
      config.json可以在项目中通过http方式读取，<br>
      用哪种方式取决于具体业务场景
    </dd>
    <dt>3.非侵入式 mock 解决方案</dt>
    <dd>
      webpack中已经对mock.js做了开发环境和生产环境的是否加载判断，<br>
      前端mock数据写在根目录下的mock.js，使用方法参照mock.js的示例，<br>
      更多方法请参考<a href="http://www.mockjs.com" target="_blank">www.mockjs.com</a>
    </dd>
    <dt>4.axios的http方案</dt>
    <dd>
      在src/request文件夹下的http.js，对axios做了轻量的封装，<br>
      主要是开发常用的方法接口，例如header参数设置,拦截器，get和post方法，<br>
      api.js是接口调用方法集合，config.js是接口地址管理，<br>
      当然如果你想使用axios原生的，也是可以的，<br>
      在main.js把axios挂在了vue的protype上,Vue.prototype.$axios = axios，<br>
      可以直接用this.$axios获取实例
    </dd>
    <dt>5.CSS样式</dt>
    <dd>
      不推荐用scoped，推荐 页面-子选择器 写法，<br>
      比如主页，给最顶层加上class="home"，<br>
      主页内的菜单class是menu,我们可以使用 .home .menu{} 或者嵌套写法.home{ .menu{}},<br>
      只要保证所有页面的class名是不一样的,<br>
      至于你不管是使用css,还是sass,还是stylus，<br>
      只要遵循我们的约定,就能最大限度的规避CSS冲突的问题<br>
    </dd>
    <dt>6.vuex的使用</dt>
    <dd>
      推荐使用vuex而不是bus中央总线，<br>
      对于vuex中state的设计，我们推荐范式数据,大概就是扁平化数据，以对象形式，id作为key，具体可以百度,<br>
      对于业务数据的接口获取，推荐放在vuex的actions中,<br>
      对于数据的二次组装和处理，推荐放在vuex的getter中，<br>
      vue文件中尽量是一些与数据无关的事件和UI交互逻辑操作,<br>
      建议阅读https://vuex.vuejs.org/zh/installation.html学习vuex，<br>
      你可以在代码中查看使用示例。
    </dd>
    <dt>7.utility</dt>
    <dd>有一些公共的方法函数，建议放在utility文件夹下。</dd>
    </dl>

    <dl>
      <dt>8.使用nrm 管理npm 源 不推荐cnpm</dt>
      <dd>
        使用cnpm会带来一些未知的问题<br>
         npm i -g nrm<br>
         使用淘宝镜像nrm use taobao<br>
      </dd>
      <dt>9.使用commit lint husky 规范</dt>
      <dd>
        commit 提交格式：
        &lt;type&gt;:  &lt;subject&gt; (注意冒号后面有空格)，否则你无法提交到gitlab<br>
        type有如下项:<br>
        feat：新功能（feature）<br>
        fix：修补bug<br>
        docs：文档（documentation）<br>
        style： 格式（不影响代码运行的变动）<br>
        refactor：重构（即不是新增功能，也不是修改bug的代码变动）<br>
        test：增加测试<br>
        chore：构建过程或辅助工具的变动<br>
        upgrade： 第三方库升级<br>
        revert：回滚<br>
        subject是描述：<br>
        subject是 commit 目的的简短描述<br>
        例子：git commit -m"fix: 修改菜单BUG"
      </dd>
    </dl>
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
.convention{
  h2{ font-size: 18px;margin: 10px 0}
  p{font-size: 12px;color:red}
  dl{
    dt{line-height: 2em;font-size: 14px;font-weight: bold}
    p,dd{
      font-size: 12px;
      line-height: 2em;
    }
  }

  padding:20px;
}
</style>
