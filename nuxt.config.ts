// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // server side rendering mode
  ssr: false,
  // config
  runtimeConfig: {
    // Private keys are only available on the server
    // Public keys that are exposed to the client
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
      sportifyClientID: process.env.SPOTIFY_CLIENT_ID,
      sportifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET
    }
  },
  // typescripts
  typescript: {
    strict: true,
    typeCheck: true,
  },

  // css
  css: ["~/public/style/app.scss"],

  // modules
  modules: [
    "@intlify/nuxt3",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@element-plus/nuxt",
    "@pinia-plugin-persistedstate/nuxt"
  ],

  // element+ config
  // experimental features
  experimental: {
    reactivityTransform: false,
  },

  // auto import components
  components: true,

  // app config
  app: {
    // global transition
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },
  vueuse: {
    ssrHandlers: true,
  },
});
