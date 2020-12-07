
<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  -moz-user-select:none;		/* 火狐 */
	-webkit-user-select:none;	/* 谷歌 */
	-ms-user-select:none;		/* IE */
	user-select:none;
  .main {
    width: 100%;
    height: 100%;
    border: 1px solid #4295D5;
    overflow: hidden;
    position: relative;
    background-color: #fff;
    .table {
      cursor: move;
    }
    /* 盒子css */
    .floating{
        background: rgba(0, 0, 0, 0.7);
        width: 160px;
        // height: 100px;
        position: absolute;
        color: #fff;
        // padding-top: 15px;
        border-radius: 15px;
        padding-left: 15px;
        box-sizing: border-box;
        left:0;
        top: 0;
        transition: all 0.3s;
        z-index: 999;
        text-align: left;
        font-size: 12px;
    }
  }
}
</style>

<style type="text/css">
.org-tree-node-label-inner {
  color: #fff;
  background-color: #4295D5;
}
.handle{
  display: none !important;
}

</style>

<template>
  <div class="home">
      <div class="main" ref="main">
        <vue-draggable-resizable
            :w="width"
            :h="height"
            :x="x"
            :y="y"
            :min-width="50"
            :min-height="50"
            :parent="false"
            :grid="[10,10]"
            class-name="dragging1"
            @dragging="onDrag"
            @resizing="onResize"
        >
            <div class="table" ref="table" @wheel.prevent="handleTableWheel($event)">
                <vue2-org-tree
                :data="data"
                :horizontal="true"
                name="test"
                collapsable
                @on-expand="onExpand"
                @on-node-click="NodeClick"
                @on-node-mouseover="onMouseover"
                @on-node-mouseout="onMouseout"
                >
                  <template>
                    
                  </template>
                </vue2-org-tree>
            </div>
        </vue-draggable-resizable>
        <!-- 创建浮窗盒子 -->
        <div v-show="BasicSwich" class="floating">
            <!-- <p>ID:{{BasicInfo.id}}</p> -->
            <p>Name:{{BasicInfo.label}}</p>
        </div>
      </div>
  </div>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

export default {
  data() {
    return {
      BasicSwich:false,
      BasicInfo:{id:null,label:null},
      data: {
        id: 0,
        label: "XXX科技有限公司sadasdasdasdasdas",
        name: '李宏达',
        target: '目标1',
        value: '70%',
        children: [
          {
            id: 2,
            label: "产品研发部",
            swtich: "myred",
            children: [
              {
                id: 5,
                label: "研发-前端"
              },
              {
                id: 6,
                label: "研发-后端"
              },
              {
                id: 9,
                label: "UI设计"
              },
              {
                id: 10,
                label: "产品经理"
              }
            ]
          },
          {
            id: 3,
            label: "销售部",
            children: [
              {
                id: 7,
                label: "销售一部"
              },
              {
                id: 8,
                label: "销售二部"
              }
            ]
          },
          {
            id: 4,
            label: "财务部"
          },
          {
            id: 9,
            label: "HR人事"
          }
        ]
      },
      x: 0,
      y: 0,
      width: 2000,
      height: 2000
    }
  },
  created() {
      
  },
  mounted() {

  },
  methods: {
    onResize: function(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    },
    onDrag: function(x, y) {
      this.x = x;
      this.y = y;
    },
    handleTableWheel(event) {
        let obj = this.$refs.table;
        return this.tableZoom(obj, event);
    },
    tableZoom(obj, event) {
        // 一开始默认是100%
        let zoom = parseInt(obj.style.zoom, 10) || 100;
        // 滚轮滚一下wheelDelta的值增加或减少120
        zoom += event.wheelDelta / 12;
        if (zoom > 0) {
            obj.style.zoom = zoom + "%";
        }
        return false;
    },
    // 方法
    onMouseout(e, data) {
        this.BasicSwich = false
    },
    onMouseover(e, data) {
        this.BasicInfo = data;
        this.BasicSwich = true;
        var floating =  document.getElementsByClassName('floating')[0];
        floating.style.left = e.clientX +'px';
        floating.style.top = e.clientY+'px';
    },
    NodeClick(e,data){
        console.log(e)
        // e 为 event
        console.log(data)
        // 当前项的所有详情 如：id label children
    },
    collapse(list) {
        var _this = this;
        list.forEach(function(child) {
            if (child.expand) {
              child.expand = false;
            }
            child.children && _this.collapse(child.children);
        });
    },
    onExpand(e,data) {
        if ("expand" in data) {
          data.expand = !data.expand;
            if (!data.expand && data.children) {
                this.collapse(data.children);
            }
        } else {
            this.$set(data, "expand", true);
        }
    }
  },
  components: {
    VueDraggableResizable
  }
}
</script>

