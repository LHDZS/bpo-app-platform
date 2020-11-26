<style lang="less" scoped>
.usermessage {
  width: 100%;
  min-height: 100%;
  padding: 12px;
  box-sizing: border-box;
  background-color: #fff;
  .main_button {
    margin-left: 36px;
  }
  .wrap {
    width: 100%;
    margin-top: 22px;
    padding: 0px 30px;
    box-sizing: border-box;
  }
  .block {
    width: 100%;
    margin-top: -26px;
    .main {
      width: 100%;
      padding: 13px;
      box-sizing: border-box;
      font-size: 14px;
      color: #101010;
      text-align: left;
      .grid-content {
        width: 100%;
        margin-bottom: 20px;
        display: inline-block;
      }
      .grid-left {
        float: left;
        margin-bottom: 20px;
      }
      .grid-img {
          float: left;
          width: 160px;
          height: 97px;
          margin-right: 22px;
          margin-bottom: 10px;
      }
      .wrap {
        width: 100%;
        margin-top: 22px;
        box-sizing: border-box;
      }
      .footer {
        margin-top: 60px;
      }
    }
  }
}
</style>
<style>
</style>


<template>
  <div class="usermessage">
    <el-row>
      <el-form ref="releaseForm" :model="releaseForm" label-width="120px">
        <el-col :span="8">
          <el-form-item label="姓名：">
            <el-input
              v-model="releaseForm.userName"
              size="small"
              placeholder="请输入姓名"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码：">
            <el-input
              v-model="releaseForm.mobile"
              size="small"
              placeholder="请输入手机号码"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="企业名称：">
            <el-input
              v-model="releaseForm.companyName"
              size="small"
              placeholder="请输入企业名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="认证状态：">
            <el-select
              v-model="releaseForm.personAuthResult"
              style="width: 100%"
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="8">
          <el-form-item label="账户状态：">
            <el-select
              v-model="releaseForm.auditStatus"
              style="width: 100%"
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in zhangoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col> -->

        <el-col :span="8">
          <el-form-item label=" " style="text-align: left">
            <el-button type="primary" size="small" @click="search()">搜索</el-button>
            <el-button size="small" @click="reset()">重置</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <div class="wrap">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="id" label="ID" >
        </el-table-column>
        <el-table-column prop="userName" label="姓名" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="mobile" label="手机号码" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="idNo" label="身份证号" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="companyDTO.companyName" label="企业名称" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="companyDTO.creditCode" label="企业信用代码" :show-overflow-tooltip="true">
        </el-table-column>
          <el-table-column
            prop="personAuthResult"
            label="状态"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <div>
                 <span>{{ scope.row.personAuthResult | authresult }}</span>
              </div>
            </template>
          </el-table-column>
        <!-- <el-table-column prop="staus" label="账户状态" :show-overflow-tooltip="true"> 
             <template slot-scope="scope">
              <div><el-switch
                v-model="scope.row.auditStatus"
                :active-value="1"
                :inactive-value="0"
                @change="changeEnabled(scope.row)"
              ></el-switch></div>
            
            </template>
        </el-table-column> -->
        <el-table-column prop="registerTime" label="注册时间" :show-overflow-tooltip="true"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="checkDetailds(scope.row)"
              >详情</el-button
            >
            <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">二维码</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="wrap">
      <pagination
        :total="total"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      ></pagination>
    </div>
    <!-- 查看详情 -->
    <el-dialog
      :visible.sync="dialogDetails"
      width="1080px"
      :before-close="handleClose"
      title="查看详情"
    >
      <div class="block">
        <div class="main">
          <el-row>
            <el-col :span="24"><h4>个人认证信息</h4></el-col>
            <el-col :span="10"
              ><span class="grid-content bg-purple">姓名：{{invoiceObj.userName}}</span></el-col
            >
            <el-col :span="10"
              ><span class="grid-content bg-purple"
                >身份证：{{invoiceObj.idNo}}</span
              ></el-col
            >
            <el-col :span="10"
              ><span class="grid-content bg-purple"
                >银行卡号：{{invoiceObj.bankNo}}</span
              ></el-col
            >
            <el-col :span="10"
              ><span class="grid-content bg-purple"
                >手机号：{{invoiceObj.mobile}}</span
              ></el-col
            >
            <el-col :span="24"
              ><span class="grid-left">身份证正反面：</span
              ><img class="grid-img" :src="invoiceObj.idNoFront" alt=""    @click="detailsImage(invoiceObj.idNoFront)" /><img
                class="grid-img"
                :src="invoiceObj.idNoBack"
                alt=""
                 @click="detailsImage(invoiceObj.idNoBack)"
            /></el-col>
            <el-col :span="10"
              ><span class="grid-content bg-purple"
                >人脸识别：{{invoiceObj.faceAuthResult | audit}}</span
              ></el-col
            >
            <el-col :span="24"
              ><span class="grid-left">识别快照：</span
              ><img class="grid-img" :src="invoiceObj.faceAuthUrl" alt=""   @click="detailsImage(invoiceObj.faceAuthUrl)"
            /></el-col>
            <el-col :span="10"
              ><span class="grid-content bg-purple"
                >提交认证时间：{{invoiceObj.submitTime}}</span
              ></el-col
            >
            <el-col :span="10"
              ><span class="grid-content bg-purple"
                >认证通过时间：{{invoiceObj.passTime}}</span
              ></el-col
            >
          </el-row>
          <el-row class="footer" v-if="invoiceObj.companyDTO">
            <el-col :span="24"><h4>企业认证信息</h4></el-col>
            <el-col :span="10"
              ><span class="grid-content bg-purple"
                >企业名称：{{invoiceObj.companyDTO.companyName}}</span
              ></el-col
            >
            <el-col :span="10"
              ><span class="grid-content bg-purple"
                >信用代码：{{invoiceObj.companyDTO.creditCode}}</span
              ></el-col
            >
            <el-col :span="24"
              ><span class="grid-content bg-purple"
                >法人姓名：{{invoiceObj.companyDTO.legalPersonName}}</span
              ></el-col
            >
            <el-col :span="24"
              ><span class="grid-left">营业执照：</span
              ><img class="grid-img" :src="invoiceObj.companyDTO.businessLincenseImg" alt=""  @click="detailsImage(invoiceObj.companyDTO.businessLincenseImg)"
            /></el-col>
            <el-col :span="10"
              ><span class="grid-content bg-purple"
                >提交认证时间：{{invoiceObj.companyDTO.submitTime}}</span
              ></el-col
            >
            <el-col :span="10"
              ><span class="grid-content bg-purple"
                >认证通过时间：{{invoiceObj.companyDTO.passTime}}</span
              ></el-col
            >
          </el-row>
        </div>
      </div>
    </el-dialog>
      <!-- 图片查看 -->
    <el-dialog title="图片查看" :visible.sync="dialogImg" width="50%" :before-close="handleClose">
      <div>
        <img :src="imageDetails" alt width="100%"/>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pagination from "../../components/pagination.vue";
