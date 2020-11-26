<template>
  <div class="Login">
    <div class="denglu">
      <span class="yemian">欢迎登录</span>
      <br />
      <span class="yemian"> 薪必果运营管理平台 </span>
      <br><br>
      <div class="henggang"></div>
    </div>
    <div class="dialog">
      <div class="main_right">
        <div class="main">
          <div class="name">
            <img src="https://gsb-zc.oss-cn-beijing.aliyuncs.com//zc_367101606117738511202023154858511logo.png" alt="">
            薪必果</div>
          <div class="input">
            <el-input
              v-model="phone"
              prefix-icon="el-icon-user"
              placeholder="请输入手机号"
              clearable
            ></el-input>
          </div>
          <div class="input">
            <el-input
              placeholder="请输入登录密码"
              prefix-icon="el-icon-lock"
              v-model="password"
              show-password
              @keyup.enter.native="homeSkip"
            ></el-input>
          </div>
          <div class="validation">
            <div class="left">
              <el-input
                prefix-icon="el-icon-document-checked"
                v-model="imgCode"
                placeholder="请输入图形验证码"
              ></el-input>
            </div>
            <div class="right" @click="captchaPost">
              <img :src="ImageArr" alt="" />
            </div>
          </div>
          <div
            :class="
              phone != '' && password != '' && imgCode != ''
                ? 'determine'
                : 'determineNo'
            "
            @click="homeSkip"
            id="btn"
          >
            登&nbsp;&nbsp;录
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/api.js";
import { get, post } from "@/api/index.js";

