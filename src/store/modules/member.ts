/**
 * 登录用户 store
 */
import {defineStore} from 'pinia';
import {Member} from "@/api/member/model";
import {getMemberInfo} from "@/api/member";

export interface MemberState {
  info: Member | null;
}

export const useMemberStore = defineStore({
  id: 'member',
  state: (): MemberState => ({
    // 当前登录用户的信息
    info: null,
  }),
  getters: {},
  actions: {
    /**
     * 请求用户信息、权限、角色、菜单
     */
    async fetchMemberInfo() {
      const result = await getMemberInfo().catch(() => {});
      if (!result) {
        return {};
      }
      // 用户信息
      this.info = result;
    },
    /**
     * 更新用户信息
     */
    setInfo(value: Member) {
      this.info = value;
    },
  }
});
