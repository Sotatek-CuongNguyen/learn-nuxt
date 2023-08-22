export const getListJob = (payload:any) => {
  return useNuxtApp().$api.get("/jobs", payload);
};

