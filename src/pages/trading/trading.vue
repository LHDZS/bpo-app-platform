<style lang="less" scoped>
.trading {
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
      }
    }
    .block {
      width: 100%;
      .list {
        width: 100%;
        text-align: left;
        padding: 20px;
        box-sizing: border-box;
        font-size: 14px;
        color: rgba(16, 16, 16, 100);
        .grid-content {
          width: 100%;
          margin-bottom: 20px;
          display: inline-block;
        }
      }
      .col {
        width: 102%;
        height: 10px;
        background-color: #f2f2f2;
        margin-left: -12px;
      }
    }
}
</style>


<template>
  <div class="trading">
    <div class="box" v-if="releaseType">
      <el-row>
          <el-form ref="releaseForm" :model="releaseForm" label-width="120px">
              <el-col :span="8">
                  <el-form-item label="任务ID：">
                      <el-input v-model="releaseForm.name" size="small" placeholder="请输入任务ID"></el-input>
                  </el-form-item>
              </el-col>
                <el-col :span="8">
                  <el-form-item label="企业名称：">
                      <el-input v-model="releaseForm.name" size="small" placeholder="请输入企业名称"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="8">
                  <el-form-item label="任务承接人：">
                      <el-input v-model="releaseForm.name" size="small" placeholder="请输入任务承接人"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="8">
                  <el-form-item label="联系电话：">
                      <el-input v-model="releaseForm.name" size="small" placeholder="请输入联系电话"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="8">
                  <el-form-item label="状态：">
                      <el-select v-model="releaseForm.value" style="width:100%" placeholder="请选择" size="small">
                          <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                          </el-option>
                      </el-select>
                  </el-form-item>
              </el-col>
              <el-col :span="8">
                  <el-form-item label="创建时间：">
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
              label="批次号"
              width="150">
              </el-table-column>
              <el-table-column
              prop="name"
              label="企业名称"
              width="120">
              </el-table-column>
              <el-table-column
              prop="province"
              label="任务ID"
              width="120">
              </el-table-column>
              <el-table-column
              prop="city"
              label="服务商"
              width="120">
              </el-table-column>
              <el-table-column
              prop="address"
              label="下发通道"
              width="300">
              </el-table-column>
              <el-table-column
              prop="zip"
              label="批次总笔数"
              width="120">
              </el-table-column>
              <el-table-column
              prop=""
              label="批次总金额"
              width="120">
              </el-table-column>
              <el-table-column
              prop=""
              label="创建时间">
              </el-table-column>
              <el-table-column
              prop=""
              label="审核状态">
              </el-table-column>
              <el-table-column
              prop=""
              label="批次状态">
              </el-table-column>
              <el-table-column
              fixed="right"
              label="操作"
              width="120">
              <template slot-scope="scope">
                  <el-button
                  @click.native.prevent="clickRow(scope.$index, tableData)"
                  type="text"
                  size="small">
                  查看
                  </el-button>
                  <el-button
                  @click="clickRow(1)"
                  type="text"
                  size="small">
                  审核
                  </el-button>
              </template>
              </el-table-column>
          </el-table>
      </div>
      <div class="wrap">
          <pagination @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"></pagination>
      </div>
    </div>
    <div class="block" v-else>
      <el-page-header @back="goBack" content="查看详情">
      </el-page-header>
      <div class="list">
        <el-row>
          <el-col :span="8"><span class="grid-content bg-purple">批次号：678927800908978936</span></el-col>
          <el-col :span="8"><span class="grid-content bg-purple">商户名称：上海韵达货运有限公司</span></el-col>
          <el-col :span="8"><span class="grid-content bg-purple">创建时间：2020-08-23 20:16:38</span></el-col>
          <el-col :span="8"><span class="grid-content bg-purple">下发通道：银行卡</span></el-col>
          <el-col :span="8"><span class="grid-content bg-purple">任务ID：789207904</span></el-col>
          <el-col :span="8"><span class="grid-content bg-purple">服务商：舟山兰和科技有限公司</span></el-col>
          <el-col :span="8"><span class="grid-content bg-purple">总笔数：190笔</span></el-col>
          <el-col :span="8"><span class="grid-content bg-purple">总金额：18900.00</span></el-col>
        </el-row>
      </div>
      <div class="col"></div>
      <div class="list">
        <el-row>
            <el-form ref="releaseForm" :model="releaseForm" label-width="100px">
                <el-col :span="8">
                    <el-form-item label="收款人姓名：">
                        <el-input v-model="releaseForm.name" size="small" placeholder="请输入收款人姓名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="证件号码：">
                        <el-input v-model="releaseForm.name" size="small" placeholder="请输入证件号码"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="收款账号：">
                        <el-input v-model="releaseForm.name" size="small" placeholder="请输入收款账号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
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
                label="订单ID"
                width="150">
                </el-table-column>
                <el-table-column
                prop="name"
                label="用户ID"
                width="120">
                </el-table-column>
                <el-table-column
                prop="province"
                label="收款人姓名"
                width="120">
                </el-table-column>
                <el-table-column
                prop="city"
                label="证件类型"
                width="120">
                </el-table-column>
                <el-table-column
                prop="address"
                label="收款账户"
                width="300">
                </el-table-column>
                <el-table-column
                prop="zip"
                label="开户行"
                width="120">
                </el-table-column>
                <el-table-column
                prop=""
                label="打款金额"
                width="120">
                </el-table-column>
                <el-table-column
                prop=""
                label="交易状态">
                </el-table-column>
                <el-table-column
                prop=""
                label="交易描述">
                </el-table-column>
            </el-table>
        </div>
        <div class="wrap">
            <pagination @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"></pagination>
        </div>
      </div>
    </div>
    <el-dialog
      title="申请交易"
      :visible.sync="dialogVisible"
      width="600px"
      style="text-align: left;"
      :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
        <el-form-item label="任务名称：" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入任务名称" size="small" style="width:318px"></el-input>
        </el-form-item>
        <el-form-item label="下发通道：" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择下发通道" size="small" style="width:318px">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模板文件：" prop="desc">
          <el-button>模板文件下载</el-button>
        </el-form-item>
        <el-form-item label="模板文件：" prop="desc">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
      <el-dialog
      title="审核"
      :visible.sync="dialogVisibled"
      width="600px"
      style="text-align: left;"
      :before-close="handleCloseed">
          <el-form ref="auditForm" :model="auditForm" :rules="auditRules" label-width="140px" class="demo-ruleForm">
         <el-form-item label="审核状态：" prop="audit_status">
              <div class="list">
                <el-select v-model="auditForm.audit_status" style="width:100%" placeholder="请选择"   @change="xuanze">
                  <el-option
                    v-for="item in auditOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </el-form-item>
         <el-form-item label="审核备注：" prop="audit_remark">
              <div class="list">
                <el-input
                  type="textarea"
                  :rows="4"
                  placeholder="请输入内容"
                  resize="none"
                  v-model="auditForm.audit_remark"
                ></el-input>
              </div>
            </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('auditForm')">确定</el-button>
          <el-button @click="resetFormed('auditForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import pagination from '../../components/pagination.vue'

