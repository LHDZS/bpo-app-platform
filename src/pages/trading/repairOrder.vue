<style lang="less" scoped>
.repairOrder {
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
  <div class="repairOrder">
    <el-row>
        <el-form ref="releaseForm" :model="releaseForm" label-width="120px">
            <el-col :span="8">
                <el-form-item label="企业名称：">
                    <el-input v-model="releaseForm.name" size="small" placeholder="请输入企业名称"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="任务ID：">
                    <el-input v-model="releaseForm.name" size="small" placeholder="请输入任务ID"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="任务承接人：">
                    <el-input v-model="releaseForm.name" size="small" placeholder="请输入任务承接人员的名称"></el-input>
                </el-form-item>
            </el-col>
              <el-col :span="8">
                <el-form-item label="联系电话：">
                    <el-input v-model="releaseForm.name" size="small" placeholder="请输入联系电话"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="状态：">
                    <el-input v-model="releaseForm.name" size="small" placeholder="请输入状态"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="上传时间：">
                    <el-date-picker
                    style="width:100%"
                    size="small"
                    v-model="releaseForm.value1"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label=" " style="text-align: left;">
                    <el-button type="primary" size="small" @click="search()">搜索</el-button>
                    <el-button size="small" @click="reset()">重置</el-button>
                </el-form-item>
            </el-col>
        </el-form>
    </el-row>
    <div class="wrap">
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
            fixed
            prop="date"
            label="任务ID"
            width="150">
            </el-table-column>
            <el-table-column
            prop="name"
            label="平台发包ID"
            width="120">
            </el-table-column>
            <el-table-column
            prop="province"
            label="企业名称"
            width="120">
            </el-table-column>
            <el-table-column
            prop="city"
            label="任务承接人员"
            width="120">
            </el-table-column>
            <el-table-column
            prop="address"
            label="联系电话"
            width="300">
            </el-table-column>
            <el-table-column
            prop="zip"
            label="工作时间"
            width="120">
            </el-table-column>
            <el-table-column
            prop=""
            label="工作内容">
            </el-table-column>
            <el-table-column
            prop=""
            label="上传时间">
            </el-table-column>
            <el-table-column
            prop=""
            label="状态">
            </el-table-column>
        </el-table>
    </div>
    <div class="wrap">
        <pagination @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"></pagination>
    </div>
  </div>
</template>

<script>
import pagination from '../../components/pagination.vue'

export default {
  data() {
    return {
        releaseForm:{

        },
        options:[{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
    }
  },
  methods: {
    search() {

    },
    reset() {

    },
    handleSizeChange() {

    },
    handleCurrentChange() {

    }
  },
  components: {
      pagination:pagination
  }
}
</script>
