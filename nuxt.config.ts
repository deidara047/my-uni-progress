// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts'],
  googleFonts: {
    families: {
      Roboto: true
    },
    preconnect: true
  },
  css: ["@/assets/css/main.scss"]
})
