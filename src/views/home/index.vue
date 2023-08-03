<script setup lang="ts">
import {FormInstance, message} from "ant-design-vue";
import {Rule} from "ant-design-vue/es/form";
import {CaretRightOutlined} from '@ant-design/icons-vue';
import {getSignupCode, signup, validate} from "@/api/signup";
import {Signup, SignupResult} from "@/api/signup/model";
import useFormData from "@/hooks/useFormData";
import CreateBuySignup from "@/views/home/components/create-buy-signup.vue";
import {AlipayResult, SignupCodeResult} from "@/api/payment/model";
import OpenBuyQrcode from "@/views/home/components/open-buy-qrcode.vue";
import {getLocalStorage, removeLocalStorage, setLocalStorage} from "@/utils/LocalStorage-util";
import OpenedSuccess from "@/views/home/components/opened-success.vue";
import {ref} from 'vue';
import {useAppStore} from "@/store/modules/useAppStore";
import Carousel from "@/components/home/carousel.vue";

const activeKey = ref(['1']);
const customStyle = 'background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden';
const appStore = useAppStore();
const isWeChat = computed(() => appStore.isWeChat);

const formRef = ref<FormInstance | null>(null);
const loading = ref(false);
const showOpenedSuccess = ref(false);
const signupSuccessResult = ref<SignupResult | null>(null);

const { form } = useFormData<Signup>({
  username: undefined,
  password: undefined,
  nickname: undefined,
  region: 'hk',
  code: undefined
});

function isEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// 表单验证规则
const rules: Record<string, Rule[]> = {
  username: [
    {
      required: true,
      validator: (_rule: Rule, value: string, callback) => {
        if (value == '' || value === undefined) {
          callback('输入你的电子邮件地址。');
        } else if (!isEmail(value)) {
          callback('请输入正确的电子邮件地址。');
        }
        validate(form).then((res) => {
          callback();
        }).catch((d) => {
          callback(d.message);
        })
      }
    }
  ],
  password: [
    {
      required: true,
      validator: (_rule: Rule, value: string, callback) => {
        if (value == '' || value === undefined) {
          callback('输入您要创建密码。');
        } else if (value.length <= 8) {
          callback('你的密码太短。');
        } else {
          callback();
        }
      }
    }
  ],
  nickname: [
    {
      required: true,
      message: '输入个人资料名称。',
      type: 'string',
      trigger: 'blur'
    }
  ],
  region: [
    {
      required: true,
      message: '请选择Spotify注册地',
      type: 'string',
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true,
      message: '请输入注册码',
      type: 'string',
      trigger: 'blur'
    }
  ],
}

const onSubmit = () => {
  if (!formRef.value) {
    return;
  }
  loading.value = true;
  formRef.value
      .validate()
      .then(() => {
        signup(form).then((d) => {
          loading.value = false;
          message.success('账号注册成功！');
          /* 注册完成删除本地注册码缓存 */
          removeLocalStorage('signup_code');
          showOpenedSuccess.value = true;
          signupSuccessResult.value = d;
        }).catch((e) => {
          loading.value = false;
          message.error(e.message);
        })
      }).catch(() => {
    loading.value = false;
  })
};

const showOpenBuy = ref(false);
const openBuy = () => {
  showOpenBuy.value = true;
}

/* 打开支付 */
const showPayQrcode = ref(false)
// 当前编辑数据
const payCurrent = ref<AlipayResult | null>(null);
const openPayQrcode = (payment: AlipayResult) => {
  showPayQrcode.value = true;
  payCurrent.value = payment;
}

const finish = (signupCode: SignupCodeResult) => {
  form.code = signupCode.code;
  /* 存储到本地缓存 */
  setLocalStorage("signup_code", signupCode.code, true);
}

onMounted(() => {
  const signup_code = getLocalStorage("signup_code");
  if (signup_code) {
    form.code = signup_code;
  } else {
    getSignupCode(0).then((d) => {
      form.code = d.code;
    }).catch((error) => {
      console.log(error.message)
    })
  }
})
</script>

