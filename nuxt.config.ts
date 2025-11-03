// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts', '@nuxtjs/supabase'],
  googleFonts: {
    families: {
      Roboto: true,
      Lato: true
    },
    preconnect: true
  },
  css: [
    "@/assets/css/main.scss",
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  supabase: {
    redirectOptions: {
      exclude: ["/","/about"]
    }
  }
})