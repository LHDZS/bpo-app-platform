<template>
  <div class="navigationBar">
    <div class="title">薪必果</div>
    <div class="menu">
      <!-- <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item v-for="(item,key) in menuArr" :key="key" :index="item.path">{{item.name}}</el-menu-item>
      </el-menu> -->
    </div>
    <div class="my">
      <el-dropdown @command="menuTrigger">
        <span class="el-dropdown-link">
          <i class="el-icon-user el-icon--right"></i>&nbsp;&nbsp;{{loginPhone}}
        </span>
        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item command="a">个人中心</el-dropdown-item> -->
          <el-dropdown-item command="/login">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>

export default {
  name: 'navigationBar',
  data () {
    return {
      activeIndex: '/userInfo/usermessage',
      loginPhone: '',
      menuArr: [
        {
          name: '首页',
          path: '/',
          submenu:[]
          
        },{
          name: '商户中心',
          path: '/merchants',
          submenu: [
            {name: '客户管理', team:[{name:'商户信息',path:'/merchants/businessInformation'},{name:'签约信息',path:'/merchants/contractInformation'},{name:'地址信息',path:'/merchants/addressInformation'},{name:'抬头信息',path:'/merchants/lookUpInformation'}]}
          ]
        },{
          name: '业务中心',
          path: '/trading',
          submenu: [
            {name: '订单管理', team:[{name:'订单信息',path:'/trading/orderInformation'}]},
            {name: '个体户管理', team:[{name:'用户信息',path:'/trading/userInformation'},{name:'用户签约',path:'/trading/usersSignUp'}]},
            {name: '发票管理', team:[{name:'发票申请',path:'/trading/invoiceApplyFor'},{name:'发票管理',path:'/trading/invoiceManagement'}]}
          ]
        },{
          name: '财务中心',
          path: '/financial',
          submenu: [
            {name: '资金管理', team:[{name:'资金账户',path:'/financial/capitalAccount'},{name:'充值申请',path:'/financial/topUpApplication'},{name:'资金交易',path:'/financial/cashTransactions'},{name:'资金流水',path:'/financial/capitalFlows'}]},
          ]
        },{
          name: '数据中心',
          path: '/information',
          submenu: [
            {name: '暂无', team:[{name:'暂无',path:''}]}
          ]
        },{
          name: '系统中心',
          path: '/system',
          submenu: [
            {name: '信息维护', team:[{name:'注册地信息',path:'/system/registered'},{name:'经营范围信息',path:'/system/businessScope'},{name:'交付商信息',path:'/system/delivery'},{name:'发票内容信息',path:'/system/invoiceContent'}]}
          ]
        }
      ]
    }
  },
   computed: {
  // 我们使用计算属性来获取到当前点击的菜单的路由路径，然后设置default-active中的值
  // 使得菜单在载入时就能对应高亮
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      // 可以在路由配置文件中设置自定义的路由路径到meta.activeMenu属性中，来控制菜单自定义高亮显示
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  },
  props:{
    // menuArr:Array
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key,keyPath, '菜单点击事件')
      for (let i = 0; i < this.menuArr.length; i++) {
        if (key == this.menuArr[i].path) {
          this.$emit('handleSelect',key,this.menuArr[i].submenu)
        }
      }
    },
    menuTrigger(command) {
      // console.log('?????????',command)
      if (command == '/login') {
        this.$cookies.remove('esignplatformsid');
        this.$router.push({path: '/login'})
      }
    }
  },
  mounted() {

  },
  created() {
    this.loginPhone = sessionStorage.getItem('loginPhone') || '';
    this.activeIndex = '/' + this.$router.history.current.path.split('/')[1]
    for (let i = 0; i < this.menuArr.length; i++) {
      if (this.activeIndex == this.menuArr[i].path) {
        this.$emit('handleSelect','',this.menuArr[i].submenu)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.navigationBar {
  width: 100%;
  height:58px;
  background-color: #fff;
  .title {
    float: left;
    width:182px;
    height:100%;
    line-height: 58px;
    text-align: center;
    background:#002140;
    font-size:18px;
    font-family:PingFangSC;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  .menu {
    float: left;
    height: 100%;
    padding-left: 50px;
  }
  .my {
    float: right;
    height: 100%;
    line-height: 58px;
    margin-right: 50px;
    font-size:14px;
    font-family:PingFangSC;
    font-weight:400;
    color:rgba(51,51,51,1);
  }
}
</style>

<style>
.navigationBar .el-menu--horizontal>.el-menu-item {
  width: 130px;
  height: 58px;
  line-height: 58px;
}
.navigationBar .el-menu.el-menu--horizontal {
  border-bottom: none;
}
</style>