<template>
  <div style="margin: 15px 0">
    <a-row :gutter="[15, 15]">
      <a-col :xs="24" :sm="24" :md="8" :lg="10" :xl="10">
        <!-- 轮播图组件 -->
        <carousel />
        <a-card title="Spotify自动注册" style="margin-top: 15px" :bordered="false">
          <template #extra>
            <a-tag color="purple" style="margin-right: 0">一键自助注册</a-tag>
          </template>
          <a-form
              layout="vertical"
              ref="formRef"
              :model="form"
              :rules="rules"
              @finish="onSubmit"
          >
            <a-form-item name="username" label="你的电子邮件地址是什么？">
              <a-input v-model:value="form.username" size="large" placeholder="输入你的电子邮件地址。"/>
            </a-form-item>
            <a-form-item name="password" label="创建密码">
              <a-input v-model:value="form.password" size="large" placeholder="输入您要创建密码。" />
            </a-form-item>
            <a-form-item name="nickname" label="我们该如何称呼你？">
              <a-input v-model:value="form.nickname" size="large" placeholder="输入个人资料名称。" />
            </a-form-item>
            <a-form-item name="region" label="选择Spotify注册地">
              <a-select v-model:value="form.region" size="large" placeholder="请选择Spotify注册地">
                <a-select-option value="hk">🇨🇳 中国香港</a-select-option>
                <a-select-option value="tw">🇨🇳 中国台湾</a-select-option>
                <a-select-option value="us">🇺🇸 美国</a-select-option>
                <a-select-option value="jp">🇯🇵 日本</a-select-option>
                <a-select-option value="sg">🇸🇬 新加坡</a-select-option>
                <a-select-option value="ph">🇵🇭 菲律宾</a-select-option>
                <a-select-option value="tr">🇹🇷 土耳其</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item name="code" label="Spotify 注册码">
              <a-input v-model:value="form.code" size="large" placeholder="输入Spotify注册码">
                <template #suffix>
                  <a @click="openBuy">购买注册码</a>
                </template>
              </a-input>
            </a-form-item>
            <a-button type="primary" html-type="submit" block size="large" :loading="loading" :disabled="loading">立即注册</a-button>
          </a-form>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="24" :md="16" :lg="14" :xl="14">
        <a-card title="注册教程" :bordered="false">
<!--          <div class="ele-avatar-group">
            <span class="el-avatar el-avatar&#45;&#45;circle" style="margin-left: -10px; border-width: 2px;">
              <img src="https://cdn.eleadmin.com/20200609/c184eef391ae48dba87e3057e70238fb.jpg" style="object-fit: cover;">
            </span>
            <span class="el-avatar el-avatar&#45;&#45;circle" style="margin-left: -10px; border-width: 2px;">
              <img src="https://cdn.eleadmin.com/20200609/b6a811873e704db49db994053a5019b2.jpg" style="object-fit: cover;">
            </span>
            <span class="el-avatar el-avatar&#45;&#45;circle" style="margin-left: -10px; border-width: 2px;">
              <img src="https://cdn.eleadmin.com/20200609/948344a2a77c47a7a7b332fe12ff749a.jpg" style="object-fit: cover;">
            </span>
            <span class="el-avatar el-avatar&#45;&#45;circle" style="margin-left: -10px; border-width: 2px;">
              <img src="https://cdn.eleadmin.com/20200609/f6bc05af944a4f738b54128717952107.jpg" style="object-fit: cover;">
            </span>
            <span class="el-avatar el-avatar&#45;&#45;circle ele-avatar-more el-tooltip__trigger el-tooltip__trigger" style="margin-left: -10px; border-width: 2px;">
              <span class="ele-avatar-more-inner">
                <span>+2</span>
              </span>
            </span>
          </div>-->
          <div class="bomaos-cells">
            <div class="bomaos-cell">
              <label>第一步</label>
              <div>购买专属Spotify注册码</div>
            </div>
            <a-divider style="margin: 15px 0;"/>
            <div class="bomaos-cell">
              <label>第二步</label>
              <div>填写Spotify账号信息和注册码、点击立即注册、等待3秒左右系统自动注册完成！</div>
            </div>
            <a-divider style="margin: 15px 0;"/>
            <div class="bomaos-cell">
              <label>第三步</label>
              <div>打开Spotify登录即可！</div>
            </div>
          </div>
        </a-card>
        <a-card title="常见问题" style="margin-top: 15px" :bordered="false">
          <template #extra>
            <router-link to="/article/4">修改密码无法收到邮件?</router-link>
          </template>
          <a-collapse
              v-model:activeKey="activeKey"
              :bordered="false"
              style="background: rgb(255, 255, 255)"
          >
            <template #expandIcon="{ isActive }">
              <caret-right-outlined :rotate="isActive ? 90 : 0" />
            </template>
            <a-collapse-panel key="1" header="为什么注册Spotify需要提供其他的功能,比如修改密码和14天限制?" :style="customStyle">
              <p>1. 会有小几率账号被Spotify官方修改密码，导致密码正确却登录不上账号。需使用密码修改功能</p>
              <p>2. Spotify 未在国内提供服务，所以不论是哪个区的Spotify账户都属于跨区使用,而根据Spotify规则: 跨区使用14天必须在账户所在国家/地区登录一次。需使用14天限制解除功能</p>
              <p style="color: #31c27c; margin-top: 8px; font-weight: bold">开通Spotify会员不会有以上两种情况</p>
            </a-collapse-panel>
            <a-collapse-panel key="2" header="你们会不会跑路?" :style="customStyle">
              <p>坚决不会，网站从免费变为收费后已经有一定的收益，且随着用户数量日益增加，网站正向着更好的方向发展，我们从未想过跑路，免费不一定是好事，收费的服务也许更有价值！</p>
            </a-collapse-panel>
          </a-collapse>
          <a-divider />
          <p style="margin-bottom: 5px">所以我们推出了除注册外的其他增值服务，以确保网站可以长期运营，可以确保购买注册码后即使不开会员也能保证一直使用！</p>
        </a-card>
      </a-col>
    </a-row>
    <create-buy-signup v-model:visible="showOpenBuy" @done="openPayQrcode"/>
    <open-buy-qrcode v-model:visible="showPayQrcode" :payment="payCurrent" @done="finish"/>
    <opened-success v-model:visible="showOpenedSuccess" :data="signupSuccessResult"/>
    <van-overlay :show="loading" lock-scroll :z-index="2000">
      <div style="height: 100%; display: flex; align-items: center; justify-content: center;">
        <a-spin size="large" tip="正在注册中..."></a-spin>
      </div>
    </van-overlay>
  </div>