export default {
  data() {
    return {
      releaseType: true,
      fileList:[{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
      dialogVisible: false,
      dialogVisibled:false,
      ruleForm: {
        region: '',
        desc: ''
      },
      ruleForm1:{},
        auditOptions: [
        {
          value: "1",
          label: "审核通过",
        },
        {
          value: "0",
          label: "审核不通过",
        },
      ],
       auditForm: {
        audit_status: "",
        audit_remark: "",
      },
      auditRules: {
        audit_status: [
          { required: true, message: "请选择审核状态", trigger: "change" },
        ],
        audit_remark: [
          { required: true, message: "请填写审核备注", trigger: "blur" },
        ],
      },
      rules: {
        region: [
          { required: true, message: '请选择进度状态', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写进度描述', trigger: 'blur' }
        ]
      },
      releaseForm:{},
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
     xuanze(val) {
      console.log(val, "选择1");
      // this.$refs.auditForm.resetFields();
      if (val == 0) {
        this.auditRules["audit_remark"] = [
          { required: true, message: "请输入审核备注", trigger: "blur" },
        ];
      } else {
        this.auditRules["audit_remark"] = [
          { required: false, message: "请输入审核备注", trigger: "blur" },
        ];
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      console.log(fileList);
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    clickApply() {
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    handleCloseed(){
 this.dialogVisibled = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
        this.dialogVisible = false;
    },
    resetFormed(formName){
    this.$refs[formName].resetFields();
    this.dialogVisibled = false;
    },
    goBack() {
      this.releaseType = true;
    },
    clickRow(val) {
      if (val == 1) {
         this.dialogVisibled = true;
      }else {
        this.releaseType = false;
      }
    },
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
