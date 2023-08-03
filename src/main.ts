import {createApp} from 'vue';
import App from './App.vue';
import store from './store';
import router from "./router";
import directive from './directive';
import 'ant-design-vue/dist/reset.css';
import 'ant-design-vue/es/message/style';
import './styles/nprogress/nprogress.css';
import './style.css';
import './styles/index.less';
import {useAppStore} from "@/store/modules/useAppStore";

const app = createApp(App);
app.use(router);
app.use(store);
directive(app);

const appStore = useAppStore();
appStore.checkWeChat(); // 检查是否在微信内访问

app.mount('#app');