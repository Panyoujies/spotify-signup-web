<template>
  <a-drawer
      title="Spotify工具箱"
      width="65%"
      :placement="placement"
      :closable="false"
      :visible="visible"
      :header-style="{ padding: '15px' }"
      :body-style="{ padding: '15px' }"
      @close="onClose"
      class="bomaos-safe-area-bottom"
  >
    <div class="sider-list">
      <div class="sider-item">
        <router-link to="/" @click.native="onClose" class="sider-item--inner" active-class="sider-item--inner__active">
          <div class="sider-list-title">
            <svg  viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
              <path d="M698.581333 895.786667a42.666667 42.666667 0 0 1-37.376-76.714667A341.333333 341.333333 0 1 0 512 853.333333a42.666667 42.666667 0 0 1 0 85.333334C276.352 938.666667 85.333333 747.648 85.333333 512S276.352 85.333333 512 85.333333s426.666667 191.018667 426.666667 426.666667a426.666667 426.666667 0 0 1-240.085334 383.786667z m-389.973333-452.608a42.666667 42.666667 0 0 1-19.925333-82.986667c151.722667-36.48 303.701333-20.010667 454.4 49.024a42.666667 42.666667 0 1 1-35.498667 77.568c-133.674667-61.184-266.154667-75.52-398.933333-43.605333z m43.52 125.44a42.666667 42.666667 0 1 1-21.546667-82.56c123.989333-32.341333 248.277333-17.706667 371.029334 43.178666a42.666667 42.666667 0 1 1-37.888 76.458667c-104.746667-51.925333-208-64.085333-311.637334-37.077333z m21.546667 124.373333a42.666667 42.666667 0 1 1-22.016-82.432c95.744-25.6 191.872-13.994667 286.336 34.090667a42.666667 42.666667 0 1 1-38.656 76.032c-76.16-38.698667-150.698667-47.701333-225.664-27.690667z" fill="currentColor"></path>
            </svg>
            <div>
              Spotify注册
            </div>
          </div>
          <div>
            <a-tag color="#31c27c" style="margin-inline-end: 0px;">New</a-tag>
          </div>
        </router-link>
      </div>
      <div class="sider-item">
        <router-link to="/password-reset" @click.native="onClose" class="sider-item--inner" active-class="sider-item--inner__active">
          <div class="sider-list-title">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
              <path d="M620.2 351c-13.8 0-27.6 5.6-37.6 15.4l-17.8 17.8c-1.4 14 5.4 33.8 23.2 51.6 17.8 17.8 37 24.8 51.4 23l17.8-17.8c9.8-9.8 15.4-23.2 15.4-37.2 0-29.2-23.2-52.8-52.4-52.8z" fill="currentColor"></path>
              <path d="M940.2 365.2c-33.2-139.6-142-248.4-281.4-281.2-96.4-22.6-197.2-22.6-293.6 0-139.4 32.8-248.2 141.6-281.4 281.2-22.2 96.6-22.2 197.2 0 293.6 33.2 139.6 142 248.4 281.4 281.2 96.4 22.6 197.2 22.6 293.6 0 139.4-32.6 248.2-141.6 281.4-281.2 22.2-96.6 22.2-197 0-293.6z m-242.8 116l-123.2 123.6c-57.8 57.4-129.6 98-208.2 117.8l-23.8 6c-28.6 7-53.8-18.6-47-46.8l6-23.8c19.8-78.8 60.4-150.6 117.6-208l123.6-123.6c20.8-20.6 48.4-32 77.6-32 60.4 0 109.2 49 109.2 109.6 0.4 28.8-11 56.8-31.8 77.2z" fill="currentColor"></path>
              <path d="M517.4 432l-58.4 58c-48.4 48.8-83.6 109.4-101.4 176 66.8-17.6 127.6-52.6 176-101.4l58.4-58c-16.8-7.4-32.2-18.4-44-30.4-12.2-12.2-23.2-27.2-30.6-44.2z" fill="currentColor"></path>
            </svg>
            <div>
              修改密码
            </div>
          </div>
          <div>
            <right-outlined />
          </div>
        </router-link>
      </div>
      <div class="sider-item">
        <router-link to="/unlock" @click.native="onClose" class="sider-item--inner" active-class="sider-item--inner__active">
          <div class="sider-list-title">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
              <path d="M780.99456 419.328H376.91904V269.63968c0-49.57696 60.31872-104.74496 134.66112-104.74496 74.368 0 134.7584 55.168 134.7584 104.74496v44.928h0.52736a52.29568 52.29568 0 0 0 51.77344 44.89728c26.4448 0 48.22016-19.5072 51.8656-44.89728h0.59392v-44.92288c0-115.712-107.27936-209.52576-239.5136-209.52576-132.21376 0-239.4624 93.81376-239.4624 209.52576V419.328h-29.95712c-49.55136 0-89.7536 40.20736-89.7536 89.78944v359.2192c0 49.58208 40.20224 89.77408 89.7536 89.77408h538.8288c49.61792 0 89.78432-40.192 89.78432-89.77408v-359.2192c0-49.58208-40.1664-89.78944-89.78432-89.78944z m-224.47616 331.52v40.93952c0 25.71264-20.1216 46.54592-44.93824 46.54592-24.7552 0-44.90752-20.83328-44.90752-46.54592v-40.9344c-35.36384-16.57344-59.88864-52.1728-59.88864-93.42976 0-57.11872 46.96064-103.43424 104.79616-103.43424 57.89696 0 104.79616 46.31552 104.79616 103.43424 0 41.25184-24.46336 76.85632-59.85792 93.42976z" fill="currentColor"></path>
            </svg>
            <div>
              解锁14天
            </div>
          </div>
          <div>
            <right-outlined />
          </div>
        </router-link>
      </div>
      <div class="sider-item">
        <router-link to="/store" @click.native="onClose" class="sider-item--inner" active-class="sider-item--inner__active">
          <div class="sider-list-title">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
              <path d="M853.333333 298.666667h-128A213.333333 213.333333 0 0 0 298.666667 298.666667H170.666667a42.666667 42.666667 0 0 0-42.666667 42.666666v512a85.333333 85.333333 0 0 0 85.333333 85.333334h597.333334a85.333333 85.333333 0 0 0 85.333333-85.333334V341.333333a42.666667 42.666667 0 0 0-42.666667-42.666666zM384 448a21.333333 21.333333 0 0 1-21.333333 21.333333h-42.666667a21.333333 21.333333 0 0 1-21.333333-21.333333v-42.666667a21.333333 21.333333 0 0 1 21.333333-21.333333h42.666667a21.333333 21.333333 0 0 1 21.333333 21.333333v42.666667zM512 170.666667a128 128 0 0 1 128 128H384a128 128 0 0 1 128-128z m213.333333 277.333333a21.333333 21.333333 0 0 1-21.333333 21.333333h-42.666667a21.333333 21.333333 0 0 1-21.333333-21.333333v-42.666667a21.333333 21.333333 0 0 1 21.333333-21.333333h42.666667a21.333333 21.333333 0 0 1 21.333333 21.333333v42.666667z" fill="currentColor"></path>
            </svg>
            <div>
              小微商店
            </div>
          </div>
          <div>
            <right-outlined />
          </div>
        </router-link>
      </div>
