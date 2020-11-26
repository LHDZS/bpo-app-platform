<template>
  <div id="app" v-if="navigationBarType">
    <navigationBar></navigationBar>
    <navigationBarLeft v-if="navigationBarLeftType" :activeIndex="activeIndex"></navigationBarLeft>
    <div :class="navigationBarLeftType ? 'main' : 'appMain'">
      <router-view/>
    </div>
  </div>
  <div id="appNo" v-else>
    <router-view/>
  </div>
</template>

<script>
import navigationBar from '@/components/navigationBar'
import navigationBarLeft from '@/components/navigationBarLeft'

export default {
  name: 'App',
  data () {
    return {
      activeIndex: '/userInfo/usermessage',
      navWhiteList:['Login'],
      navigationBarType: true,
      navigationBarLeftType: true
    }
  },
  watch: {
    $route(to, from) {
      if (from.name == "Login") {
        console.log(from) 
      }
    if (this.navWhiteList.indexOf(to.name) >= 0) {
        this.navigationBarType = false;
      } else {
        this.navigationBarType = true;
      }
    },
  },
  mounted() {
    this.activeIndex = sessionStorage.getItem("activeIndex") || "0-0";
  },
    created() {
    // console.log(this.$route.path)
    if (this.navWhiteList.indexOf(this.$router.history.current.name) >= 0) {
      this.navigationBarType = false;
    } else {
      this.navigationBarType = true;
    }
  },
  methods: {

  },
  components: {
    navigationBar: navigationBar,
    navigationBarLeft: navigationBarLeft
  }
}
</script>

<style lang="less" scoped>
#app {
  width: 100%;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .main {
    float: left;
    width: calc(100% - 182px);
    height: calc(100% - 58px);
    // background:rgba(121, 184, 255, 0.3);
    background-color: #f2f2f2;
    padding: 10px;
    box-sizing: border-box;
    overflow-y: auto;
  }
  .appMain {
    width: 100%;
    height: calc(100% - 58px);
    // background:rgba(121, 184, 255, 0.3);
    // overflow-y: auto;
  }
}
#appNo {
  width: 100%;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<style>
.el-table th {
  background-color: rgba(242, 240, 240, 100);
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 104px;
  height: 104px;
  line-height: 104px !important;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
