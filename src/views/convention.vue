<template lang="html">
  <div class="convention">
    <h2>约定</h2>
    <p>
      PS：约定不是为了限制和禁锢研发人员的开发思想，
      是为了降低前端之间协作开发的沟通成本，提高整体研发效率,
      只有当你提前完成工作任务，才有更多的时间去写你想写的代码。
    </p>
    <dl>
      <dt>关于注释和数据格式定义</dt>
      <dd>
        一定要写注释，注释分为几种：<br>
        1.业务方面的，试着换位思考一下，如果其他人来看你的代码是否看得懂<br>
        2.VUEX和VUE 的data中，一定把数据格式写出来，注释起来，比如：<br>
        vue的data你需要定义一个类型数组:<br>
        type: [] // 类型分为两种， inner代表内部，outer代表外部  type: ['inner', 'outer']<br>
        如果不写后面的注释，其他人可能无法看懂这个数据变量 <br>
        vuex中你需要定义用户信息:<br>
        userInfo:{<br>
        // 'name': 'xxx',<br>
        // 'age': '19',<br>
        // 'mobile': 'xxxxxxxxxxx'<br>
        }<br>
        把具体格式内容注释起来<br>
        3.前端开发阶段必须在mock.js写好接口数据，以至于别人接替开发可以很明显看到数据格式定义。
      </dd>
      <dt>API接口地址</dt>
      <dd>
        接口地址必须有上下文CONTEXT_PATH,url一定写在该文件中，不许写在其他文件，请参照src/request/config.js，<br>
        const CONTEXT_PATH = '/api/'<br>
        // 接口地址<br>
        COMMON: {<br>
        GET_DEMO: CONTEXT_PATH + 'get-demo',<br>
        POST_DEMO: CONTEXT_PATH + 'post-demo',<br>
        GET_USER: CONTEXT_PATH + 'user-info'<br>
        }
      </dd>
      <dt>svg图标使用</dt>
      <dd>
        需要UI提供标准规格的svg文件（画板512*512，图标448*448，图标和四个画板边缘距离32px）放入src/icons/svg/文件夹下即可,<br>
        示例：<img src="@/assets/image/svg-specs.jpg" width="200px">
        组件封装在src/components/_svgicons/下,<br>
        vue中通过&lt;svg-icon icon-class=&quot;home&quot; style=&quot;color:red&quot;&gt;&lt;/svg-icon&gt;调用，<br>
        icon-class的名字就是svg文件的名字 。
      </dd>
      <dd><svg-icon icon-class="home" style="color:red" /></dd>
      <dt>VUE文件拆分规则</dt>
      <dd>
        拿到高保真后，一个页面按规定只允许有一个vue文件，<br>
        避免出现根据高保真的结构内容直观上去随意拆分VUE文件，<br>
        所有的数据声明均在一个vue文件的data中，不得任意拆分组件，<br>
        这样是为了避免父子和子父之间VUE组件传值的开发和维护成本，<br>
        如果该页面逻辑处理JS代码和CSS代码较多，<br>
        请将JS和CSS单独放在.js和.css/.scss文件中，<br>
        除非页面中包含可供全站复用的模块，才可将其拆分为单独的component VUE文件<br>
        如果一个页面结构实在多样和复杂，必须拆分，请尽量保证<br>
        各个拆分的组件为兄弟关系，并使用VUEX传值，避免过多的嵌套导致使用props传值难以维护<br>
      </dd>
      <dt>配置文件</dt>
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
      <dt>非侵入式 mock 解决方案</dt>
      <dd>
        webpack中已经对mock.js做了开发环境和生产环境的是否加载判断，<br>
        前端mock数据写在根目录下的mock.js，使用方法参照mock.js的示例，<br>
        更多方法请参考<a href="http://www.mockjs.com" target="_blank">www.mockjs.com</a>
      </dd>
      <dt>axios的http方案</dt>
      <dd>
        在src/request文件夹下的http.js，对axios做了轻量的封装，<br>
        主要是开发常用的方法接口，例如header参数设置,拦截器，get和post方法，<br>
        api.js是接口调用方法集合，config.js是接口地址管理，<br>
        当然如果你想使用axios原生的，也是可以的，<br>
        在main.js把axios挂在了vue的protype上,Vue.prototype.$axios = axios，<br>
        可以直接用this.$axios获取实例
      </dd>
      <dt>CSS样式</dt>
      <dd>
        不推荐用scoped，推荐 页面-子选择器 写法，<br>
        比如主页，给最顶层加上class="home"，<br>
        主页内的菜单class是menu,我们可以使用 .home .menu{} 或者嵌套写法.home{ .menu{}},<br>
        只要保证所有页面的class名是不一样的,<br>
        至于你不管是使用css,还是sass,还是stylus，<br>
        只要遵循我们的约定,就能最大限度的规避CSS冲突的问题<br>
      </dd>
      <dt>vuex的使用</dt>
      <dd>
        推荐使用vuex而不是bus中央总线，<br>
        对于vuex中state的设计，我们推荐范式数据,大概就是扁平化数据，以对象形式，id作为key，具体可以百度,<br>
        对于业务数据的接口获取，推荐放在vuex的actions中,<br>
        对于数据的二次组装和处理，推荐放在vuex的getter中，<br>
        vue文件中尽量是一些与数据无关的事件和UI交互逻辑操作,<br>
        建议阅读https://vuex.vuejs.org/zh/installation.html学习vuex，<br>
        你可以在代码中查看使用示例。
      </dd>
      <dt>utility</dt>
      <dd>有一些公共的方法函数，建议放在utility文件夹下。</dd>
    </dl>

    <dl>
      <dt>1.使用nrm 管理npm 源 不推荐cnpm</dt>
      <dd>
        使用cnpm会带来一些未知的问题<br>
        npm i -g nrm<br>
        使用淘宝镜像nrm use taobao<br>
      </dd>
      <dt>2.使用公司仓库 http://172.31.46.32:8081/repository/npm-all/</dt>
      <dd>
        如果你已经装了nrm 使用nrm add iflytek http://172.31.46.32:8081/repository/npm-all/ <br>
        或者没装nrm 使用 npm config set registry http://172.31.46.32:8081/repository/npm-all/<br>
        有的时候使用公司的源可能会加快构建速度，特别是基于jenkins和CI平台的自动化部署
      </dd>
      <dt>3.使用commit lint husky 规范</dt>
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
      <dt>11.使用standard-version进行版本管理</dt>
      <dd>
        1. npm run release -- -- release-as 1.3.2-R-xinjiang<br>

        2. git log 查看tag版本是否打成功<br>
        <p style="background:rgb(215, 203, 203);color:#000;padding:5px;border-radius:3px">
          commit 30b9c4d468d4602158cc6011dc7635dbf7c20f6c (HEAD -> vue-template, <span style="color: red">tag: v1.3.2-R-xinjiang</span>)<br>
          Author: frogo 66118181@qq.com <br>
          Date:   Thu Apr 9 00:16:58 2020 +0800<br>
          chore(release): 1.3.2-R-xinjiang<br>
        </p>
        3.如果错误要撤回使用 git reset --soft HEAD^ 如果正确，使用下面命令推送<br>
        git push --follow-tags origin master/ 或者分支名<br>
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