<!--      <div class="sider-item">
        <router-link to="/heart-playlist" @click.native="onClose" class="sider-item&#45;&#45;inner" active-class="sider-item&#45;&#45;inner__active">
          <div class="sider-list-title">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
              <path d="M512 512m-469.333333 0a469.333333 469.333333 0 1 0 938.666666 0 469.333333 469.333333 0 1 0-938.666666 0Z" fill="currentColor"></path>
              <path d="M787.690667 236.842667a42.666667 42.666667 0 0 1 1.642666 11.733333v81.92a42.666667 42.666667 0 0 1-30.933333 41.002667L554.666667 429.696V682.666667a149.333333 149.333333 0 0 1-144.213334 149.248L405.333333 832a149.333333 149.333333 0 1 1 85.354667-271.872L490.666667 298.666667h1.386666a42.666667 42.666667 0 0 1 29.568-30.165334l213.333334-60.970666a42.666667 42.666667 0 0 1 52.736 29.312z" fill="#ffffff"></path>
            </svg>
            <div>
              歌单转移
            </div>
          </div>
          <div>
            <a-tag color="green" style="margin-inline-end: 0px;">New</a-tag>
          </div>
        </router-link>
      </div>-->
      <div class="sider-item">
        <router-link to="/user" @click.native="onClose" class="sider-item--inner" active-class="sider-item--inner__active">
          <div class="sider-list-title">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
              <path d="M512.3 63.6C265.1 63.6 64.7 264 64.7 511.2s200.4 447.5 447.5 447.5 447.5-200.4 447.5-447.5S759.5 63.6 512.3 63.6m0 691.7c-127.3 0-231.8-97.4-243.1-221.7-1.1-12 8.3-22.4 20.4-22.4H735c12 0 21.5 10.4 20.4 22.4-11.3 124.3-115.9 221.7-243.1 221.7" fill="currentColor"></path>
            </svg>
            <div>
              个人中心
            </div>
          </div>
          <div>
            <a-tag color="purple" style="margin-inline-end: 0px;">订阅会员</a-tag>
          </div>
        </router-link>
      </div>
    </div>
    <template #footer>
      <div class="bomaos-footer">
        <a-alert message="提供一站式Spotify帮助与服务、支持注册、修改密码、解锁14天、下载、会员订阅等专业的解决方案" type="info"/>
        <a-divider style="margin: 15px 0"/>
        <router-link to="/user" @click.native="onClose" class="avatar">
          <a-avatar size="large" :src="loginUser.avatar ? loginUser.avatar : '/assets/user-avatar.jpg'">
            <template #icon><UserOutlined /></template>
          </a-avatar>
          <div>
            <b>{{ loginUser.nickName ?? '未登录' }}</b>
            <span>{{ loginUser.nickName ? '已登录可使用全部功能' : '您还未登录、请登录后使用' }}</span>
          </div>
        </router-link>
      </div>
    </template>
  </a-drawer>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {DrawerProps} from "ant-design-vue";
