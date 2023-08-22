import { postLogin, postRegister } from "~/api/auth.api";
import { getProfile, postEditProfile } from "~/api/user.api";
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
          this.loading = false;
          console.log("PROFILE", res.data);
          this.user = res.data;
          return res.data;
        })
        .catch((err: any) => {
          console.log("err", err);
          this.loading = false;
        });
    },
    async editProfile(data: any) {
      console.log("DATA", data)
      const user = useProfile();
      this.loading = true;
      await postEditProfile(data)
        .then(async (res: any) => {
          this.user = { ...this.user, data };
          await user.getProfile();
        })
        .catch((err: any) => {
          console.log("err", err);
          this.loading = false;
        });
    },
    async resetState() {
      this.user = null;
    },
  },
  persist: {
    storage: persistedState.localStorage,
    paths: ["user"],
  },
});
