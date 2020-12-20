import vueTemplateCompiler from 'vue-template-compiler'; import { mapState }
from 'vuex';
<template>
  <div class="mine-container">
    <div class="mine-userinfo" v-if="userInfo">
      <van-cell-group :border="false" class="mine-userinfo-cell-group">
        <van-cell class="mine-userinfo-cell">
          <template #icon>
            <div class="mine-userinfo-avator">
              <van-image
                width="66"
                height="66"
                :src="currentUserInfo.photo"
                fit="cover"
                round
              />
            </div>
          </template>
          <template #title>{{ currentUserInfo.name }} </template>
          <van-button size="small" round class="mine-userinfo-update"
            >编辑资料</van-button
          >
        </van-cell>
      </van-cell-group>
      <van-grid :border="false">
        <van-grid-item class="mine-userinfo-grid">
          <div class="data-count">{{ currentUserInfo.art_count }}</div>
          <div class="data-description">头条</div>
        </van-grid-item>
        <van-grid-item class="mine-userinfo-grid">
          <div class="data-count">{{ currentUserInfo.follow_count }}</div>
          <div class="data-description">关注</div>
        </van-grid-item>
        <van-grid-item class="mine-userinfo-grid">
          <div class="data-count">{{ currentUserInfo.fans_count }}</div>
          <div class="data-description">粉丝</div>
        </van-grid-item>
        <van-grid-item class="mine-userinfo-grid">
          <div class="data-count">{{ currentUserInfo.like_count }}</div>
          <div class="data-description">获赞</div>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="mine-unlogin" v-else>
      <div class="mine-unlogin-wrap">
        <div class="mine-unlogin-avator" @click="$router.push('/login')">
          <img src="./touxiang.png" />
        </div>
        <div class="mine-unlogin-text">登录/注册</div>
      </div>
    </div>
    <div class="mine-browser mb-20">
      <van-grid :column-num="2">
        <!-- <van-grid-item icon-prefix="toutiao" icon="shoucang" text="收藏" /> -->
        <!-- <van-grid-item icon-prefix="toutiao" icon="lishi" text="历史" /> -->
        <van-grid-item>
          <template #icon>
            <i class="toutiao toutiao-shoucang mine-browser-soucang"></i>
          </template>
          <template #text>
            <div class="mine-browser-text">收藏</div>
          </template>
        </van-grid-item>
        <van-grid-item>
          <template #icon>
            <i class="toutiao toutiao-lishi mine-browser-lishi"></i>
          </template>
          <template #text><div class="mine-browser-text">历史</div></template>
        </van-grid-item>
      </van-grid>
    </div>

    <van-cell title="消息通知" is-link to="/" />
    <van-cell title="小智同学" is-link to="/" class="mb-20" />
    <van-cell
      title="退出登录"
      class="logout"
      center
      v-if="userInfo"
      @click="onLogout"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '../../api/user'

export default {
  data() {
    return {
      // 当前用户信息
      currentUserInfo: {}
    }
  },
  created() {
    this.getCurrentUser()
  },
  computed: {
    ...mapState(['userInfo', 'currentUser'])
  },
  methods: {
    // 获取当前登录用户的信息
    async getCurrentUser() {
      // 检测是否含有用户信息
      if (this.currentUser) {
        // 如果有直接渲染
        this.currentUserInfo = this.currentUser
      } else {
        // 如果没有，判断是否含有Token
        if (this.userInfo) {
          // 如果含有，就发送请求
          try {
            const { data } = await getUserInfo()
            this.currentUserInfo = data.data
            // 将用户信息存储到vuex容器中，主要目的是避免登录状态中重复的调用接口
            this.$store.commit('setCurrentUser', data.data)
          } catch (error) {
            console.dir(error)
          }
        }
      }
    },
    // 退出登录
    onLogout() {
      this.$dialog
        .confirm({
          title: '确认退出',
          message: '退出后需要重新登录，确定退出？'
        })
        .then(() => {
          // on confirm
          this.$store.commit('setUserInfo', null)
          this.$store.commit('setCurrentUser', null)
        })
        .catch(() => {
          // on cancel
          this.$toast({
            message: '已取消退出登录',
            position: 'top'
          })
        })
    }
  }
}
</script>

<style lang="less" scoped>
.mine-container {
  .mine-userinfo {
    box-sizing: border-box;
    height: 168px;
    background: url('./banner.png') no-repeat;
    background-size: cover;
    ::v-deep .mine-userinfo-cell-group {
      background-color: unset;
      .mine-userinfo-cell {
        background-color: unset;
        height: 107px;
        padding-top: 34px;
        padding-left: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        .mine-userinfo-avator {
          width: 66px;
          height: 66px;
          border-radius: 50%;
          border: 2px solid #fff;
        }
        .van-cell__title {
          color: #fff;
          margin-left: 13px;
        }
        .mine-userinfo-update {
          height: 16px;
          font-size: 12px;
        }
      }
    }

    .mine-userinfo-grid {
      display: flex;
      flex-direction: column;
      justify-content: center;
      ::v-deep .van-grid-item__content {
        background-color: unset;
      }
      .data-count {
        color: #fff;
        font-size: 14px;
      }
      .data-description {
        color: #fff;
        font-size: 12px;
      }
    }
  }
  .mine-unlogin {
    height: 180px;
    box-sizing: border-box;
    background: url('./banner.png') no-repeat;
    background-size: cover;
    padding-top: 36px;
    .mine-unlogin-wrap {
      height: 144px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mine-unlogin-avator {
        height: 66px;
        width: 66px;
        img {
          width: 100%;
        }
      }
      .mine-unlogin-text {
        font-size: 16px;
        color: #fff;
      }
    }
  }
  .mine-browser {
    box-sizing: border-box;
    height: 70px;
    .mine-browser-soucang {
      color: #eb5253;
      font-size: 24px;
    }
    .mine-browser-lishi {
      color: #ff9d1d;
      font-size: 24px;
    }
    .mine-browser-text {
      font-size: 14px;
    }
  }
  .mb-20 {
    margin-bottom: 20px;
  }
  .logout {
    height: 52px;
    color: #eb5253;
    text-align: center;
  }
}
</style>
