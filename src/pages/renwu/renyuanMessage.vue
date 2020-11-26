<style lang="less" scoped>
.renyuanMessage {
  width: 100%;
  min-height: 100%;
  padding: 12px;
  box-sizing: border-box;
  background-color: #fff;
  text-align: left;
  .box {
    width: 100%;
    .main_button {
      margin-left: 36px;
    }
    .wrap {
      width: 100%;
      margin-top: 22px;
      padding: 0px 30px;
      box-sizing: border-box;
    }
  }
  .block {
    width: 100%;
    .main {
      width: 100%;
      padding: 30px;
      box-sizing: border-box;
      font-size: 14px;
      color: rgba(16, 16, 16, 100);
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
<style>
</style>

<template>
  <div class="renyuanMessage">
    <div class="box" v-if="releaseType">
      <el-row>
        <el-form ref="releaseForm" :model="releaseForm" label-width="120px">
          <el-col :span="8">
            <el-form-item label="任务ID：">
              <el-input
                v-model="releaseForm.companyTaskId"
                size="small"
                placeholder="请输入任务ID"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="进度状态：">
              <el-select
                v-model="releaseForm.applyStatus"
                style="width: 100%"
                placeholder="请选择进度状态"
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
            <el-form-item label="发包ID：">
              <el-input
                v-model="releaseForm.platformTaskId"
                size="small"
                placeholder="请输入发包ID"
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
            <el-form-item label="投递时间：">
              <el-date-picker
                v-model="releaseForm.createDate"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy 年 MM 月 dd 日 HH 时 mm 分 ss 秒"
                value-format="yyyy-MM-dd HH:mm:ss"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label=" ">
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
            prop="platformTaskId"
            :show-overflow-tooltip="true"
            label="任务ID"
          >
          </el-table-column>
          <el-table-column
            prop="companyName"
            :show-overflow-tooltip="true"
            label="企业名称"
          >
          </el-table-column>
          <el-table-column
            prop="platformTaskId"
            :show-overflow-tooltip="true"
            label="平台发包ID"
          >
          </el-table-column>
          <el-table-column
            prop="applyUserId"
            :show-overflow-tooltip="true"
            label="投递人ID"
          >
          </el-table-column>
          <el-table-column
            prop="userName"
            :show-overflow-tooltip="true"
            label="投递人姓名"
          >
          </el-table-column>
          <el-table-column
            prop="applyUserMobile"
            :show-overflow-tooltip="true"
            width="120"
            label="投递人联系方式"
          >
          </el-table-column>
          <!-- <el-table-column
                  prop="address"
                  label="简历信息"
                  width="150">
                  <template slot-scope="scope">
                      <el-button
                      @click="resume(scope.row)"
                      type="text"
                      size="small">
                      查看简历
                      </el-button>
                  </template>
                  </el-table-column> -->
          <el-table-column
            prop="applyStatus"
            :show-overflow-tooltip="true"
            label="状态"
          >
            <template slot-scope="scope">
              <div>
                <span>{{ scope.row.applyStatus | applystatus }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="applyTime"
            :show-overflow-tooltip="true"
            label="投递时间"
          >
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                @click="clickRow(1, scope.row)"
                type="text"
                size="small"
              >
                查看
              </el-button>
              <el-button
                @click="clickRow(2, scope.row)"
                type="text"
                size="small"
                v-if="scope.row.applyStatus != 6 && scope.row.signStatus == 0"
              >
                进度反馈
              </el-button>
              <span v-if="scope.row.applyStatus">
                <el-button
                  @click="clickRow(3, scope.row)"
                  type="text"
                  size="small"
                  v-if="scope.row.applyStatus == 6 && scope.row.signStatus == 0"
                >
                  发起签约
                </el-button>
              </span>
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
    <div class="block" v-else>
      <el-page-header @back="goBack" content="查看详情"> </el-page-header>
      <div class="main">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="基本信息" name="first">
            <el-row>
              <el-col :span="24"><h4>任务信息</h4></el-col>
              <el-col :span="8"
                ><span class="grid-content bg-purple"
                  >任务ID：{{ invoiceObj.companyTaskId }}</span
                ></el-col
              >
              <el-col :span="8"
                ><span class="grid-content bg-purple"
                  >任务需求方：{{ invoiceObj.companyName }}</span
                ></el-col
              >
              <el-col :span="8"
                ><span class="grid-content bg-purple"
                  >联系电话：{{ invoiceObj.contactMobile }}</span
                ></el-col
              >
              <el-col :span="8"
                ><span class="grid-content bg-purple"
                  >任务名称：{{ invoiceObj.taskName }}</span
                ></el-col
              >
              <el-col :span="8" v-if="invoiceObj.platformTaskIndustryRes"
                ><span class="grid-content bg-purple"
                  >所属行业：
                  <span
                    v-for="(item, y) in invoiceObj.platformTaskIndustryRes"
                    :key="y"
                  >
                    {{ item.industryName }}
                  </span>
                </span></el-col
              >
              <el-col :span="8"
                ><span class="grid-content bg-purple"
                  >需求人数：{{ invoiceObj.peopleNumber }}</span
                ></el-col
              >
              <el-col :span="8"
                ><span class="grid-content bg-purple"
                  >任务地点：
                  <span
                    v-for="(item, y) in invoiceObj.platformTaskCityRes"
                    :key="y"
                  >
                    {{ item.areaName }}
                  </span>
                </span></el-col
              >
              <el-col :span="8"
                ><span class="grid-content bg-purple"
                  >工作时间：{{ invoiceObj.createdAt }}至{{
                    invoiceObj.endTime
                  }}</span
                ></el-col
              >
              <el-col :span="8"
                ><span class="grid-content bg-purple"
                  >性别要求：{{ invoiceObj.requirementSex | sexresut }}</span
                ></el-col
              >
              <el-col :span="8"
                ><span class="grid-content bg-purple"
                  >学历要求：{{ invoiceObj.requirementEducation}}</span
                ></el-col
              >
              <el-col :span="8"
                ><span class="grid-content bg-purple"
                  >年龄要求：{{ invoiceObj.requirementAgeMin }}-{{
                    invoiceObj.requirementAgeMax
                  }}周岁</span
                ></el-col
              >
              <el-col :span="8"
                ><span class="grid-content bg-purple"
                  >薪资结算： {{ invoiceObj.salarySettlement }}/{{
                    invoiceObj.salaryUnit
                  }}</span
                ></el-col
              >
              <el-col :span="8"
                ><span class="grid-content bg-purple"
                  >发布时间：{{ invoiceObj.releasedAt }}</span
                ></el-col
              >
              <el-col :span="8"
                ><span class="grid-content bg-purple"
                  >截止时间：{{ invoiceObj.endTime }}</span
                ></el-col
              >
              <el-col :span="8"
                ><span class="grid-content bg-purple"
                  >审核状态：{{ invoiceObj.auditStatus | invoice }}</span
                ></el-col
              >
              <el-col :span="24" v-if="invoiceObj.platformTaskLabelRes"
                ><span class="grid-content bg-purple"
                  >标签：
                  <span
                    v-for="(item, y) in invoiceObj.platformTaskLabelRes"
                    :key="y"
                  >
                    {{ item.labelName }}
                  </span>
                </span></el-col
              >
              <el-col :span="24"
                ><span class="grid-content bg-purple"
                  ><span class="grid-left">任务说明：</span>
                  {{ invoiceObj.taskDescribe }}
                </span></el-col
              >
              <el-col :span="24"
                ><span class="grid-left">工作环境：</span>
                <div
                  v-for="item in arr"
                  :key="item"
                  @click="detailsImage(item)"
                >
                  <img class="grid-img" :src="item" alt="" />
                </div>
              </el-col>
            </el-row>
            <el-row class="footer" v-if="invoiceObj.platformTaskDto">
              <el-col :span="24"><h4>平台发包信息</h4></el-col>
              <el-col :span="8"
                ><span class="grid-content bg-purple"
                  >平台发包ID：{{ invoiceObj.platformTaskDto.id }}</span
                ></el-col
              >
              <el-col :span="8"
                ><span class="grid-content bg-purple"
                  >发布状态：{{
                    invoiceObj.platformTaskDto.taskStatus | taskstatus
                  }}</span
                ></el-col
              >
              <el-col :span="8"
                ><span class="grid-content bg-purple"
                  >发布方：{{ invoiceObj.platformTaskDto.senderName }}</span
                ></el-col
              >
              <el-col :span="8"
                ><span class="grid-content bg-purple"
                  >薪资结算： {{ invoiceObj.platformTaskDto.salarySettlement }}/
                  {{ invoiceObj.platformTaskDto.salaryUnit }}</span
                ></el-col
              >
              <el-col :span="8"
                ><span class="grid-content bg-purple"
                  >发布时间：{{ invoiceObj.platformTaskDto.releasedAt }}</span
                ></el-col
              >
              <el-col :span="8"
                ><span class="grid-content bg-purple"
                  >截止时间：{{ invoiceObj.platformTaskDto.endTime }}</span
                ></el-col
              >
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <el-dialog
      title="进度反馈"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleCloseJin"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="150px"
        class="demo-ruleForm"
      >
        <el-form-item label="进度状态" prop="applyStatus">
          <el-select
            v-model="ruleForm.applyStatus"
            placeholder="请选择进度状态"
            size="small"
            style="width: 318px"
          >
            <el-option
              v-for="item in jinoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="进度描述" prop="applyNotes">
          <el-input
            type="textarea"
            style="width: 318px"
            v-model="ruleForm.applyNotes"
            placeholder="请输入进度描述"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFormJin('ruleForm')"
            >确定</el-button
          >
          <el-button @click="resetFormJin('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 发起签约 -->
    <el-dialog
      title="发起签约"
      :visible.sync="dialogVisible1"
      width="600px"
      :before-close="handleClose"
    >
      <el-form
        :model="taskForm"
        :rules="taskRules"
        ref="taskForm"
        label-width="150px"
        class="demo-ruleForm"
      >
        <el-alert
          title="请选择签约截止时间，超过签约截止时间，还未完成签约，即签约过期，无法签署"
          type="warning"
          :closable="false"
          show-icon
        >
        </el-alert>
        <el-form-item label="签约截止时间：" prop="signEndTime">
          <el-date-picker
            v-model="taskForm.signEndTime"
            type="datetime"
            style="width: 318px"
            placeholder="选择日期时间"
            format="yyyy 年 MM 月 dd 日 HH 时 mm 分 ss 秒"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFormFa('taskForm')"
            >确定</el-button
          >
          <el-button @click="resetFormFa('taskForm')">取消</el-button>
        </el-form-item>
      </el-form>
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
      imageUrl: "",
      dialogVisible: false,
      dialogVisible1: false,
      activeName: "first",
      releaseType: true,
      //工作环境
      arr: [],
      invoiceObj: {},
      pageSzie: 10,
      total: null,
      releaseForm: {
        createDate: ["", ""],
        companyTaskId: "",
        applyStatus: "",
        companyName: "",
        platformTaskId: "",
      },
      jinoptions: [
        {
          value: "0",
          label: "申请中",
        },
        {
          value: "1",
          label: "邀请面试中",
        },
        {
          value: "2",
          label: "面试中",
        },
        {
          value: "3",
          label: "拒绝申请",
        },
        {
          value: "4",
          label: "拒绝面试",
        },
        {
          value: "5",
          label: "面试失败",
        },
        {
          value: "6",
          label: "已录取",
        },
      ],
      options: [
        {
          value: "0",
          label: "申请中",
        },
        {
          value: "1",
          label: "邀请面试中",
        },
        {
          value: "2",
          label: "面试中",
        },
        {
          value: "3",
          label: "拒绝申请",
        },
        {
          value: "4",
          label: "拒绝面试",
        },
        {
          value: "5",
          label: "面试失败",
        },
        {
          value: "6",
          label: "已录取",
        },
      ],
      tableData: [],
      ruleForm: {
        applyStatus: "",
        applyNotes: "",
        id: "",
      },
      rules: {
        applyStatus: [
          { required: true, message: "请选择进度状态", trigger: "change" },
        ],
        applyNotes: [
          { required: true, message: "请填写进度描述", trigger: "blur" },
        ],
      },
      taskForm: {
        signEndTime: "",
        companyId: 0,
        platformTaskApplyId: 0,
        userId: 0,
      },
      taskRules: {
        signEndTime: [
          { required: true, message: "请输入签约截止时间", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.queryPageData();
  },
  methods: {
    queryPageData(size) {
      const loading = this.$loading({
        lock: true,
        spinner: "loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      post(api.taskApplyPage, {
        currentPage: size || 1,
        pageSize: this.pageSzie,
        applyStatus: this.releaseForm.applyStatus,
        companyTaskId: parseInt(this.releaseForm.companyTaskId),
        companyName: this.releaseForm.companyName,
        platformTaskId: parseInt(this.releaseForm.platformTaskId),
        applyTimeStart: this.releaseForm.createDate[0],
        applyTimeEnd: this.releaseForm.createDate[1],
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
    //进度反馈
    handleCloseJin() {
      this.dialogVisible = false;
    },
    handleClose() {
      this.dialogVisible1 = false;
    },
    submitFormJin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          post(api.updateApplyStatus, this.ruleForm).then(
            (d) => {
              if (d.code === 0) {
                this.$refs[formName].resetFields();
                this.dialogVisible = false;
                this.queryPageData();
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
    submitFormFa(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          post(api.signUrl, this.taskForm).then(
            (d) => {
              if (d.code === 0) {
                this.$refs[formName].resetFields();
                this.dialogVisible1 = false;
                this.queryPageData();
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
    resetFormJin(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false;
    },
    resetFormFa(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible1 = false;
    },
    resume() {},
    goBack() {
      this.releaseType = true;
    },
    handleClick() {},
    clickRow(val, row) {
      //1查看2进度反馈3发起签约
      if (val == 1) {
        post(api.queryDetail, {
          id: row.platformTaskId,
        }).then(
          (d) => {
            if (d.code === 0) {
              // console.log(d.data.workspace,'4646646')
              if (d.data.workspace != undefined) {
                this.arr = d.data.workspace.split(",");
              } else {
                this.arr = [];
              }
              // console.log(this.arr,'66666')
              this.invoiceObj = d.data;
              this.releaseType = false;
            } else {
              this.$message.error(d.message);
            }
          },
          (err) => {
            //error callback
          }
        );
      } else if (val == 2) {
        this.ruleForm = {
          applyStatus: "",
          applyNotes: "",
          id: row.id,
        },
          this.dialogVisible = true;
      } else {
        this.taskForm = {
          companyId: row.companyId,
          platformTaskApplyId: row.id,
          userId: row.applyUserId,
          signEndTime: "",
        };
        this.dialogVisible1 = true;
      }
    },
    search() {
      this.queryPageData();
    },
    reset() {
      this.releaseForm = {
        createDate: ["", ""],
        companyTaskId: "",
        applyStatus: "",
        companyName: "",
        platformTaskId: "",
      };
      this.queryPageData();
    },
    handleSizeChange(val) {
      this.pageSzie = val;
      console.log(`每页 ${val} 条aaaaa`);
      this.queryPageData();
    },
    handleCurrentChange(size) {
      console.log(size);
      this.queryPageData(size);
    },
  },
  components: {
    pagination: pagination,
  },
};
</script>
