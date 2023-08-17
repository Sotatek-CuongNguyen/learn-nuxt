export const getProfile = () => {
  return useNuxtApp().$api.get("/profile");
};
