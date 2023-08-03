// stores/authStore.ts
import {defineStore} from 'pinia'

export interface tooltipStore {
    showTooltip: boolean;
}

export const useTooltipStore = defineStore('tooltip', {
    state: (): tooltipStore => ({
        showTooltip: true
    }),
    actions: {
        openTooltip(value: boolean) {
            this.showTooltip = value;
        },
        closeTooltip() {
            this.showTooltip = false;
        }
    },
})