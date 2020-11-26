<template>
  <div class="navigationBarLeft">
    <!-- <div class="logo"></div> -->
    <el-menu
      ref='menu'
      :default-active="$route.path"
      :router="true"
      class="el-menu-vertical-demo"
      background-color="#001529"
      text-color="#fff"
      active-text-color="#28CFCA"
      @select="handleSelectLeft">
      <el-submenu v-for="(item,key) in menuLeftArr" :key="key" :index="String(key)">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.name}}</span>
        </template>
        <el-menu-item v-for="(list,index) in item.team" :key="index" :index="list.path" :indexpath="list.path">{{list.name}}
          <!-- <router-link :to="list.path" style="display: inline-block;width:100%;height:100%">{{list.name}}</router-link> -->
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'navigationBarLeft',
  data () {
    return {
      menuLeftArr: [
        {name: '用户中心', icon: 'el-icon-s-platform', team:[{name:'用户管理',path:'/'},{name:'实名认证管理',path:'/userInfo/shimingRen'},{name:'企业认证管理',path:'/userInfo/qiyeRen'}]},
        {name: '任务中心', icon: 'el-icon-s-shop', team:[{name:'企业任务管理',path:'/renwu/renwuMessage'},{name:'平台发包管理',path:'/renwu/fabaoMessage'},{name:'投递人员信息',path:'/renwu/renyuanMessage'}]},
        {name: '合同中心', icon: 'el-icon-s-management', team:[{name:'签约管理',path:'/contract/signing'}]},
        // {name: '交易中心', icon: 'el-icon-s-management', team:[{name:'工单管理',path:'/trading/repairOrder'},{name:'交易管理',path:'/trading/trading'}]}
      ],
    }
  },
  watch: {
    $route() {
      let i = this.$route.path;
      console.log(i,'路由')
      setTimeout(() => { //路由跳转
        this.$refs.menu.activeIndex = i
      }, 100)
    }
  },
  props:{
    // menuLeftArr:Array,
    activeIndex: String
  },
  created() {
    // console.log(this.activeIndex)
  },
  methods: {
    handleSelectLeft(key, keyPath) {
      console.log(key, keyPath)
      // sessionStorage.setItem('activeIndex',key)
      // let arr = key.split("-")
      // let i = arr[0]
      // let k = arr[1]
      // console.log(this.menuLeftArr[i].team[k].path)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.navigationBarLeft {
  float: left;
  width:182px;
  height: calc(100% - 58px);
  background: #001529;
  overflow-y: scroll; 
  white-space: nowrap;
  a{text-decoration:none; out-line: none; color: #333333}
  .logo {
    width: 100%;
    height: 153px;
    background-color: #D8D8D8;
  }
  
}
.navigationBarLeft::-webkit-scrollbar {
    width: 0 !important;
}
</style>

<style>
.navigationBarLeft .el-submenu .el-menu-item {
    box-sizing: border-box;
    min-width: 100%;
    font-size: 12px;
}
.navigationBarLeft .el-menu {
    border-right: none;
}
.navigationBarLeft .el-menu-item.is-active a {
  color: #409EFF;
}
.navigationBarLeft .el-submenu__title {
  text-align: left;
}
</style>