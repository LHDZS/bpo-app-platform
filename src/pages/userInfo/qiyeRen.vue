<style lang="less" scoped>
.qiyeRen {
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
  <div class="qiyeRen">
    <div class="box" v-if="releaseType">
      <el-row>
        <el-form ref="releaseForm" :model="releaseForm" label-width="120px">
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
            <el-form-item label="经办人ID：">
              <el-input
                v-model="releaseForm.userId"
                size="small"
                placeholder="请输入经办人ID"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="经办人姓名：">
              <el-input
                v-model="releaseForm.userName"
                size="small"
                placeholder="请输入经办人姓名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="经办人手机：">
              <el-input
                v-model="releaseForm.userMobile"
                size="small"
                placeholder="请输入经办人手机"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态：">
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
          <el-table-column
            fixed
            prop="userId"
            label="经办人ID"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            fixed
            prop="userName"
            label="经办人姓名"
            :show-overflow-tooltip="true"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="userMobile"
            label="经办人手机号"
            :show-overflow-tooltip="true"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="userIdcard"
            label="经办人身份证"
            :show-overflow-tooltip="true"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="userBankNo"
            label="经办人卡号"
            :show-overflow-tooltip="true"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="companyName"
            label="企业名称"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="creditCode"
            label="信用代码"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="legalPersonName"
            label="法人姓名"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="idNo"
            label="身份证号"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="businessTerm"
            label="营业期限"
            :show-overflow-tooltip="true"
          >
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
          <el-table-column
            prop="createdAt"
            label="注册时间"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="submitTime"
            label="提交认证时间"
            width="120"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                @click="clickRow(3, scope.row)"
                type="text"
                size="small"
                 v-if="scope.row.auditStatus == 1"
              >
                审核
              </el-button>
              <el-button
                @click="clickRow(1, scope.row)"
                type="text"
                size="small"
              >
                详情
              </el-button>
              <el-button
                @click="clickRow(2, scope.row)"
                type="text"
                size="small"
                v-if="scope.row.auditStatus == 2"
              >
                关联
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
            <el-col :span="24"><h4>企业认证信息</h4></el-col>
            <el-col :span="10"
              ><span class="grid-content bg-purple"
                >企业名称：{{ qiyeInfo.companyName }}</span
              ></el-col
            >
            <el-col :span="10"
              ><span class="grid-content bg-purple"
                >信用代码：{{ qiyeInfo.creditCode }}</span
              ></el-col
            >
            <el-col :span="24"
              ><span class="grid-content bg-purple"
                >法人姓名：{{ qiyeInfo.legalPersonName }}</span
              ></el-col
            >
            <el-col :span="24"
              ><span class="grid-left">营业执照：</span
              ><img
                class="grid-img"
                :src="qiyeInfo.businessLincenseImg"
                alt=""
                @click="detailsImage(qiyeInfo.businessLincenseImg)"
            /></el-col>
          </el-row>
        </div>
      </div>
    </el-dialog>
    <!-- 关联 -->
    <el-dialog
      :visible.sync="dialogDetailed"
      width="700px"
      :before-close="handleClose3"
      title="关联"
    >
      <div class="box">
        <el-row>
          <el-form ref="leaseForm" :model="leaseForm" label-width="120px">
            <el-col :span="15">
              <el-form-item label="企业名称：">
                <el-select
                  @change="onInputChange"
                  v-model="leaseForm.name"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入企业名称"
                  :remote-method="remoteMethod"
                  :loading="loading"
                >
                  <el-option
                    v-for="item in qiyeOptions"
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
                <el-button type="primary" size="small" @click="searchBtn()"
                  >确定</el-button
                >
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <div class="wrap">
          <el-table :data="jiesuanData" style="width: 100%">
            <el-table-column
              prop="xbgMerchantId"
              label="薪必果结算系统ID"
              width="200"
                 align ="center"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="xbgMerchantName"
              label="企业名称"
              width="200"
              align ="center"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column label="操作" width="200"    align ="center">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="clickRowBtn(scope.row.id)"
                  type="text"
                  size="small"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
    <!-- 审核 -->
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
    <el-dialog
      title="图片查看"
      :visible.sync="dialogImg"
      width="50%"
      :before-close="handleCloseGuan"
    >
      <div>
        <img :src="imageDetails" alt width="100%" />
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
      total: null,
      pageSzie: 10,
      dialogImg: false,
      imageDetails: "",
      releaseType: true,
      qiyeInfo: {},
      dialogVisible: false,
      dialogDetails: false,
      dialogDetailed: false,
      infoBoxStatusColor: {
        1: "#3083FF",
        2: "#52C41A",
        3: "#F5222D",
      },
      auditForm: {
        auditStatus: "",
        auditNotes: "",
        id: "",
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
      leaseForm: {
        name: [],
      },
      releaseForm: {
        companyName: "",
        userId: "",
        auditStatus: "",
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
      jiesuanData: [],
      tableData: [],
      qiyeOptions: [],
      list: [],
      loading: false,
      states: [],
      qiyeId: "",
      xbgMerchantId: "",
      xbgMerchantInvoiceType: "",
      xbgMerchantName: "",
    };
  },
  mounted() {
    this.qiyeInfoPost();
  },
  computed: {},
  methods: {
    remoteMethod(query) {
      // console.log(query, "44444");
      if (query !== "") {
        // this.loading = true;
        this.qiyeOptions = [];
        post(api.queryByXBG, {
          name: query,
        }).then((d) => {
          if (d.code === 0) 
          this.states = d.data;
          this.list = [];
          if (this.states.length > 0) {
            this.list = this.states.map((item) => {
              // console.log(item.name_id,'33933939399')
              return {
                value: `${item.id}`,
                label: `${item.name_id}`,
                company_name: `${item.company_name}`,
                invoice_type: `${item.invoice_type}`,
              };
            });
            this.qiyeOptions = this.list.filter((item) => {
              return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
            });
          } else {
            this.states= [];
            this.list = [];
          }
        });
        // setTimeout(() => {
        //   this.loading = false;
        //   console.log(this.list)

        // }, 100);
      } else {
        this.qiyeOptions = [];
      }
    },
    onInputChange(val) {
      //向父组件传递选择地值，调用父组件setMajor把选中值赋给父组件
      // console.log(val, "djdjddjj");
      let obj = {};
      obj = this.qiyeOptions.find((item) => {
        //model就是上面的数据源
        return item.value === val; //筛选出匹配数据
      });
      // console.log(obj.label, "zidiandd");
      this.xbgMerchantName = obj.company_name;
      // console.log(this.xbgMerchantName, "dddddggg");
      this.xbgMerchantInvoiceType = obj.invoice_type;
    },
    handleCloseGuan() {
      this.dialogImg = false;
    },
    detailsImage(src) {
      if (src) {
        this.imageDetails = src;
        this.dialogImg = true;
      }
    },
    qiyeInfoPost(size) {
      const loading = this.$loading({
        lock: true,
        spinner: "loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      post(api.toqueryPage, {
        currentPage: size || 1,
        pageSize: this.pageSzie,
        companyName: this.releaseForm.companyName,
        userId: this.releaseForm.userId,
        auditStatus: this.releaseForm.auditStatus,
        userName: this.releaseForm.userName,
        userMobile: this.releaseForm.userMobile,
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
    xuanze(val) {
      console.log(val, "选择1");
      // this.$refs.auditForm.resetFields();
      if (val == 3) {
        this.auditRules["auditNotes"] = [
          { required: true, message: "请输入审核备注", trigger: "blur" },
        ];
      } else if (val == 2) {
        this.auditRules["auditNotes"] = [
          { required: false, message: "请输入审核备注", trigger: "blur" },
        ];
      }
    },
    // 取消
    resetForm(formName) {
      // console.log("0111");
      this.$refs[formName].resetFields();
      this.dialogVisible = false;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    handleClose3(done) {
      done();
      this.leaseForm = {};
      this.qiyeOptions = [];
      this.dialogDetailed = false;
    },
    handleClose2() {
      this.dialogDetails = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          post(api.updateCompany, this.auditForm).then(
            (d) => {
              if (d.code === 0) {
                // console.log(d, "??????????????");
                this.dialogVisible = false;
                this.qiyeInfoPost();
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
    //删除
    clickRowBtn(val) {
       this.$confirm("此操作将永久删除该企业, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          post(api.deleteXBGById, {
            id: val,
          }).then(
            (d) => {
              //console.log.log(d, 1);
              if (d.code == 0) {
                this.$message.success("删除成功");
                this.dialogDetailed = false;
                 this.qiyeInfoPost();
              } else {
                this.$message.error(d.message);
              }
            
            },
            (err) => {
              //console.log(err.data.msg);
              //error callback
            }
          );
        })
        .catch(() => {
          this.$message.warning("已取消删除");
        });
    },
    clickRow(val, row) {
      //  1详情 2关联 3 审核
      if (val == 1) {
        post(api.getById, {
          id: row.id,
        }).then(
          (d) => {
            if (d.code === 0) {
              // console.log(d, "??????????????");
              this.qiyeInfo = d.data;
              this.dialogDetails = true;
            } else {
              this.$message.error(d.message);
            }
          },
          (err) => {
            //error callback
          }
        );
      } else if (val == 2) {
        this.qiyeId = row.id;
        this.leaseForm = {};
        this.qiyeOptions = [];
        this.jiesuanData = [];
        post(api.getById, {
          id: row.id,
        }).then(
          (d) => {
            if (d.code === 0) {
              // console.log(d, "??????????????");
              if(d.data.xbgMerchantId != "" && d.data.xbgMerchantName != ""){
               this.jiesuanData.push(d.data);
              }else{
                this.jiesuanData = [];
              }
       
              this.dialogDetailed = true;
            } else {
              this.$message.error(d.message);
            }
          },
          (err) => {
            //error callback
          }
        );
      } else if (val == 3) {
        this.auditForm = {
          auditStatus: "",
          auditNotes: "",
          id: row.id,
        };
        this.dialogVisible = true;
      }
    },
    //列表
    search() {
      this.qiyeInfoPost();
    },
    //关联
    searchBtn() {
      post(api.relevance, {
        id: this.qiyeId,
        xbgMerchantId: this.leaseForm.name,
        xbgMerchantName: this.xbgMerchantName,
        xbgMerchantInvoiceType: this.xbgMerchantInvoiceType,
      }).then(
        (d) => {
          if (d.code === 0) {
            this.qiyeOptions = [];
            this.dialogDetailed = false;
          }
        },
        (err) => {
          //error callback
        }
      );
    },
    reset() {
      this.releaseForm = {
        companyName: "",
        userId: "",
        auditStatus: "",
        userMobile: "",
        userName: "",
      },
        this.qiyeInfoPost();
    },
    handleSizeChange(val) {
      this.pageSzie = val;
      console.log(`每页 ${val} 条aaaaa`);
      this.qiyeInfoPost();
    },
    handleCurrentChange(size) {
      console.log(size);
      this.qiyeInfoPost(size);
    },
  },

  components: {
    pagination: pagination,
  },
};
</script>