import {RightOutlined, UserOutlined} from '@ant-design/icons-vue';
import {useMemberStore} from "@/store/modules/member";
import {useTooltipStore} from "@/store/modules/useTooltipStore";

const userStore = useMemberStore();
const tooltipStore = useTooltipStore();

// 登录用户信息
const loginUser = computed(() => userStore.info ?? {});

const placement = ref<DrawerProps['placement']>('right');

const emit = defineEmits<{
  (e: 'done'): void;
  (e: 'update:visible', visible: boolean): void;
}>();

const props = defineProps<{
  // 弹窗是否打开
  visible: boolean;
}>();

/* 更新visible */
const updateVisible = (value: boolean) => {
  emit('update:visible', value);
};

const onClose = () => {
  if (!!loginUser.value.nickName) {
    tooltipStore.openTooltip(false);
  } else {
    tooltipStore.openTooltip(true);
  }
  updateVisible(false);
};
</script>

<style scoped lang="less">
.sider-list {
  display: flex;
  flex-direction: column;

  .sider-item {

    &:not(:last-child) {
      margin-bottom: 0.5rem;
    }

    .sider-item--inner {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px;
      border-radius: 0.375rem;
      border: 1px solid #e5e7eb;
      cursor: pointer;
      background: white;
      color: #3b3b3b;
      font-size: 15px;

      .sider-list-title {
        display: flex;
        align-items: center;
        svg {
          margin-right: 7px;
        }
      }
    }
    .sider-item--inner__active {
      color: #31c27c;
      border-color: #31c27c;
    }
  }
}

.bomaos-footer {
  width: 100%;
  padding: 7px 0;
  .avatar {
    display: flex;
    div {
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      color: #131313;
      b {
        line-height: 1.2;
      }
      span {
        font-size: 12px;
      }
    }
  }
}
</style>