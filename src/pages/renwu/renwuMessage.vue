<style lang="less" scoped>
.renwuMessage {
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
  .buttons {
    margin-top: -42px;
    float: right;
  }
}
</style>
<style>
.renwuMessage .el-upload-list--picture-card .el-upload-list__item {
  width: 90px !important;
  height: 90px !important;
}
.renwuMessage .el-upload--picture-card {
  width: 90px !important;
  height: 90px !important;
  line-height: 90px !important;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>


<template>
  <div class="renwuMessage">
    <div class="box" v-show="releaseType">
      <el-row>
          <el-form ref="releaseForm" :model="releaseForm" label-width="120px">
              <el-col :span="8">
                  <el-form-item label="发布人ID：">
                      <el-input v-model="releaseForm.userId" size="small" placeholder="请输入发布人ID"></el-input>
                  </el-form-item>
              </el-col>
                 <!-- <el-col :span="8">
                  <el-form-item label="发布人账号：">
                      <el-input v-model="releaseForm.name" size="small" placeholder="请输入发布人账号"></el-input>
                  </el-form-item>
              </el-col> -->
                <el-col :span="8">
                  <el-form-item label="发布企业：">
                      <el-input v-model="releaseForm.companyName" size="small" placeholder="请输入发布任务的企业名称"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="8">
                  <el-form-item label="审核状态：">
                      <el-select v-model="releaseForm.auditStatus" style="width:100%" placeholder="请选择" size="small">
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
                  <el-form-item label="发布时间：">
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
              <el-col :span="20">
                  <el-form-item label=" ">
                      <el-button type="primary" size="small" @click="search()">搜索</el-button>
                      <el-button size="small" @click="reset()">重置</el-button>
                  </el-form-item>
              </el-col>
                 <el-col :span="24">
                  <div class="main_button">
                      <el-button type="primary" size="small" @click="clickApply()"><i class="el-icon-plus"></i>&nbsp;&nbsp;发布上游任务</el-button>
                  </div>
              </el-col>
            
          </el-form>
      </el-row>
      <div class="wrap">
          <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
              fixed
              prop="userId"
              label="发布人ID"
              :show-overflow-tooltip="true"
            >
              </el-table-column>
              <el-table-column
              fixed
              prop="id"
              label="企业任务ID"
               width="100"
              :show-overflow-tooltip="true"
            >
              </el-table-column>
              <el-table-column
              prop="sender.ucname"
              label="发布人账号"
              width="120"
              :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
              prop="companyInfoDTO.companyName"
              :show-overflow-tooltip="true"
              label="发布企业">
              </el-table-column>
              <el-table-column
              prop="contactMobile"
              :show-overflow-tooltip="true"
              label="联系方式">
              </el-table-column>
              <el-table-column
              prop="taskName"
              label="任务名称"
              :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
              prop="peopleNumber"
              :show-overflow-tooltip="true"
              label="需求人数">
              </el-table-column>
              <el-table-column
              prop="requirementAgeMin"
              :show-overflow-tooltip="true"
              label="年龄要求">
                 <template slot-scope="scope">
              <div>
                <span>{{ scope.row.requirementAgeMin }}-{{scope.row.requirementAgeMax}}</span>
              </div>
            </template>
              </el-table-column>
              <el-table-column
              prop="didian"
                :show-overflow-tooltip="true"
              label="工作地点">
              </el-table-column>
                <el-table-column
              prop="salarySettlement"
                :show-overflow-tooltip="true"
              label="薪资结算">
                <template slot-scope="scope">
              <div>
                <span>{{ scope.row.salarySettlement }}/{{scope.row.salaryUnit}}</span>
              </div>
            </template>
              </el-table-column>
              <el-table-column
            prop="auditStatus"
            label="审核状态"
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
                 prop="releasedAt"
                :show-overflow-tooltip="true"
                label="发布时间">
              </el-table-column>
                 <el-table-column
                 prop="endTime"
                :show-overflow-tooltip="true"
              label="截止时间">
              </el-table-column>
              <el-table-column
              fixed="right"
              label="操作"
              width="200">
              <template slot-scope="scope">
                  <el-button
                  @click="clickRow(2,scope.row)"
                  type="text"
                  size="small">
                  详情
                  </el-button>
                  <el-button
                  @click="clickRow(1,scope.row)"
                  type="text"
                   v-if="scope.row.auditStatus == 1"
                  size="small">
                  审核
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
    <div class="block" v-show="!releaseType">
      <el-page-header @back="goBack" content="查看详情">
      </el-page-header>
      <div class="main">
         <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="基本信息" name="first">
            <el-row>
              <el-col :span="24"><h4>任务信息</h4></el-col>
              <el-col :span="8"><span class="grid-content bg-purple">任务ID：{{invoiceObj.taskNo}}</span></el-col>
              <el-col :span="8" v-if="invoiceObj.companyInfoDTO"><span class="grid-content bg-purple">任务需求方：{{invoiceObj.companyInfoDTO.companyName}}</span></el-col>
              <el-col :span="8"><span class="grid-content bg-purple">联系电话：{{invoiceObj.contactMobile}}</span></el-col>
              <el-col :span="8"><span class="grid-content bg-purple">任务名称：{{invoiceObj.taskName}}</span></el-col>
              <el-col :span="8" v-if="invoiceObj.industryList"><span class="grid-content bg-purple"  v-if="invoiceObj.industryList[0]">所属行业：{{invoiceObj.industryList[0].industryName}}</span></el-col>
              <el-col :span="8"><span class="grid-content bg-purple">需求人数：{{invoiceObj.peopleNumber}}</span></el-col>
              <el-col :span="8" v-if="invoiceObj.cityList"><span class="grid-content bg-purple" v-if="invoiceObj.cityList[0]">任务地点：{{invoiceObj.cityList[0].areaNamePath}}</span></el-col>
              <el-col :span="8"><span class="grid-content bg-purple">工作时间：{{invoiceObj.workTimeBegin}}至{{invoiceObj.workTimeEnd}}</span></el-col>
              <el-col :span="8"><span class="grid-content bg-purple">性别要求：{{invoiceObj.requirementSex | sexresut}}</span></el-col>
              <el-col :span="8"><span class="grid-content bg-purple">学历要求：{{invoiceObj.requirementEducation | xuelistatus}}</span></el-col>
              <el-col :span="8"><span class="grid-content bg-purple">年龄要求：{{invoiceObj.requirementAgeMin}}-{{invoiceObj.requirementAgeMax}}周岁</span></el-col>
              <el-col :span="8"><span class="grid-content bg-purple">薪资结算：{{invoiceObj.salarySettlement}}/{{invoiceObj.salaryUnit}}</span></el-col>
              <el-col :span="8"><span class="grid-content bg-purple">发布时间：{{invoiceObj.releasedAt}}</span></el-col>
              <el-col :span="8"><span class="grid-content bg-purple">截止时间：{{invoiceObj.endTime}}</span></el-col>
              <el-col :span="8" v-if="invoiceObj.companyInfoDTO"><span class="grid-content bg-purple">审核状态：{{invoiceObj.auditStatus | invoice}}</span></el-col>
              <el-col :span="24" v-if="invoiceObj.labelList"><span class="grid-content bg-purple" v-if="invoiceObj.labelList[0]">标签：{{invoiceObj.labelList[0].labelName}}</span></el-col>
              <el-col :span="24"><span class="grid-content bg-purple"><span class="grid-left">任务说明：</span>{{invoiceObj.taskDescribe}}</span></el-col>
              <el-col :span="24"><span class="grid-left">工作环境：</span>
                <div v-for="item in arr" :key="item" @click="detailsImage(item)">
                    <img class="grid-img" :src="item" alt="">
                </div>
              </el-col>
            </el-row>
            <el-row class="footer" v-if="invoiceObj.platformTaskDto">
              <el-col :span="24"><h4>平台发包信息</h4></el-col>
              <el-col :span="8"><span class="grid-content bg-purple">平台发包ID：{{invoiceObj.platformTaskDto.id}}</span></el-col>
              <el-col :span="8"><span class="grid-content bg-purple">发布状态：{{invoiceObj.platformTaskDto.taskStatus | taskstatus}}</span></el-col>
              <el-col :span="8"><span class="grid-content bg-purple">发布方：{{invoiceObj.platformTaskDto.senderName}}</span></el-col>
              <el-col :span="8"><span class="grid-content bg-purple">薪资结算：{{invoiceObj.platformTaskDto.salarySettlement}}/ {{invoiceObj.platformTaskDto.salaryUnit}}</span></el-col>
              <el-col :span="8"><span class="grid-content bg-purple">发布时间：{{invoiceObj.platformTaskDto.releasedAt}}</span></el-col>
              <el-col :span="8"><span class="grid-content bg-purple">截止时间：{{invoiceObj.platformTaskDto.endTime}}</span></el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="投递信息" name="second">
            <div class="wrap">
            <el-table :data="InfotableData" style="width: 100%">
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
                @click="clickRowed(1, scope.row)"
                type="text"
                size="small"
                   v-if="scope.row.applyStatus != 6 && scope.row.signStatus == 0"
              >
                进度反馈
              </el-button>
            <span v-if="scope.row.applyStatus">
                <el-button
                @click="clickRowed(2, scope.row)"
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
          :total="totaled"
          @handleSizeChange="handleSizeChangeed"
          @handleCurrentChange="handleCurrentChangeed"
        ></pagination>
      </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  <el-dialog
      title="审核"
      :visible.sync="dialogVisible"
      width="600px"
      style="text-align: left;"
      :before-close="handleClose">
          <el-form ref="auditForm" :model="auditForm" :rules="auditRules" label-width="140px" class="demo-ruleForm">
         <el-form-item label="审核状态：" prop="auditStatus">
              <div class="list">
                <el-select v-model="auditForm.auditStatus" style="width:100%" placeholder="请选择"   @change="xuanze">
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
          <el-button type="primary" @click="submitForm2('auditForm')">确定</el-button>
          <el-button @click="resetForm('auditForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
       <!-- 发布任务 -->
    <el-dialog
      title="发布任务"
      :visible.sync="dialogVisible4"
      width="900px"
      :before-close="handleClose4">
      <el-form :model="taskForm" :rules="taskRules" ref="taskForm" label-width="150px" class="demo-ruleForm">
        <el-form-item label="企业名称：" prop="name">
          <!-- <el-input v-model="taskForm.name" placeholder="请输入" size="small"  style="width:500px"></el-input> -->
          <el-autocomplete
          style="width:500px"
          size="small"
          v-model="taskForm.name"
          :fetch-suggestions="querySearch"
          placeholder="请输入企业名称"
          :trigger-on-focus="false"
          @select="handleSelect"
        ></el-autocomplete>
        </el-form-item>
        <el-form-item label="企业ID：" prop="companyId">
          <el-input v-model="taskForm.companyId" placeholder="请输入" size="small" :disabled="true" style="width:500px"></el-input>
        </el-form-item>
        <el-form-item label="任务名称：" prop="taskName">
          <el-input v-model="taskForm.taskName" placeholder="请输入" size="small"  style="width:500px"></el-input>
        </el-form-item>
        <el-form-item label="所属行业：">
           <el-button type="primary" icon="el-icon-search" @click="hangyeBtn(1)">请点击选择行业</el-button>
           <div>
             <el-tag
            :key="key"
            v-for="(item,key) in hayeData"
            closable
            :disable-transitions="false"
            @close="handleCloseRen1(key)">
            {{item.industryName}}
          </el-tag>
           </div>
        </el-form-item>
        <el-form-item label="需求人数：" prop="peopleNumber">
          <el-input v-model="taskForm.peopleNumber" placeholder="请输入" type="number" size="small" style="width:500px"></el-input>
        </el-form-item>
        <el-form-item label="任务地点：">
          <el-button type="primary" icon="el-icon-search" @click="hangyeBtn(2)">请点击选择区域</el-button>
         <div>
             <el-tag
            :key="key"
            v-for="(item,key) in diquData"
            closable
            :disable-transitions="false"
            @close="handleCloseRen(key)">
            {{item.areaName}}
          </el-tag>
           </div>
        </el-form-item>
        <el-form-item label="工作时间：" prop="workTimeArr">
          <!-- <el-input v-model="taskForm.workTimeBegin" placeholder="请输入" size="small"  style="width:500px"></el-input> -->
          <el-date-picker
          style="width:500px"
          size="small"
          v-model="taskForm.workTimeArr"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd">
        </el-date-picker>
        </el-form-item>
        <el-form-item label="性别要求：" prop="requirementSex">
          <el-select v-model="taskForm.requirementSex" placeholder="请选择性别要求" size="small"  style="width:500px">
            <el-option label="男" value="male"></el-option>
            <el-option label="女" value="female"></el-option>
            <el-option label="不限" value="unlimited"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学历要求：" prop="requirementEducation">
          <el-select v-model="taskForm.requirementEducation" placeholder="请选择学历要求" size="small"  style="width:500px">
            <el-option label="学历不限" value="10"></el-option>
            <el-option label="初中" value="20"></el-option>
            <el-option label="高中" value="30"></el-option>
            <el-option label="专科" value="40"></el-option>
            <el-option label="本科" value="50"></el-option>
            <el-option label="硕士" value="60"></el-option>
            <el-option label="博士" value="70"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄要求：" prop="requirementAgeMin">
          <el-input v-model="taskForm.requirementAgeMin" placeholder="请输入最小年龄要求" type="number" size="small"  style="width:240px"></el-input>
          -
          <el-input v-model="taskForm.requirementAgeMax" placeholder="请输入最大年龄要求" type="number" size="small"  style="width:240px"></el-input>
        </el-form-item>
        <el-form-item label="截止日期：" prop="endTime">
          <el-date-picker
            size="small"
            style="width:500px"
            v-model="taskForm.endTime"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="任务说明：" prop="taskDescribe">
          <el-input type="textarea"  style="width:500px" v-model="taskForm.taskDescribe" placeholder="请输入任务说明" size="small"></el-input>
        </el-form-item>
        <el-form-item label="工作场景照片：">
         <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="myHeaders"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeUpload"
                  :auto-upload="true"
                  :multiple="true"
                  :file-list="file"
                   list-type="picture-card"
                >
                   <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                          <img
                            class="el-upload-list__item-thumbnail"
                            :src="file.url" alt=""
                          >
                          <span class="el-upload-list__item-actions">
                            <span
                              class="el-upload-list__item-preview"
                              @click="handlePictureCardPreview(file)"
                            >
                              <i class="iconfont icon-yanjing"></i>
                            </span>
                            <span class="logo" @click.stop="handleRemove(file)">
                            <i class="el-icon-delete"></i>
                          </span>
                          </span>
                        </div>
                </el-upload>
        </el-form-item>
        <el-form-item label="联系方式：" prop="contactMobile">
          <el-input v-model="taskForm.contactMobile" placeholder="请输入" size="small"  style="width:500px"></el-input>
        </el-form-item>
        <!-- labelList -->
        <el-form-item label="标签：" prop="labelArr">
           <el-select
              style="width:500px"
              size="small"
              v-model="taskForm.labelArr"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="请选择标签">
              <el-option
                v-for="item in biaoOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="薪资明细：" prop="salarySettlement">
          <el-input v-model="taskForm.salarySettlement" placeholder="请输入薪资明细" size="small" type="number" style="width:500px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFormed('taskForm')">确定</el-button>
          <el-button @click="resetFormed('taskForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
     <el-dialog
      title="进度反馈"
      :visible.sync="dialogVisibleed"
      width="600px"
      :before-close="handleClose2">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
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
          <el-input type="textarea" style="width:318px" v-model="ruleForm.applyNotes" placeholder="请输入进度描述" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFormJin('ruleForm')">确定</el-button>
          <el-button @click="resetFormJin('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 发起签约 -->
    <el-dialog
      title="发起签约"
      :visible.sync="dialogVisible1ed"
      width="600px"
      :before-close="handleClose3">
      <el-form :model="taskFormed" ref="taskFormed"  :rules="taskRulesed" label-width="150px" class="demo-ruleForm">
        <el-alert
          title="请选择签约截止时间，超过签约截止时间，还未完成签约，即签约过期，无法签署"
          type="warning"
          :closable="false"
          show-icon>
        </el-alert>
        <el-form-item label="签约截止时间：" prop="signEndTime">
          <el-date-picker
          style="width:318px;"
            v-model="taskFormed.signEndTime"
            type="datetime"
            placeholder="选择日期时间"
             format="yyyy 年 MM 月 dd 日 HH 时 mm 分 ss 秒"
             value-format="yyyy-MM-dd HH:mm:ss"
            >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFormFa('taskFormed')">确定</el-button>
          <el-button @click="resetFormFa('taskFormed')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
      <el-dialog :visible.sync="dialogVisibleImg" width="600px">
        <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>   
    <!-- 请确认或取消您的选择 -->
    <el-dialog
      title="请确认或取消您的选择"
      :visible.sync="dialogRenWu"
      width="600px"
      :before-close="handleCloseWu">
        <div class="buttons">
          <el-button @click="resetChecked()">添加</el-button>
        </div>
        <el-tree
            :data="Rendata"
            show-checkbox
            stripe
            :load="loadResolve"
            :lazy="true"
            node-key="areaId"
            ref="tree"
            @check="handleCheck"
            highlight-current
            :props="defaultProps"
            >
        </el-tree>              
    </el-dialog>
    <el-dialog
      title="请确认或取消您的选择"
      :visible.sync="dialogRenWu1"
      width="600px"
      :before-close="handleCloseWu">
        <div class="buttons">
          <el-button @click="resetChecked1()">添加</el-button>
        </div>
        <el-tree
            :data="Inddata"
            show-checkbox
            stripe
            :load="loadResolve1"
            :lazy="true"
            node-key="industryId"
            ref="tree1"
            @check="handleCheck"
            highlight-current
            :props="defaultProps1"
            >
        </el-tree>              
    </el-dialog>
            <!-- 图片查看 -->
    <el-dialog title="图片查看" :visible.sync="dialogImg" width="50%" :before-close="handleCloseImg">
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
      imageUrl: "",
       //工作环境
      arr: [],
      newArr:[],
      myHeaders: {Authorization: this.$cookies.get('esignplatformsid') },
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
      dialogRenWu: false,
      dialogRenWu1: false,
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisibleed: false,
      dialogVisible1ed: false,
      dialogVisibleImg: false,
      dialogImageUrl: "",
      dialogVisible4: false,
      activeName: "first",
      releaseType: true,
      diquData: [],
      hayeData:[],
      biaoOptions: [],
      Rendata: [],
      Inddata:[],
      invoiceObj:{},
      //城市
      didian: "",
     infoBoxStatusColor: {
        1: "#3083FF",
        2: "#52C41A",
        3: "#F5222D",
      },
      pageSzie: 10,
      total: null,
      totaled: null,
      defaultProps: {
        children: "children",
        label: "areaName",
        id: 'areaId'
      },
      defaultProps1:{
        children: "children",
        label: "industryName",
        id: 'industryId'
      },
      data: {
        d: {},
        action:""
      },
      uploadUrl:api.uploadOss,
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
      taskForm: {
        labelArr: []
      },
      taskRules: {
        contactMobile: [
          { required: true, message: "请输入联系方式", trigger: "blur" },
        ],
        workTimeArr: [
          { required: true, message: "请选择工作时间", trigger: "change" },
        ],
        peopleNumber: [
          { required: true, message: "请输入需求人数", trigger: "blur" },
        ],
        endTime: [
          { required: true, message: "请选择截止时间", trigger: "change" },
        ],
        requirementEducation: [
          { required: true, message: "请选择学历要求", trigger: "change" },
        ],
        requirementSex: [
          { required: true, message: "请选择性别要求", trigger: "change" },
        ],
        taskName: [
          { required: true, message: "请输入任务名称", trigger: "blur" },
        ],
        salarySettlement: [
          { required: true, message: "请输入薪资明细", trigger: "blur" },
        ],
        labelArr: [
          { required: true, message: "请选择标签", trigger: "blur" },
        ],
        taskDescribe: [
          { required: true, message: "请输入任务说明", trigger: "blur" },
        ],
        requirementAgeMin: [
          { required: true, message: "请输入年龄要求", trigger: "blur" },
        ],
        name: [
          { required: true, message: "请输入企业名称", trigger: "blur" },
        ],
        companyId: [
          { required: true, message: "请输入企业id", trigger: "blur" },
        ]
      },
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
      auditForm: {
        auditStatus: "",
        auditNotes: "",
        id:""
      },
      auditRules: {
        auditStatus: [
          { required: true, message: "请选择审核状态", trigger: "blur" },
        ],
        auditNotes: [
          { required: true, message: "请填写审核备注", trigger: "blur" },
        ],
      },
      taskFormed: {
        signEndTime: "",
        companyId: 0,
        platformTaskApplyId: 0,
        userId:0
      },
      taskRulesed: {
        signEndTime: [{ required: true, message: "请输入签约截止时间", trigger: "blur" }],
      },
      releaseForm: {
        auditStatus:"",
        companyName:"",
        userId:"",
         createDate: ["", ""],
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
          label: "审核未通过",
        },
      ],
      InfotableData:[],
      tableData: [],
      nodeIndex: null,
      nodeKey: null,
      dialogImg: false,
      imageDetails: "",
      imgArr: [],
      file: []
    };
  },
  mounted() {
    this.queryPageData();
    // console.log(this.activeName,'dhdhdhdh')
  },
  created() {
    // this.getUploadConfig();
    this.dictBtn();
  },
  methods: {
    querySearch(queryString, cb) {
      console.log(queryString)
      post(api.suggest, {
        companyName: queryString
      }).then(
        (d) => {
          if (d.code === 0) {
            let dataArr = [];
            for (let i = 0; i < d.data.length; i++) {
              let obj = { "value": d.data[i].companyName, "address": d.data[i].id };
              dataArr.push(obj)
            }
            cb(dataArr);
          } else {
            console.log(d.message);
          }
        },
        (err) => {
          //error callback
        })
      
    },
    handleSelect(item) {
      // console.log(item);
      this.taskForm.companyId = item.address;
    },
    handleCloseImg(){
    this.dialogImg =false;
    },
        detailsImage(src) {
      if (src) {
        this.imageDetails = src;
        this.dialogImg = true;
      }
    },
    queryPageData(size) {
      const loading = this.$loading({
        lock: true,
        spinner: "loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      post(api.queryPage, {
        currentPage: size || 1,
        pageSize: this.pageSzie,
        auditStatus: this.releaseForm.auditStatus,
        userId: parseInt(this.releaseForm.userId),
        companyName: this.releaseForm.companyName,
         releasedAtStartTime: this.releaseForm.createDate[0],
        releasedAtEndTime: this.releaseForm.createDate[1],
      }).then(
        (d) => {
          loading.close();
          if (d.code === 0) {
            console.log(d, "!!!!!!!!!!!!");
            this.total = d.data.count;
            for (let index = 0; index < d.data.rows.length; index++) {
              const element = d.data.rows[index];
            if (element.cityList.length > 0) {
              element.didian = element.cityList[0].areaNamePath
            }else{
              element.didian = "";
            }
            }
            // console.log( d.data.rows,'88888')
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
    handleCloseRen1 (key) {
      this.hayeData.splice(key,1);
    },
    handleCloseRen(key) {
      this.diquData.splice(key, 1);
    },
    resetChecked1() {
      let res = this.$refs.tree1.getCheckedNodes()
      this.hayeData = res;
      this.dialogRenWu1 = false;
    },
    resetChecked() {
      let res = this.$refs.tree.getCheckedNodes()
      // console.log(res, "66666");
      this.diquData = res;
      this.dialogRenWu = false;
    },
    hangyeBtn(val) {
      // console.log(val, "55555");
      //1 行业 2 区域
      if (val == 1) {
        post(api.hyByParentId, {
          parentId: "0",
        }).then(
          (d) => {
            if (d.code === 0) {
              
              for (let i = 0; i < d.data.length; i++) {
                d.data[i]['children'] = []
              }
              this.Inddata = d.data;
              console.log(this.Inddata,'完成')
              this.dialogRenWu1 = true;
            } else {
              this.$message.error(d.message);
            }
          },
          (err) => {
            //error callback
          }
        );
      } else {
        // this.Rendata = [];
        post(api.csByParentId, {
          parentId: "0",
        }).then(
          (d) => {
            if (d.code === 0) {
              // console.log(d, "6666");
              
              this.Rendata = d.data;
              console.log(this.Rendata,'完成')
              this.dialogRenWu = true;
            } else {
              this.$message.error(d.message);
            }
          },
          (err) => {
            //error callback
          }
        );
      }
    },
    loadResolve1(node,resolve) {
      // console.log(node,resolve)
      // console.log(node.level);
      let data = node.data;
      console.log(data);
      if (node.level === 0) {
       return resolve(this.Inddata);
      }else {
        console.log(this.$refs.tree1.getNode(data),'行业');
        let parent = this.$refs.tree1.getNode(data).parent.parent;
        let index = null;
        let key = null;
        let i = null;
        if (parent) {
          if (parent.parent) {
            i = this.Inddata[this.nodeIndex].children[this.nodeKey].children.findIndex(fruit => fruit.industryId === data.industryId);
          }else {
            key = this.Inddata[this.nodeIndex].children.findIndex(fruit => fruit.industryId === data.industryId);
            this.nodeKey = key;
          }
        }else{
          index = this.Inddata.findIndex(fruit => fruit.industryId === data.industryId);
          this.nodeIndex = index;
        }
        if (data.children.length != 0) {
          return
        }
        post(api.hyByParentId, {
          parentId: data.industryId,
        }).then(
          (d) => {
            if (d.code === 0) {
              if (d.data.length == 0) {
                return resolve([]);
              }
              if (parent) {
                if(parent.parent) {
                  this.Inddata[this.nodeIndex].children[this.nodeKey].children[i].children = d.data;
                }else {
                  this.Inddata[this.nodeIndex].children[key].children = d.data;
                }
              }else {
                this.Inddata[index].children = d.data;
              }
              resolve(d.data);
              // console.log( this.Inddata,'55555');
              this.$forceUpdate()
            } else {
              this.$message.error(d.message);
            }
          },
          (err) => {
            //error callback
          }
        );
      }
    },
    loadResolve(node,resolve) {
      // console.log(node,resolve)
      // console.log(node.level);
      let data = node.data;
      console.log(data);
      if (node.level === 0) {
       return resolve(this.Rendata);
      }else {
        console.log(this.$refs.tree.getNode(data),'行业');
        let parent = this.$refs.tree.getNode(data).parent.parent;
        let index = null;
        let key = null;
        let i = null;
        if (parent) {
          if (parent.parent) {
            i = this.Rendata[this.nodeIndex].children[this.nodeKey].children.findIndex(fruit => fruit.areaId === data.areaId);
          }else {
            key = this.Rendata[this.nodeIndex].children.findIndex(fruit => fruit.areaId === data.areaId);
            this.nodeKey = key;
          }
        }else{
          index = this.Rendata.findIndex(fruit => fruit.areaId === data.areaId);
          this.nodeIndex = index;
        }
        if (data.children.length != 0) {
          return
        }
        post(api.csByParentId, {
          parentId: data.areaId,
        }).then(
          (d) => {
            if (d.code === 0) {
              if (d.data.length == 0) {
                return resolve([]);
              }
              if (parent) {
                if(parent.parent) {
                  this.Rendata[this.nodeIndex].children[this.nodeKey].children[i].children = d.data;
                }else {
                  this.Rendata[this.nodeIndex].children[key].children = d.data;
                }
              }else {
                this.Rendata[index].children = d.data;
              }
              resolve(d.data);
              // console.log( this.Rendata,'55555');
              this.$forceUpdate()
            } else {
              this.$message.error(d.message);
            }
          },
          (err) => {
            //error callback
          }
        );
      }
    },
    handleCheck(data){
      // console.log(data)
      // let arr = this.$refs.tree.getCheckedKeys()
      // console.log(arr)
      // console.log(this.$refs.tree.store);
      // this.$refs.tree.store.nodesMap[data.areaId].expanded = true;
      // data.unfold = true;
    },
    handleCloseWu(done) {
      done();
      // this.dialogRenWu = false;
    },
    getUploadConfig() {
      that.data.action = api.uploadOss;
    },
    beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPng = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG && !isPng) {
          this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return (isJPG || isPng) && isLt2M;
    },
    handleAvatarSuccess(res, file, files, key, val) {
      console.log(res.data,'44444');
      this.file = files;
      this.imgArr.push(res.data);
      // this.taskForm.workspace = this.imgArr.join(',')
      console.log(this.imgArr, "上传成功");
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisibleImg = true;
    },
    handleRemove(file) {
      console.log(file, "4444");
      let index = this.imgArr.findIndex(fruit => fruit === file.response.data);
      this.file.splice(index, 1);
      this.imgArr.splice(index, 1);
      console.log(this.imgArr, "5555");
    },
    dictBtn() {
      post(api.dict).then(
        (d) => {
          if (d.code === 0) {
            for (let i = 0; i < d.data.length; i++) {
              var obj = {
                label: d.data[i].labelName,
                value: d.data[i].id,
              };
              this.biaoOptions.push(obj);
              // console.log( this.biaoOptions,'44444')
            }
          } else {
            this.$message.error(d.message);
          }
        },
        (err) => {
          //error callback
        }
      );
    },
    clickApply() {
      this.dialogVisible4 = true;
    },
    clickRowed(val,row) {
      //1进度反馈2发起签约
      if (val == 1) {
          this.ruleForm = {
          applyStatus: "",
          applyNotes: "",
          id: row.id,
        },
       this.dialogVisibleed = true;
      } else if (val == 2) {
          this.taskFormed ={
          companyId:row.companyId,
          platformTaskApplyId:row.id,
          userId:row.applyUserId,
          signEndTime:""
        }
        this.dialogVisible1ed = true;
      }
    },
    handleClick(val) {
      console.log(val.name,'11111111')
      if(val.name == "second"){
       this.touPageDataed();
      }
    },
   touPageDataed(size) {
      const loading = this.$loading({
        lock: true,
        spinner: "loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      post(api.taskApplyPage, {
        currentPage: size || 1,
        pageSize: this.pageSzie,
        companyTaskId: parseInt(this.invoiceObj.id),
      }).then(
        (d) => {
          loading.close();
          if (d.code === 0) {
            console.log(d, "!!!!!!!!!!!!");
            this.totaled = d.data.count;
            this.InfotableData = d.data.rows;
          } else {
            console.log(d.message);
          }
        },
        (err) => {
          //error callback
        }
      );
    },

    handleClose() {
      this.dialogVisible = false;
    },
    handleClose4() {
      this.dialogVisible4 = false;
    },

    handleClose2() {
      this.dialogVisibleed = false;
    },
    handleClose3() {
      this.dialogVisible1ed = false;
    },

    xuanze(val) {
      console.log(val, "选择1");
      // this.$refs.auditForm.resetFields();
      if (val == 2) {
        this.auditRules["auditNotes"] = [
          { required: false, message: "请输入审核备注", trigger: "blur" },
        ];
      } else  if (val == 3) {
        this.auditRules["auditNotes"] = [
          { required: true, message: "请输入审核备注", trigger: "blur" },
        ];
      }
    },
    // 取消
    resetForm(formName) {
      console.log("0111");
      this.$refs[formName].resetFields();
      this.dialogVisible = false;
    },
    resetFormed(formName) {
      console.log("0111");
      this.$refs[formName].resetFields();
      this.dialogVisible4 = false;
    },
        submitFormJin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          post(api.updateApplyStatus, this.ruleForm).then(
            (d) => {
              if (d.code === 0) {
                this.$refs[formName].resetFields();
                this.dialogVisibleed = false;
                this.touPageDataed();
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
      this.dialogVisibleed = false;
    },
     submitFormFa(formName) {
        this.$refs[formName].validate((valid) => {
        if (valid) {
          post(api.signUrl, this.taskFormed).then(
            (d) => {
              if (d.code === 0) {
                this.$refs[formName].resetFields();
                this.dialogVisible1ed = false;
                this.touPageDataed();
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
       resetFormFa(formName) {
      this.$refs[formName].resetFields();
        this.dialogVisible1ed = false;
    },
    submitForm2(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          post(api.aduit, this.auditForm).then(
            d => {
              if (d.code === 0) {
                this.queryPageData();
                this.dialogVisible = false
              }else{
                this.$message.error(d.message);
              }
            },
            err => {
              //error callback
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitFormed(formName) {
      console.log(this.taskForm);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.hayeData.length == 0 || this.diquData.length == 0 || this.imgArr.length == 0) {
            return this.$message.error('必填项不能为空');
          }
          this.taskForm['industryList'] = [];
          this.taskForm['cityList'] = [];
          this.taskForm['labelList'] = [];
          for (let i = 0; i < this.hayeData.length; i++) {
            let obj = {
              industryId: this.hayeData[i].industryId
            }
            this.taskForm.industryList.push(obj)
          }
          for (let j = 0; j < this.diquData.length; j++) {
            let obj = {
              areaId: this.diquData[j].areaId
            }
            this.taskForm.cityList.push(obj)
          }
          for (let k = 0; k < this.taskForm.labelArr.length; k++) {
            let obj = {
              labelId: this.taskForm.labelArr[k]
            }
            this.taskForm.labelList.push(obj)
          }
          this.taskForm['workTimeBegin'] = this.taskForm.workTimeArr[0];
          this.taskForm['workTimeEnd'] = this.taskForm.workTimeArr[1];
          this.taskForm['workspace'] = this.imgArr.join(',');
          this.taskForm['header'] = 'application/json'
          post(api.applyCompanyTask, this.taskForm).then(
            d => {
              if (d.code === 0) {
                this.queryPageData();
                this.dialogVisible4 = false
              }else{
                this.$message.error(d.message);
              }
            },
            err => {
              //error callback
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    clickRow(val,row) {
      console.log(row,'4444')
      //1审核 2 详情
      if (val == 1) {
          this.auditForm={
            auditNotes: "",
            auditStatus: "",
            id:row.id
          },
        this.dialogVisible = true;
      } else {
        post(api.info, {
          companyTaskId:row.id
        }).then(
          d => {
            if (d.code === 0) {
              this.releaseType = false;
              // console.log(d.data.workspace,'工作环境照片')
             if (d.data.workspace != undefined) {
                this.arr = d.data.workspace.split(",")
                // console.log(this.arr,'7777')
                // this.newArr = [...new Set(this.arr)]; 
              }else{
                this.arr = [];
                // this.newArr = [];
              }
              // console.log(this.newArr,'55555')
                this.invoiceObj = d.data;
                this.touPageDataed();
            }else{
              this.$message.error(d.message);
            }
          },
          err => {
            //error callback
          }
        );
      
      }
    },
    goBack() {
      this.releaseType = true;
    },
    search() {
      this.queryPageData();
    },
    reset() {
    this.releaseForm={
        auditStatus:"",
        companyName:"",
        userId:"",
        createDate: ["", ""],
      }
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
    handleSizeChangeed(val) {
      this.pageSzie = val;
      console.log(`每页 ${val} 条aaaaa`);
      this.touPageDataed();
    },
    handleCurrentChangeed(size) {
      console.log(size);
      this.touPageDataed(size);
    },
  },
  components: {
    pagination: pagination,
  },
};
</script>
