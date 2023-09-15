<style scoped lang="scss">
p {
  @apply mb-2 text-lg;
}

h1 {
  @apply text-3xl font-bold;
}

h2 {
  @apply text-2xl font-bold mt-5;
}

hr {
  @apply border
}
</style>

<template>
  <main class="container mx-auto my-8 max-w-[1050px]">
    <div class="mb-3">
      <img class="w-3/4 mx-auto" src="../public/images/fiusac-logo.png" alt="">
    </div>

    <h1>Acerca De:</h1>
    <hr class="my-2" />
    <p>Me llamo Luis.</p>
    <p>Actualmente soy estudiante de la carrera de Ingeniería en Ciencias y Sistemas de la Universidad de San Carlos de
      Guatemala
      (empecé en 2022), pero la administración de mi pénsum
      se me hace algo complicada por cómo está estructurada. Por eso creé esta página. Esta página ayuda a administrar
      mejor el transcurso de la carrera.
    </p>
    <h2>Inicio</h2>
    <p>Al iniciar la página o al ir a la página principal, seguramente viste los semestres con sus respectivos cursos.
      Al darle clic a alguno de esos cursos, podrás ver cuáles son sus prerrequisitos, así como en qué cursos solicitan
      ese curso seleccionado, entre otra información.
      También cuenta con un apartado donde podrás ver las estadísticas de tu progreso en la carrera.
    </p>
    <h2>Mi Ruta</h2>
    <p>
      ¡Aquí puedes diseñar tu ruta en la carrera! Primero, necesitas iniciar sesión, de otro modo no podrás acceder.
      Luego, Seleccionas un período
      (Primer Semestre, Vacaciones Junio, Segundo Semestre o Vacaciones Diciembre) y un año,
      y luego elijes los cursos que cursarás en esos períodos.
    </p>
    <p>Cuenta también con estadísticas de tu progreso general (el progreso actual que tienes en la carrera)
      y el progreso conforme vas diseñando tu ruta.</p>

    <p>Finalmente hasta abajo tiene otra vez el mismo apartado de semestre de la página Inicio para que puedas examinar
      los cursos (ver información de la página Inicio)</p>
    <hr />
    <h2><font-awesome-icon v-if="pageLoaded" :icon="['fas', 'triangle-exclamation']" /> Disclaimer:</h2>
    <p>Soy un desarrollador Junior, por lo que esta página puede tener algunos errores. Conforme vaya yo notando errores
      o
      surjan nuevas necesidades, esta página se irá actualizando continuamente.</p>
    <hr class="my-5" />
    <NuxtLink class="text-xl text-blue-600 dark:text-blue-500 hover:underline"
      to="https://github.com/deidara047/my-uni-progress" target="_blank">
      <font-awesome-icon v-if="pageLoaded" :icon="['fab', 'github']" />
      Link de Repositorio
    </NuxtLink>
  </main>
</template>

<script setup>
const pageLoaded = ref(false);

onMounted(() => {
  pageLoaded.value = true;
})

useHead({
  title: "Acerca De | Progreso FIUSAC"
});

</script>