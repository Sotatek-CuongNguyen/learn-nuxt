import { postLogin, postRegister } from "~/api/auth.api";
import { getProfile } from "~/api/user.api";
import { defineStore } from "pinia";

const BAD_REQUEST_STATUS = 400;

export const useProfile = defineStore("profile", {
  state: (): any => ({
    loading: false,
    user: null,
  }),
  actions: {
    async getProfile() {
      this.loading = true;
      await getProfile()
        .then((res: any) => {
          this.user = res.data;
        })
        .catch((err: any) => {
          console.log("err", err);
        });
    },
    async resetState(){
      this.user = null
    }
  },
  persist: {
    storage: persistedState.sessionStorage,
    paths: ['user']
  },
});
