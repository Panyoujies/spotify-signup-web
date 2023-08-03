import {createRouter, createWebHistory} from "vue-router";
import {PROJECT_NAME, REDIRECT_PATH, WHITE_LIST} from "@/config/setting";
import NProgress from "nprogress";
import 'nprogress/nprogress.css'
import {getToken} from "@/utils/token-util";
import {useMemberStore} from "@/store/modules/member";
import {useAuthStore} from '@/store/modules/authStore';
import {useTooltipStore} from "@/store/modules/useTooltipStore";

NProgress.configure({
    speed: 200,
    minimum: 0.02,
    trickleSpeed: 200,
    showSpinner: false
});

const router = createRouter({
    routes: [
        {
            path: '/',
            meta: { title: 'Spotify注册' },
            component: () => import('@/views/home/index.vue'),
        },
        {
            path: '/password-reset',
            meta: { title: '修改密码' },
            component: () => import('@/views/password-reset/index.vue'),
        },
        {
            path: '/unlock',
            meta: { title: '解锁14天' },
            component: () => import('@/views/unlock/index.vue'),
        },
        {
            path: '/store',
            meta: { title: '小微商店' },
            component: () => import('@/views/store/index.vue'),
        },
        {
            path: '/product/:id',
            name: 'product',
            meta: { title: '小微商店' },
            props: true,
            component: () => import('@/views/store/product/index.vue'),
        },
        {
            path: '/heart-playlist',
            meta: { title: '歌单转移' },
            component: () => import('@/views/heart-playlist/index.vue'),
        },
        {
            path: '/article',
            meta: { title: '热门公告' },
            component: () => import('@/views/article/index.vue'),
            children: [
                {
                    path: ':id',
                    name: 'supportChat',
                    component: () => import('@/views/article/post/index.vue'),
                    props: true,
                    meta: { title: '公告内容' },
                }
            ]
        },
        {
            path: '/social-login',
            meta: { title: '微信快捷登录' },
            component: () => import('@/views/social-login/index.vue'),
        },
        {
            path: '/user',
            meta: { title: '个人中心' },
            component: () => import('@/views/user/index.vue'),
        },
        // 404
        {
            path: '/:path(.*)*',
            component: () => import('@/views/exception/404/index.vue'),
            meta: { title: '404' }
        }
    ],
    history: createWebHistory(),
    scrollBehavior() {
        return { top: 0 };
    }
});

/**
 * 前置路由守卫
 */
router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();
    if (!getToken()) {
        // 未登录跳转登录界面
        if (!WHITE_LIST.includes(to.path)) {
            authStore.openModal(to.path);
            next(false);
        }
    } else {
        const memberStore = useMemberStore();
        const tooltipStore = useTooltipStore();
        if (!memberStore.info) {
            memberStore.fetchMemberInfo();
            tooltipStore.closeTooltip();
        }
    }
    updateTitle(to);
    if (!from.path.includes(REDIRECT_PATH)) {
        NProgress.start();
    }
    next(true);
})

/**
 * 后置路由守卫
 */
router.afterEach((to) => {
    if (!to.path.includes(REDIRECT_PATH) && NProgress.isStarted()) {
        setTimeout(() => {
            NProgress.done(true);
        }, 300);
    }
})

function updateTitle(route: any) {
    const names = [];
    if (route.meta?.title) {
        // @ts-ignore
        names.push(route.meta.title);
    }
    if (PROJECT_NAME) {
        // @ts-ignore
        names.push(PROJECT_NAME);
    }
    document.title = names.join(' - ');
}

export default router;