
import { useProfile } from "~/store/user";
import { useAuth } from "~/store/auth";
import { useIdentity } from "~/store/identity";

export default defineNuxtRouteMiddleware(async (to) => {
  const PUBLIC_PAGES = [
    "/login",
    "/register",
  ];
  const auth = useAuth();
  const profile = useProfile()
  const identity = useIdentity();
  const token = useCookie("token");
  console.log("TOKEN", token.value)
  if (token.value) {
    if (PUBLIC_PAGES.includes(to.path)) {
      return navigateTo("/home");
    }else if(!identity.user){
      const check = profile.user;
      console.log("CHECK", check)
      if (!check) {
        token.value = null;
        return navigateTo("/login");
      }
      identity.setCredentials({ token: token.value, user: check  });
    }

  } else if (!PUBLIC_PAGES.includes(to.path)) {
    console.log("NO TOKEN")
    return navigateTo("/login");
  }
});
