export const postLogin = (payload: any) => {
  return useNuxtApp().$api.post("/login", payload);
};
export const postRegister = (payload: any) => {
  return useNuxtApp().$api.post("/register", payload);
};
export const postLogout = () => {
  return useNuxtApp().$api.put("/auth/logout");
}
export const postChangePassword = (payload:any) => {
  return useNuxtApp().$api.put("/change-password", payload);
}
