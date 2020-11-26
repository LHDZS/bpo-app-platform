<style lang="less" scoped>
.signing {
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
}
</style>


<template>
  <div class="signing">
    <el-row>
      <el-form ref="releaseForm" :model="releaseForm" label-width="120px">
        <el-col :span="8">
          <el-form-item label="发起方：">
            <el-input
              v-model="releaseForm.companyName"
              size="small"
              placeholder="请选择发起方"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="签署方：">
            <el-input
              v-model="releaseForm.userName"
              size="small"
              placeholder="请选择签署方"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态：">
            <el-select
              v-model="releaseForm.signStatus"
              style="width: 100%"
              placeholder="请选择状态"
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
          <el-form-item label="发起签约时间：">
            <el-date-picker
              v-model="releaseForm.createDate"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy 年 MM 月 dd 日 HH 时 mm 分 ss 秒"
              value-format="yyyy-MM-dd HH-mm-ss"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24">
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
          :show-overflow-tooltip="true"
          label="经办人ID"
        >
        </el-table-column>
        <el-table-column
          prop="userNo"
          label="经办人账号"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="companyName"
          label="合同发起方"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="userName"
          label="合同签署方"
          :show-overflow-tooltip="true"
        >
        </el-table-column>

        <el-table-column
          prop="signStartTime"
          label="合同发起时间"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="signEndTime"
          :show-overflow-tooltip="true"
          label="签约结束时间"
        >
        </el-table-column>
        <el-table-column
          prop="signCompleteTime"
          :show-overflow-tooltip="true"
          label="签约完成时间"
        >
        </el-table-column>
        <el-table-column
          prop="signStatus"
          label="状态"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <div>
              <span>{{ scope.row.signStatus | signstatus }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="dakaiRow(scope.row)" type="text" size="small">
              合同
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
</template>

<script>
import pagination from "../../components/pagination.vue";
import api from "@/api/api.js";
import { get, post } from "@/api/index.js";

export default {
  data() {
    return {
      releaseForm: {
        companyName: "",
        signStatus: "",
        createDate: ["", ""],
        userName: "",
      },
      pageSzie: 10,
      total: null,
      options: [
        {
          value: "0",
          label: "待签约",
        },
        {
          value: "1",
          label: "签约中",
        },
        {
          value: "2",
          label: "已签约",
        },
        {
          value: "3",
          label: "未签约",
        },
        {
          value: "4",
          label: "已过期",
        },
      ],
      tableData: [],
    };
  },
  mounted() {
    this.queryPageData();
  },
  methods: {
    dakaiRow(row) {
          post(api.getByDocId, {
            docId:row.docId
          }).then(
            (d) => {
              if (d.code === 0) {
                  window.open(d.data.docUrl);
              } else {
                this.$message.error(d.message);
              }
            },
            (err) => {
              //error callback
            }
          );
    },
    queryPageData(size) {
      const loading = this.$loading({
        lock: true,
        spinner: "loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      post(api.signqueryPage, {
        currentPage: size || 1,
        pageSize: this.pageSzie,
        signStatus: this.releaseForm.signStatus,
        companyName: this.releaseForm.companyName,
        userName: this.releaseForm.userName,
        start1Time: this.releaseForm.createDate[0],
        end1Time: this.releaseForm.createDate[1],
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
    search() {
      this.queryPageData();
    },
    reset() {
      this.releaseForm = {
        companyName: "",
        signStatus: "",
        createDate: ["", ""],
        userName: "",
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
