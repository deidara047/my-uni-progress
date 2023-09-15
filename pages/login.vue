<style scoped lang="scss">
.btn-submit {
  background-color: rgb(29 78 216) !important;

  &:hover {
    background-color: rgb(22, 68, 194) !important;
  }

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
          <label class="block" for="user">Usuario: </label>
          <input v-model="loginData.user" required class="w-full text-input" id="user" type="text" />
        </div>
        <div class="mb-5">
          <label class="block" for="pwd">Contraseña: </label>
          <input v-model="loginData.pwd" required class="w-full text-input" id="pwd" type="password" />
        </div>
        <p class="text-gray-600 italic my-2"><font-awesome-icon v-if="pageLoaded" :icon="['fas', 'triangle-exclamation']" /> Advertencia: Debes tener una cuenta previamente, no se pueden crear cuentas.</p>
        <div class="text-center">
          <button type="submit" class="btn-submit">Iniciar Sesión</button>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup>
import Swal from 'sweetalert2';

const pageLoaded = ref(false);
const loginData = ref({
  user: '',
  pwd: ''
});

function onLoginSubmit() {
  if(loginData.value.user != '' && loginData.value.pwd != '') {
    // Submit login info
  } else {
    Swal.fire('Error', 'Debes de llenar todos los apartados', 'error');
  }
}

useHead({
  title: "Iniciar Sesión | Progreso FIUSAC"
});

onMounted(() => {
  pageLoaded.value = true;
})
</script>