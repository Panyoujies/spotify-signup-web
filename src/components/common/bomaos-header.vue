<template>
  <div class="container bomao-header">
    <router-link class="bomao-logo" to="/" style="letter-spacing: 0.2px;">
      <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
        <path d="M814.08 455.68C650.24 358.4 376.32 348.16 220.16 396.8c-25.6 7.68-51.2-7.68-58.88-30.72-7.68-25.6 7.68-51.2 30.72-58.88 181.76-53.76 481.28-43.52 670.72 69.12 23.04 12.8 30.72 43.52 17.92 66.56-12.8 17.92-43.52 25.6-66.56 12.8m-5.12 143.36c-12.8 17.92-35.84 25.6-53.76 12.8-138.24-84.48-348.16-110.08-509.44-58.88-20.48 5.12-43.52-5.12-48.64-25.6-5.12-20.48 5.12-43.52 25.6-48.64 186.88-56.32 417.28-28.16 576 69.12 15.36 7.68 23.04 33.28 10.24 51.2m-61.44 140.8c-10.24 15.36-28.16 20.48-43.52 10.24-120.32-74.24-271.36-89.6-450.56-48.64-17.92 5.12-33.28-7.68-38.4-23.04-5.12-17.92 7.68-33.28 23.04-38.4 194.56-43.52 363.52-25.6 496.64 56.32 17.92 7.68 20.48 28.16 12.8 43.52M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S796.16 0 512 0" fill="#31c27c"></path>
      </svg>
      <span>Spotify注册</span>
    </router-link>
    <div v-if="!isMobile" style="line-height: 66px; display: flex; align-items: center;">
      <div class="bomaos-nav">
        <div class="bomaos-nav-item">
          <router-link to="/" active-class="bomaos-this">Spotify注册</router-link>
        </div>
        <n-divider vertical />
        <div class="bomaos-nav-item">
          <router-link to="/password-reset" active-class="bomaos-this">修改密码</router-link>
        </div>
        <n-divider vertical />
        <div class="bomaos-nav-item">
          <router-link to="/unlock" active-class="bomaos-this">解锁14天</router-link>
        </div>
        <n-divider vertical />
        <div class="bomaos-nav-item">
          <router-link to="/article" active-class="bomaos-this">文章教程</router-link>
        </div>
        <n-divider vertical />
        <div class="bomaos-nav-item">
          <router-link to="/store" active-class="bomaos-this" style="display: flex; align-items: center;">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
              <path d="M853.333333 298.666667h-128A213.333333 213.333333 0 0 0 298.666667 298.666667H170.666667a42.666667 42.666667 0 0 0-42.666667 42.666666v512a85.333333 85.333333 0 0 0 85.333333 85.333334h597.333334a85.333333 85.333333 0 0 0 85.333333-85.333334V341.333333a42.666667 42.666667 0 0 0-42.666667-42.666666zM384 448a21.333333 21.333333 0 0 1-21.333333 21.333333h-42.666667a21.333333 21.333333 0 0 1-21.333333-21.333333v-42.666667a21.333333 21.333333 0 0 1 21.333333-21.333333h42.666667a21.333333 21.333333 0 0 1 21.333333 21.333333v42.666667zM512 170.666667a128 128 0 0 1 128 128H384a128 128 0 0 1 128-128z m213.333333 277.333333a21.333333 21.333333 0 0 1-21.333333 21.333333h-42.666667a21.333333 21.333333 0 0 1-21.333333-21.333333v-42.666667a21.333333 21.333333 0 0 1 21.333333-21.333333h42.666667a21.333333 21.333333 0 0 1 21.333333 21.333333v42.666667z" fill="currentColor"></path>
            </svg>
            <span style="margin-left: 5px">小微商店</span>
          </router-link>
        </div>
        <n-divider vertical />
        <div class="bomaos-avatar">
          <div v-if="loginUser">
            <router-link to="/user">
              <a-avatar
                  v-if="loginUser.avatar"
                  :src="loginUser.avatar"
              />
              <a-avatar v-else src="/assets/user-avatar.jpg"/>
            </router-link>
          </div>
          <router-link v-else to="/user">
            <a-tooltip placement="bottomRight" v-model:open="showTooltip" >
              <template #title>
                <span>登录解锁全部功能</span>
              </template>
              <a-avatar>
                <template #icon><UserOutlined /></template>
              </a-avatar>
            </a-tooltip>
          </router-link>
        </div>
      </div>
    </div>
    <div v-if="isMobile" style="line-height: 66px; display: flex; align-items: center;">
      <a-tooltip placement="bottomRight" v-model:open="showTooltip" >
        <template #title>
          <span>登录解锁全部功能</span>
        </template>
        <div class="author" @click="showDrawer">
          <a-avatar :size="35" :src="loginUser?.avatar ? loginUser.avatar : '/assets/user-avatar.jpg'">
            <template #icon><UserOutlined /></template>
          </a-avatar>
          <svg style="margin-left: 2px" viewBox="0 0 230 1024" xmlns="http://www.w3.org/2000/svg" width="10" height="30">
            <path stroke="null" id="svg_1" fill="#444444" d="m129.12494,151.91668l96.75003,0l0,126.89706l-96.75003,0l0,-126.89706zm0,296.09314l96.75003,0l0,126.89706l-96.75003,0l0,-126.89706zm0,296.09314l96.75003,0l0,126.89706l-96.75003,0l0,-126.89706z"/>
          </svg>
        </div>
      </a-tooltip>
    </div>
    <drawer v-if="isMobile" v-model:visible="visible"/>
  </div>