import api from "@/api/api.js";
import { get, post } from "@/api/index.js";
export default {
  data() {
    return {
        dialogImg: false,
         imageDetails: "",
      releaseForm: {
        auditStatus:"",
        companyName:"",
        mobile:"",
        personAuthResult:"",
        userName:""
      },
      invoiceObj: {},
      dialogDetails: false,
      pageSzie: 10,
      total: null,
      zhangoptions: [
        {
          value: "1",
          label: "冻结",
        },
        {
          value: "2",
          label: "正常",
        },
      ],
      options: [
        {
          value: "0",
          label: "未认证",
        },
        {
          value: "1",
          label: "认证中",
        },
        {
          value: "2",
          label: "认证成功",
        },
        {
          value: "3",
          label: "认证失败",
        }
      ],
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
      ],
    };
  },
    mounted() {
    this.userInfoPost();

  },
  methods: {
        detailsImage(src) {
      if (src) {
        this.imageDetails = src;
        this.dialogImg = true;
      }
    },
       userInfoPost(size) {
      const loading = this.$loading({
        lock: true,
        spinner: "loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      post(api.userList, {
        currentPage: size || 1,
        pageSize: this.pageSzie,
        auditStatus: this.releaseForm.auditStatus,
        companyName: this.releaseForm.companyName,
        mobile: this.releaseForm.mobile,
        personAuthResult:this.releaseForm.personAuthResult,
        userName:this.releaseForm.userName
      }).then(
        d => {
          loading.close();
          if (d.code === 0) {
            console.log(d, "!!!!!!!!!!!!");
            this.total = d.data.count;
            this.tableData = d.data.rows;
          }else{
            console.log(d.message)
          }
        },
        err => {
          //error callback
        }
      );
    },
        // 启用 禁用
    // changeEnabled(row) {
    //   console.log(row,'33333')
    //   // post(api.enabled, {
    //   //   id: row.id,
    //   //   isEnabled: row.isEnabled
    //   // }).then(
    //   //   d => {
    //   //     if (d.status === 0) {
    //   //       console.log(d, "!!!!!!!!!!!!");
    //   //       this.deliveryPagePost();
    //   //     } else {
    //   //       console.log(d.msg);
    //   //     }
    //   //   },
    //   //   err => {
    //   //     //error callback
    //   //   }
    //   // );
    // },
    handleClose(done) {
      done();
    },
    // 查看详情
    checkDetailds(row) {
       post(api.userDetails, {
        id:row.id
      }).then(
        d => {
          if (d.code === 0) {
             this.dialogDetails = true;
             this.invoiceObj = d.data;
          }else{
            console.log(d.message)
          }
        },
        err => {
          //error callback
        }
      );
     
    },
      search() {
      this.userInfoPost();
    },
    reset() {
      this.releaseForm={
        auditStatus:"",
        companyName:"",
        mobile:"",
        personAuthResult:"",
        userName:""
      },
      this.userInfoPost();
    },
    handleSizeChange(val) {
      this.pageSzie = val;
      console.log(`每页 ${val} 条aaaaa`);
      this.userInfoPost();
    },
    handleCurrentChange(size) {
      console.log(size);
      this.userInfoPost(size);
    },
  },
  components: {
    pagination: pagination,
  },
};
</script>
