import { postLogin, postRegister, postLogout } from "~/api/auth.api";
import { defineStore } from "pinia";
import { getProfile } from "~/api/user.api";
import { useProfile } from "~/store/user";
import { useIdentity } from "./identity";
import { clearCookies } from "~/utils/common";
const BAD_REQUEST_STATUS = 400;

export const useAuth = defineStore("auth", {
  state: (): any => ({
    loading: false,
    token: null
  }),
  actions: {
    async login(payload: any) {
      this.loading = true;
      const router = useRouter();
      const user = useProfile();
      const token = useCookie('token')
      const res: any = await postLogin(payload)
        .then(async (res: any) => {
          if (res?.access_token) {
            this.token = res?.access_token;
            token.value =  res?.access_token
            showMessage("success", "SUCCESS");
            setTimeout(() => {
              router.push("/home");
            }, 1000);
          }
          await user.getProfile();
        })
        .catch((err: any) => {
          this.loading = false;
          showMessage("error", err.data?.message);
        });
      console.log(res);
    },
    async register(payload: any) {
      this.loading = true;
      const router = useRouter();
      try {
        const res: any = await postRegister(payload);
        console.log(res);
        if (res?.success) {
          showMessage("success", "REGISTER SUCCESS");
          setTimeout(() => {
            router.push("/login");
          }, 1000);
        }
        this.loading = false;
        return res;
      } catch (error: any) {
        this.loading = false;
        showMessage("error", error.data?.message);
      }
    },
    async logout() {
      const identity = useIdentity();
      const user = useProfile();
      await postLogout()
        .then((res: any) => {
          const token = useCookie('token')
          if(res.success){
            console.log("GO HERE")
            identity.removeCredentials();
            user.resetState();
            token.value = null
            clearCookies()
            sessionStorage.clear()
            localStorage.clear()
          }
        })
        .catch((err: any) => {
          console.log("ERR", err);
        });
    },
  },
  persist: {
    storage: persistedState.cookies,
    paths: ['token']
  },
});
