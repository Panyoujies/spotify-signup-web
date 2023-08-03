<template>
  <div style="margin: 15px 0">
    <a-row :gutter="[15, 15]">
      <a-col :xs="24" :sm="24" :md="9" :lg="9" :xl="9">
        <a-card title="Spotify 修改密码" :bordered="false">
          <template #extra>
            <a @click="openSubmitAccount">非本站注册? 提交</a>
          </template>
          <a-steps :current="current" :items="items" direction="horizontal" :responsive="false"></a-steps>
          <div class="steps-content">
            {{ steps[current].content }}
          </div>
          <a-divider dashed />
          <div class="steps-action">
            <send-edit-link v-if="current < steps.length - 1" @done="next"/>
            <edit-password v-if="current > 0" @done="prev"/>
          </div>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="24" :md="15" :lg="15" :xl="15">
        <a-card title="视频教程" :bordered="false">
          <template #extra>
            <router-link to="/article/4">修改密码无法收到邮件?</router-link>
          </template>
          <bomaos-xg-player :config="config" @player="onPlayer" />
          <a-divider />
          <div style="font-size: 16px">Spotify账号输入正确密码显示密码不对属于被风控账号、可以使用此功能修改密码继续使用</div>
        </a-card>
      </a-col>
    </a-row>
    <submit-spotify-account-modal v-if="!isMobile" v-model:visible="showSubmitAccount"/>
    <submit-spotify-account-drawer v-else v-model:visible="showSubmitAccount"/>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {message} from 'ant-design-vue';
import type Player from 'xgplayer';
import SendEditLink from "@/views/password-reset/components/send-edit-link.vue";
import EditPassword from "@/views/password-reset/components/edit-password.vue";
import BomaosXgPlayer from "@/plugin/bomaos-xg-player/index";
import SubmitSpotifyAccountModal from "@/views/unlock/components/submit-spotify-account-modal.vue";
import SubmitSpotifyAccountDrawer from "@/views/unlock/components/submit-spotify-account-drawer.vue";
import {useBasicLayout} from "@/hooks/useBasicLayout";

export default defineComponent({
  name: 'PasswordReset',
  components: {
    SubmitSpotifyAccountDrawer,
    SubmitSpotifyAccountModal,
    BomaosXgPlayer,
    EditPassword,
    SendEditLink
  },
  setup() {
    const { isMobile } = useBasicLayout();
    const current = ref<number>(0);
    const steps = [
      {
        title: '第一步',
        content: '首先输入需要修改密码的邮箱,点击【获取密码修改链接】按钮,打开邮箱找到Spotify发来的邮件,打开邮件找到【"重設密碼"按钮】长按复制链接',
      },
      {
        title: '第二步',
        content: '将复制的链接粘贴到【密码修改链接】框内,再输入新密码【新密码需要之前没用过的】，然后点击【修改密码】按钮,等待密码修改成功、修改成功后会邮件通知到您',
      }
    ];
    const items = steps.map(item => ({ key: item.title, title: item.title }));

    const next = () => {
      current.value++;
    };

    const prev = () => {
      current.value--;
    };

    // 视频播放器一配置
    const config = reactive({
      id: 'demoPlayer1',
      lang: 'zh-cn',
      fluid: true,
      // 视频地址
      url: 'https://bomaos-1300119114.cos.ap-nanjing.myqcloud.com/video%2Fpassword-reset.mp4',
      // 封面
      poster:
          'https://imgcache.qq.com/open_proj/proj_qcloud_v2/gateway/solution/general-video/css/img/scene/1.png',
      // 开启倍速播放
      playbackRate: [0.5, 1, 1.5, 2],
      // 开启画中画
      pip: true
    });

    // 视频播放器二是否实例化完成
    const ready = ref(false);

    // 视频播放器一实例
    let player1: Player;

    /* 播放器一渲染完成 */
    const onPlayer = (player: Player) => {
      player1 = player;
      player1.on('play', () => {
        ready.value = true;
      });
    };

    const showSubmitAccount = ref<boolean>(false);
    const openSubmitAccount = () => {
      showSubmitAccount.value = true;
    }

    return {
      message,
      current,
      items,
      steps,
      next,
      prev,
      config,
      onPlayer,
      isMobile,
      showSubmitAccount,
      openSubmitAccount
    };
  }
})
</script>

<style scoped>
.steps-content {
  font-size: 15px;
  margin-top: 25px;
  text-align: center;
}

.steps-action {
  margin-top: 25px;
}
</style>