</template>

<script setup lang="ts">
import {UserOutlined} from '@ant-design/icons-vue';
import {useBasicLayout} from "@/hooks/useBasicLayout";
import {useMemberStore} from "@/store/modules/member";
import {computed} from "vue";
import {useTooltipStore} from "@/store/modules/useTooltipStore";

const { isMobile } = useBasicLayout();

const userStore = useMemberStore();
const tooltipStore = useTooltipStore();
const showTooltip = computed(() => tooltipStore.showTooltip);

/* 抽屉 */
const visible = ref<boolean>(false);
const showDrawer = () => {
  visible.value = true;
  tooltipStore.openTooltip(false);
};

// 登录用户信息
const loginUser = computed(() => userStore.info ?? null);
</script>

<style scoped lang="less">
.bomao-header {
  display: flex;
  justify-content: space-between;
  height: 66px;

  .bomao-logo {
    float: left;
    height: 100%;
    font-size: 22px;
    font-weight: bold;
    color: #131313;
    margin-right: 20px;
    display: flex;
    align-items: center;

    span {
      margin-left: 10px;
    }

    span, img {
      vertical-align: middle;
    }
  }

  .bomaos-nav {
    color: #fff;
    border-radius: 2px;
    font-size: 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 0;
    background-color: transparent;

    .bomaos-nav-item {
      position: relative;
      display: inline-block;
      vertical-align: middle;
      line-height: 60px;

      :deep(.icon) {
        fill: #404040;
      }

      &>.bomaos-this {
        &:after {
          width: 15px;
        }
      }
      a {
        height: 60px;
        line-height: 60px;
        color: #414141;
        font-size: 16px;
        padding: 0 5px;
        position: relative;
        cursor: pointer;
        display: block;
        transition: all .3s;
        -webkit-transition: all .3s;

        &:hover, &>.bomaos-this {
          color: #414141;

          &:after {
            width: 15px;
          }
        }

        &:after {
          content: '';
          position: absolute;
          bottom: 9px;
          left: 0;
          right: 0;
          width: 0;
          margin: 0 auto;
          height: 4px;
          background-color: #31c27c;
          border-radius: 2px;
          transition: width .2s ease-out;
        }

        .bomaos-this {
          &:after {
            width: 20%;
          }
        }
      }
    }
  }

  .bomaos-avatar {
    margin-left: 10px;
  }

  .author {
    display: flex;
    align-items: center;
  }
}
</style>