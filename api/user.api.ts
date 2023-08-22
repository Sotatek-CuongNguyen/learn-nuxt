export const getProfile = () => {
  return useNuxtApp().$api.get("/profile");
};
export const postEditProfile = (payload: any) => {
  return useNuxtApp().$api.put("/profile", payload);
};

