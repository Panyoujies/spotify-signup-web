import {defineStore} from 'pinia';

export interface appStore {
    isWeChat: boolean;
}

export const useAppStore = defineStore('app', {
    state: (): appStore => ({
        isWeChat: false,
    }),
    actions: {
        checkWeChat() {
            const userAgent = navigator.userAgent.toLowerCase();
            this.isWeChat = /micromessenger/.test(userAgent);
        },
    },
});