import { Form } from 'vant';
<template>
  <div class="login">
    <!-- 头部导航栏 -->
    <van-nav-bar
      title="注册/登录"
      class="login-nav-bar"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 注册/登录表单 -->
    <van-form
      :show-error="false"
      :show-error-message="false"
      validate-first
      @failed="onFailed"
      @submit="onSubmit"
      ref="login-form"
    >
      <van-field
        v-model="user.mobile"
        left-icon="phone-o"
        placeholder="输入手机号"
        maxlength="11"
        name="mobile"
        clearable
        required
        :rules="formRules.mobileRule"
      />
      <van-field
        v-model="user.code"
        left-icon="envelop-o"
        placeholder="输入验证码"
        maxlength="6"
        name="code"
        clearable
        required
        :rules="formRules.codeRule"
      >
        <template #button>
          <van-count-down
            :time="time"
            v-if="isCountDown"
            format="ss s"
            @finish="onFinished"
          />
          <van-button
            v-else
            size="small"
            type="primary"
            @click.prevent="onSendSms"
            :loading="isSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>

      <!-- 登录按钮 -->
      <div class="login-btn-container">
        <van-button
          type="info"
          block
          class="login-btn"
          native-type="submit"
          @click="onSubmit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, getSms } from '../../api/user'

export default {
  data() {
    return {
      user: {
        mobile: '17090086870',
        code: '246810'
      },
      formRules: {
        mobileRule: [
          { required: true, message: '请输入手机号' },
          {
            pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|17[0-9]|18[0|1|2|3|5|6|7|8|9])|19[0-9]\d{8}$/,
            message: '请输入有效的手机号'
          }
        ],
        codeRule: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '请输入有效的验证码' }
        ]
      },
      // 是否禁用按钮
      isSendSms: false,
      // 是否显示倒计时
      isCountDown: false,
      time: 1000 * 60
    }
  },
  methods: {
    // 表单验证成功后 -> 登录
    async onSubmit() {
      this.$toast.loading({
        message: '登陆中...',
        forbidClick: true,
        duraton: 0
      })
      try {
        const res = await login(this.user)
        this.$toast.success('登录成功')
        // 将用户信息存储到vuex中
        this.$store.commit('setUserInfo', res.data.data)
        // 跳转回去
        this.$router.back()
      } catch (error) {
        console.dir(error)
        this.$toast.fail('登录失败,手机号或验证码错误')
      }
    },
    // 发送短信
    async onSendSms() {
      try {
        // 验证号码是否有效
        await this.$refs['login-form'].validate('mobile')
        // 显示加载状态，防止用户网络慢时一直点击发送按钮
        this.isSendSms = true
        // 发送验证码
        await getSms(this.user.mobile)
        // 显示倒计时
        this.isCountDown = true
        // 处理结果
      } catch (err) {
        let message = ''
        if (err && err.response && err.response.status === 429) {
          message = '操作频繁，请稍后重试'
        } else if (err.name === 'mobile') {
          message = err.message
        } else {
          message = '请稍后重试'
        }
        this.$toast({
          message,
          position: 'top'
        })
      }
      this.isSendSms = false
    },
    // 表单验证失败
    onFailed(err) {
      if (err.errors[0]) {
        this.$toast({
          message: err.errors[0].message,
          position: 'top'
        })
      }
    },
    onFinished() {
      // 倒计时到0时不显示倒计时
      this.isCountDown = false
    }
  }
}
</script>

<style lang="less" scoped>
.login-btn-container {
  padding: 26px 16px;
  .login-btn {
    background-color: #6db4fb;
    border: none;
    border-radius: 5px;
    .van-button__text {
      font-size: 15px;
    }
  }
}
</style>