</template>

<style scoped lang="less">
.ele-avatar-group {
  display: inline-block;
  vertical-align: top;
  position: relative;
  font-size: 0;

  .el-avatar{
    &:first-child {
      margin-left: 0!important;
    }
  }
  .el-avatar {
    vertical-align: top;
    border: 1px solid #ffffff;
    transition: all .3s ease;
    box-sizing: content-box;
    position: relative;
    cursor: pointer;
    z-index: 1;
  }

  .ele-avatar-more {
    color: #f56a00;
    background: #ffffff;
    display: inline-block;
  }

  .ele-avatar-more-inner {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(245,106,0,.2);
  }
}

.el-avatar {
  --el-avatar-text-color: #ffffff;
  --el-avatar-bg-color: rgba(0, 0, 0, .3);
  --el-avatar-text-size: 14px;
  --el-avatar-icon-size: 18px;
  --el-avatar-border-radius: 4px;
  --el-avatar-size-large: 56px;
  --el-avatar-size-small: 24px;
  --el-avatar-size: 40px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  text-align: center;
  overflow: hidden;
  color: var(--el-avatar-text-color);
  background: var(--el-avatar-bg-color);
  width: var(--el-avatar-size);
  height: var(--el-avatar-size);
  font-size: var(--el-avatar-text-size);
}
.el-avatar--circle {
  border-radius: 50%;
}

.el-avatar>img {
  display: block;
  height: 100%;
}

.spotify-tools {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 25px;
  background-color: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
  border-radius: 8px;

  .tools-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 50%;

    svg {
      width: 38px;
      height: 38px;
      color: #4d4d4d;
      display: none;
    }

    div {
      display: flex;
      flex-direction: column;
      margin-left: 10px;

      b {
        margin-bottom: 5px;
      }
      span {
        font-size: 12px;
      }
    }
  }
}

.bomaos-cells {
  display: inline-flex;
  width: 100%;
  flex-direction: column;
  padding: 16px;
  background-color: #f7f7f7;
  border-radius: 4px;

  .bomaos-cell {
    display: flex;
    align-items: flex-start;

    label {
      min-width: 60px;
      font-weight: bold;
      color: #31c27c;
    }
  }
}
</style>