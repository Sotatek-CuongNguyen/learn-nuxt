
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
    }
      // if (!check) {
      //   token.value = null;
      //   return navigateTo("/login");
      // }
     identity.setCredentials({ token: token, user: profile.user  });

  } else if (!PUBLIC_PAGES.includes(to.path)) {
    console.log("GO TO HERE")
    return navigateTo("/login");
  }
});
