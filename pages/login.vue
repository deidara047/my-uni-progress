<style scoped lang="scss">

.btn-submit-loading {
  background-color: rgb(130, 159, 241) !important;

  @apply text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none;
}
</style>

<template>
  <main class="container mx-auto">
    <div class="r-card-paddingless pt-10 pb-7 px-5 mx-auto max-w-[475px] mt-[150px]">
      <div class="mb-5 text-center">
        <h1 class="text-3xl font-bold">Iniciar Sesión</h1>
      </div>
      <form @submit.prevent="onLoginSubmit">
        <div class="mb-3">
          <label class="block" for="email">Usuario: </label>
          <input v-model="loginData.email" required class="w-full text-input" id="email" type="email" />
        </div>
        <div class="mb-5">
          <label class="block" for="pwd">Contraseña: </label>
          <input v-model="loginData.pwd" required class="w-full text-input" id="pwd" type="password" />
        </div>
        <p class="text-gray-600 italic my-2"><font-awesome-icon v-if="pageLoaded"
            :icon="['fas', 'triangle-exclamation']" /> Advertencia: Debes tener una cuenta previamente, no se pueden crear
          cuentas.</p>
        <div class="text-center">
          <button type="submit" :disabled="loading" :class="[buttonSubmitClass]">{{ loading ? "Cargando..." : "Iniciar Sesión" }}</button>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup>
import Swal from 'sweetalert2';
const supabase = useSupabaseClient();
const loading = ref(false);
const pageLoaded = ref(false);
const loginData = ref({
  email: '',
  pwd: ''
});

const buttonSubmitClass = computed(() => {
  return loading.value ? "btn-submit-loading": "btn-primary";
})

async function onLoginSubmit() {
  if (loginData.value.email != '' && loginData.value.pwd != '') {
    try {
      loading.value = true
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.value.email,
        password: loginData.value.pwd
      })
      if (error) throw error
      navigateTo('/')
      
    } catch (error) {
      Swal.fire("Error", error.error_description || error.message, "error")
    } finally {
      loading.value = false
    }
  } else {
    Swal.fire('Error', 'Debes de llenar todos los apartados', 'error');
  }
}

useHead({
  title: "Iniciar Sesión | Progreso FIUSAC"
});

onMounted(() => {
  pageLoaded.value = true;
});

definePageMeta({
  middleware: [
    function(to, from) {
      const user = useSupabaseUser();

      if(user) return navigateTo("/");
    }
  ]
})
</script>