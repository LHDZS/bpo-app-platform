<style lang="less" scoped>
.shimingRen {
  width: 100%;
  min-height: 100%;
  padding: 12px;
  box-sizing: border-box;
  background-color: #fff;
  .box {
    width: 100%;
    .main_button {
      text-align: left;
      margin-left: 36px;
    }
    .wrap {
      width: 100%;
      margin-top: 22px;
      padding: 0px 30px;
      box-sizing: border-box;
      .daishen {
        background-color: #1890ff;
        display: inline-block;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        vertical-align: middle;
      }
    }
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


<template>
  <div class="shimingRen">
    <div class="box" v-if="releaseType">
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
            <el-form-item label="ID：">
              <el-input
                v-model="releaseForm.id"
                size="small"
                placeholder="请输入用户ID"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="认证状态：">
              <el-select
                v-model="releaseForm.auditStatus"
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

          <el-col :span="8">
            <el-form-item label=" " style="text-align: left">
              <el-button type="primary" size="small" @click="search()"
                >搜索</el-button
              >
              <el-button size="small" @click="reset()">重置</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div class="wrap">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column fixed prop="id" label="ID">
          </el-table-column>
          <el-table-column prop="userName" label="姓名"  :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="mobile" label="手机号码" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="idNo" label="身份证号" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="bankNo" label="银行卡号" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="auditStatus"
            label="状态"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <div>
                <span
                  class="daishen"
                  :style="
                    'background-color:' +
                    infoBoxStatusColor[scope.row.auditStatus]
                  "
                ></span
                >&nbsp;&nbsp;
                <span>{{ scope.row.auditStatus | invoice }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="registerTime" label="注册时间"   :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="companyDTO.submitTime" label="提交认证时间"   :show-overflow-tooltip="true"> </el-table-column>

          <el-table-column fixed="right" label="操作" >
            <template slot-scope="scope">
              <el-button
                @click="clickRow(2,scope.row)"
                type="text"
                size="small"
                v-if="scope.row.auditStatus == 1"
              >
                审核
              </el-button>
              <el-button @click="clickRow(1,scope.row)" type="text" size="small">
                详情
              </el-button>
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
    </div>
    <!-- 查看详情 -->
    <el-dialog
      :visible.sync="dialogDetails"
      width="1080px"
      :before-close="handleClose2"
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
              ><img class="grid-img" :src="invoiceObj.idNoFront" alt=""  @click="detailsImage(invoiceObj.idNoFront)"  /><img
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
              ><img class="grid-img" :src="invoiceObj.faceAuthUrl" alt="" @click="detailsImage(invoiceObj.faceAuthUrl)"
            /></el-col>
          </el-row>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      title="审核"
      :visible.sync="dialogVisible"
      width="600px"
      style="text-align: left"
      :before-close="handleClose"
    >
      <el-form
        ref="auditForm"
        :model="auditForm"
        :rules="auditRules"
        label-width="140px"
        class="demo-ruleForm"
      >
        <el-form-item label="审核状态：" prop="auditStatus">
          <div class="list">
            <el-select
              v-model="auditForm.auditStatus"
              style="width: 100%"
              placeholder="请选择"
              @change="xuanze"
            >
              <el-option
                v-for="item in auditOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="审核备注：" prop="auditNotes">
          <div class="list">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              resize="none"
              v-model="auditForm.auditNotes"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('auditForm')"
            >确定</el-button
          >
          <el-button @click="resetForm('auditForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
        <!-- 图片查看 -->
    <el-dialog title="图片查看" :visible.sync="dialogImg" width="50%" :before-close="handleClose3">
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
      releaseType: true,
      invoiceObj:{},
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
      dialogVisible: false,
      dialogDetails: false,
      pageSzie: 10,
      total: null,
      infoBoxStatusColor: {
        1: "#3083FF",
        2: "#52C41A",
        3: "#F5222D",
      },
      options: [
        {
          value: "1",
          label: "待审核",
        },
        {
          value: "2",
          label: "审核通过",
        },
        {
          value: "3",
          label: "审核失败",
        },
      ],
      releaseForm: {
        userName: "",
        mobile: "",
        id: "",
        auditStatus: "",
      },
      auditForm: {
        auditNotes: "",
        auditStatus: "",
        id:""
      },
      auditRules: {
        auditStatus: [
          { required: true, message: "请选择审核状态", trigger: "change" },
        ],
        auditNotes: [
          { required: true, message: "请填写审核备注", trigger: "blur" },
        ],
      },
      auditOptions: [
        {
          value: "2",
          label: "审核通过",
        },
        {
          value: "3",
          label: "审核失败",
        },
      ],
      tableData: [],
    };
  },
  mounted() {
    this.shiInfoPost();
  },

  methods: {
    handleClose3(){
      this.dialogImg = false;
    },
     detailsImage(src) {
      if (src) {
        this.imageDetails = src;
        this.dialogImg = true;
      }
    },
    shiInfoPost(size) {
      const loading = this.$loading({
        lock: true,
        spinner: "loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      post(api.auditPage, {
        currentPage: size || 1,
        pageSize: this.pageSzie,
        auditStatus: this.releaseForm.auditStatus,
        id: parseInt(this.releaseForm.id),
        mobile: this.releaseForm.mobile,
        personAuthResult: this.releaseForm.personAuthResult,
        userName: this.releaseForm.userName,
      }).then(
        (d) => {
          loading.close();
          if (d.code === 0) {
            console.log(d, "!!!!!!!!!!!!");
            this.total = d.data.count;
            this.tableData = d.data.rows;
          } else {
            console.log(d.message);
          }
        },
        (err) => {
          //error callback
        }
      );
    },
    // 取消
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false;
    },
    xuanze(val) {
      console.log(val, "选择1");
      // this.$refs.auditForm.resetFields();
      if (val == 2) {
        this.auditRules["auditNotes"] = [
          { required: false, message: "请输入审核备注", trigger: "blur" },
        ];
      } else if(val == 3){
        {
        this.auditRules["auditNotes"] = [
          { required: true, message: "请输入审核备注", trigger: "blur" },
        ];
        }
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      console.log(fileList);
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    handleClose() {
        this.auditForm = {
        auditNotes: "",
        auditStatus: "",
      },
      this.dialogVisible = false;
    },
    handleClose2() {
      this.dialogDetails = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          post(api.audit, this.auditForm).then(
            (d) => {
              if (d.code === 0) {
                // console.log(d, "??????????????");
                this.$refs[formName].resetFields();
                this.dialogVisible = false;
                this.shiInfoPost();
              } else {
                this.$message.error(d.message);
              }
            },
            (err) => {
              //error callback
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    goBack() {
      this.releaseType = true;
    },
    clickRow(val,row) {
      // console.log(row)
      //1详情 2审核
      if (val == 1) {
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
   
      } else {
        this.auditForm={
        auditNotes: "",
        auditStatus: "",
        id:row.id
      },
        this.dialogVisible = true;
      }
    },
    search() {
      this.shiInfoPost();
    },
    reset() {
      this.releaseForm = {
        userName: "",
        mobile: "",
        id: "",
        auditStatus: "",
      };
      this.shiInfoPost()
    },
    handleSizeChange(val) {
      this.pageSzie = val;
      console.log(`每页 ${val} 条aaaaa`);
      this.shiInfoPost();
    },
    handleCurrentChange(size) {
      console.log(size);
      this.shiInfoPost(size);
    },
  },
  components: {
    pagination: pagination,
  },
};
</script>
