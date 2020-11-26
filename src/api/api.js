/**
 * 小程序配置文件
 */

// 此处主机域名是腾讯云解决方案分配的域名
// 小程序后台服务解决方案：https://www.qcloud.com/solution/la

/* 本地配置 */
// var host = 'https://xggpc.gongsibao.com'

// var host = 'http://192.168.210.7:8033'
var host = 'http:///192.168.210.244:8033'
if (process.env.NODE_ENV === "development") {
  console.log("开发环境");
  host = 'http:///192.168.210.244:8033'
}else {
  console.log("生产环境")
  host = 'https://xggpc.gongsibao.com'
}

var config = {
  // 用户相关接口
   login: `${host}/bpo-platform/uc/user/login`,
  // 用户列表
  userList: `${host}/bpo-platform/uc/user/info/managePage`,
    // 图片验证
  generate: `${host}/bpo-platform/common/captcha/generate`,
   // 用户详情
   userDetails: `${host}/bpo-platform/uc/user/info/userDetail`,
   // 企业认证管理
   toqueryPage: `${host}/bpo-platform/company/to/queryPage`,
   //审核
   updateCompany: `${host}/bpo-platform/company/to/updateCompany`,
     //查询企业名称
   queryByXBG: `${host}/bpo-platform/company/to/queryByXBG`,
   //查询企业名称确定
   relevance: `${host}/bpo-platform/company/to/relevance`,
   //详情id
   getById: `${host}/bpo-platform/company/to/getById`,
    //删除id
    deleteXBGById: `${host}/bpo-platform/company/to/deleteXBGById`,
   //城市字典查询
  csByParentId: `${host}/bpo-platform/dict/city/byParentId`,
  //  行业字典
  hyByParentId: `${host}/bpo-platform/dict/industry/byParentId`,
  //标签查询
  dict: `${host}/bpo-platform/dict/label/dict`,
  //实名认证管理
  auditPage: `${host}/bpo-platform/uc/user/info/auditPage`,
  //实名认证审核
  audit: `${host}/bpo-platform/uc/user/info/audit`,
   //企业任务管理
   queryPage: `${host}/bpo-platform/company/task/queryPage`,
  //企业任务管理详情
  info: `${host}/bpo-platform/company/task/info`,
    //平台发包
  info4Platform: `${host}/bpo-platform/company/task/info4Platform`,
  //上传图片
  uploadOss: `${host}/bpo-platform/upload/uploadOss`,
  //企业任务管理审核
  aduit: `${host}/bpo-platform/company/task/aduit`,
  // 发布企业任务
  applyCompanyTask: `${host}/bpo-platform/company/task/applyCompanyTask`,
  // 企业名称搜索
  suggest: `${host}/bpo-platform/company/to/suggest`,
  // 平台发包
  platformTaskEdit: `${host}/bpo-platform/platform/task/platformTaskEdit`,
  //平台发包管理
  taskqueryPage: `${host}/bpo-platform/platform/task/queryPage`,
 //平台发包管理详情
 queryDetail: `${host}/bpo-platform/platform/task/queryDetail`,
//签约管理
signqueryPage: `${host}/bpo-platform/uc/user/sign/queryPage`,
//投递人员信息
taskApplyPage: `${host}/bpo-platform/platform/task/apply/taskApplyPage`,
//进度反馈
updateApplyStatus: `${host}/bpo-platform/platform/task/apply/updateApplyStatus`,
//发起签约
signUrl: `${host}/bpo-platform/uc/user/sign/signUrl`,
//查看合同
getByDocId: `${host}/bpo-platform/uc/user/sign/getByDocId`,
 
}

module.exports = config
