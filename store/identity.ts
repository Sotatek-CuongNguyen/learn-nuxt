import { defineStore } from "pinia";

export interface IIdentityState {
  token: string | null;
  user: any | null;
}

export const useIdentity = defineStore("identity", {
  state: (): IIdentityState => ({
    token: null,
    user: null,
  }),
  actions: {
    setCredentials({ token, user }: any) {
      this.token = token;
      this.user = user;
    },
    removeCredentials() {
      this.token = null;
      this.user = null;
    },
  },
  persist: true
});
