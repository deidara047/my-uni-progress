<style scoped>
.nav-links {
  transition: .1s ease all
}

.nav-links.router-link-exact-active {
  @apply text-blue-600;
}
</style>

<template>
  <nav class="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 shadow ml-0 mt-0 mr-0">
    <div class="container flex flex-wrap items-center justify-between mx-auto p-4">
      <NuxtLink to="/" class="flex items-center">
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Progreso FIUSAC
          202208521</span>
      </NuxtLink>
      <button data-collapse-toggle="navbar-solid-bg" type="button"
        class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-solid-bg" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"></path>
        </svg>
      </button>
      <div class="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
        <ul
          class="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
          <li>
            <NuxtLink to="/" :class="stylesForLinks">Inicio</NuxtLink>
          </li>
          <li v-if="isLogged">
            <NuxtLink to="/my-route" :class="stylesForLinks">Mi ruta</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/about" :class="stylesForLinks">Acerca De</NuxtLink>
          </li>
          <li v-if="!isLogged">
            <NuxtLink href="/login" :class="stylesForLinks">Iniciar Sesión</NuxtLink>
          </li>
          <li v-if="isLogged">
            <NuxtLink href="/my-user" :class="stylesForLinks">Mi Perfil</NuxtLink>
          </li>
          <li v-if="isLogged">
            <button @click="onSignOutButtonClicked" :class="stylesForLinks">{{ loading ? "Cargando..." : "Cerrar Sesión" }}</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
const stylesForLinks = ref("block text-white rounded hover:text-blue-600 nav-links");
const user = useSupabaseUser();
const isLogged = ref(false);
const loading = ref(false);

async function onSignOutButtonClicked(e) {
  loading.value = true;
  const supabase = useSupabaseClient();
  const { error } = await supabase.auth.signOut();
  loading.value = false;
  navigateTo("/");
}

watch(user, () => {
  if (user.value) {
    isLogged.value = true;
  } else {
    isLogged.value = false;
  }
}, { immediate: true })
</script>