export default {
  name: "Login",
  data() {
    var imphone = (rule, value, callback) => {
      var type = /^1[345678]\d{9}$/;
      // var type = value.replace(/^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]{8,20}$/i);
      if (!type.test(value)) {
        callback(new Error("请输入正确手机号"));
      } else {
        callback();
      }
    };
    return {
      loginType: true,
      phone: "",
      password: "",
      imgCode: "",
      imgKey: "",
      ImageArr: {},
      rules: {
        phone: [{ validator: imphone, trigger: "blur" }],
        imgCode: [
          { required: true, message: "请输入图形验证码", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    captchaPost() {
      //   图片验证码
      post(api.generate, {
        width: 120,
        textLength: 4,
        height: 48,
      }).then(
        (d) => {
          // console.log(d, "图片");
          if (d.code === 0) {
            this.ImageArr = d.data.img;
            this.imgKey = d.data.imgKey;
          } else {
            return console.log(d.msg);
          }
        },
        (err) => {
          //error callback
        }
      );
    },
    homeSkip() {
      if (this.phone == "") {
        this.$message.error("请输入手机号");
        return;
      }
      var regMoblie = /^1[345678]\d{9}$/;
      if (!regMoblie.test(this.phone)) {
        this.$message.error("该手机号格式错误");
        return;
      }
      if (this.password == "") {
        this.$message.error("请输入登录密码");
        return;
      }
      if (this.imgCode == "") {
        this.$message.error("请输入图形验证码");
        return;
      }
      if (!this.loginType) {
        return
      }
      this.loginType = false;
      post(api.login, {
        imgCode: this.imgCode,
        imgKey: this.imgKey,
        mobile: this.phone,
        password: this.password,
      }).then(
        (d) => {
          //console.log(d, 1);
          this.loginType = true;
          if (d.code == 0) {
            this.$message.success("登录成功");
            // sessionStorage.setItem("esignplatformsid", d.data.loginKey);
            this.$cookies.set("esignplatformsid", d.data.loginKey);
            sessionStorage.setItem("loginPhone", d.data.ucname);
            this.$router.push({ path: "/" });
          } else {
            this.$message.error(d.message);
          }
          //console.log(d);
          //success callback
        },
        (err) => {
          //console.log(err.data.msg);
          //error callback
        }
      );
    },
  },
  components: {},
  updated() {
    //console.log("???");
  },
  created() {},
  mounted() {
    this.captchaPost();
  },
};
</script>

<style lang="less" scoped>
.Login::-webkit-scrollbar {
  width: 0;
}

.Login {
  width: 100%;
  height: 100%;
  background: url("https://gsb-zc.oss-cn-beijing.aliyuncs.com//zc_469101606114648912202023145728912pigntai.jpg")
    no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  position: relative;
  overflow-y: auto;
  .denglu {
    width: 48%;
 position: absolute;
 text-align: left;
 padding-left: 5%;
 padding-top: 3%;
    .yemian {
      font-size: 44px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
    }
    .henggang {
      width: 76px;
      height: 6px;
      background: #ffffff;
    }
  }

  .dialog {
    width: 1200px;
    box-sizing: border-box;
    margin: 0 auto;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .main_right {
      box-sizing: border-box;
      width: 38%;
      height: 40%;
      background: #ffffff;
      box-shadow: 0px 5px 22px 0px rgba(0, 97, 184, 0.65);
      border-radius: 4px;
      min-width: 421px;
      min-height: 385px;
      .main {
        width: 100%;
        padding-top: 30px;
        .name {
          width: 100%;
          height: 100%;
          font-size: 32px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #3F9FFF;
          text-align: center;
          img {
            width: 31px;
            height: 34px;
            vertical-align: middle;
          }
        }
        .laber {
          width: 100%;
          height: 20px;
          font-size: 14px;
          font-family: PingFangSC;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 20px;
          text-align: left;
          margin-top: 25px;
        }
        .input {
          width: 85%;
          margin: 0 auto;
          height: 42px;
          background: #e8f0fe;
          border-radius: 6px;
          border: 1px solid #e0e0e0;
          margin-top: 6%;
          line-height: 42px;
          overflow: hidden;
        }
        .validation {
          width: 85%;
          height: 52px;
          margin: 24px auto;
          .left {
            float: left;
            width: 257px;
            height: 48px;
            line-height: 48px;
            border-radius: 6px;
            border: 1px solid #e0e0e0;
          }
          .right {
            float: right;
            width: 120px;
            height: 48px;
            line-height: 48px;
            text-align: center;
            background: white;
            border-radius: 6px;
            border: 1px solid #e0e0e0;
            font-size: 13px;
            font-family: PingFangSC;
            font-weight: 400;
            color: #999999;
            cursor: pointer;
            div {
              width: 100%;
              height: 100%;
              background-color: #fff;
              cursor: pointer;
            }
          }
          .obtain {
            float: right;
            width: 97px;
            height: 52px;
            line-height: 52px;
            text-align: center;
            background: rgba(245, 245, 245, 1);
            border-radius: 6px;
            border: 1px solid rgba(224, 224, 224, 1);
            font-size: 13px;
            font-family: PingFangSC;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            cursor: pointer;
          }
        }
        .forget {
          width: 100%;
          font-size: 13px;
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(77, 194, 248, 1);
          line-height: 18px;
          text-align: right;
          padding: 11px 13px;
          box-sizing: border-box;
          cursor: pointer;
        }
        .determine {
          width: 85%;
          margin: 0 auto;
          height: 40px;
          background: rgba(121, 176, 250, 1);
          box-shadow: 0px 1px 9px 0px rgba(0, 121, 254, 0.54);
          border-radius: 2px;
          line-height: 40px;
          text-align: center;
          font-size: 16px;
          font-family: PingFangSC;
          font-weight: 400;
          color: #ffffff;
          margin-top: 5%;
          cursor: pointer;
        }
        .determineNo {
          width: 85%;
          margin: 0 auto;
          height: 40px;
          background: rgba(121, 176, 250, 0.5);
          border-radius: 2px;
          line-height: 40px;
          text-align: center;
          font-size: 16px;
          font-family: PingFangSC;
          font-weight: 400;
          color: #ffffff;
          margin-top: 5%;
          cursor: pointer;
        }
      }
    }
  }
}
</style>

<style>
.Login .dialog .el-input > .el-input__inner {
  height: 46px !important;
  line-height: 46px !important;
  border: none !important;
  padding-left: 70px;
}
.Login .dialog2 .el-input > .el-input__inner {
  height: 46px !important;
  line-height: 46px !important;
  border: none !important;
}
.Login .dialog .el-input__icon {
  height: 100% !important;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s !important;
  color: #33aeff !important;
  font-size: 24px !important;
  width: 65px !important;
}
.Login .el-step__head.is-success {
  color: rgba(48, 131, 255, 1);
  border-color: rgba(48, 131, 255, 1);
}
.Login .el-step__title.is-success {
  color: rgba(0, 0, 0, 0.65);
}
.Login .is-process .el-step__icon.is-text {
  background: rgba(48, 131, 255, 1);
  border: none;
  color: #fff;
}
.el-tooltip__popper[x-placement^="right"].is-dark {
  width: 250px !important;
  height: 80px !important;
  background: rgba(255, 255, 255, 1) !important;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15) !important;
  border: 1px solid rgba(235, 238, 245, 1) !important;
  font-size: 14px !important;
  font-family: PingFangSC-Regular, PingFang SC !important;
  font-weight: 400 !important;
  color: rgba(100, 102, 106, 1) !important;
  line-height: 20px !important;
}
.el-tooltip__popper[x-placement^="right"] .popper__arrow {
  border-right-color: rgba(0, 0, 0, 0.15) !important;
}
.el-tooltip__popper[x-placement^="right"] .popper__arrow:after {
  border-right-color: rgba(0, 0, 0, 0.15) !important;
}
</style>
