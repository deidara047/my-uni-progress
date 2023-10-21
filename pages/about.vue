<style scoped lang="scss">
p, b {
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

li {
  margin-left: 34px;
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
      Luego, Seleccionas un tipo de período
      (Primer Semestre, Vacaciones Junio, Segundo Semestre o Vacaciones Diciembre) y un año,
      y luego elijes los cursos que cursarás en esos períodos.
    </p>
    <p>Cuenta también con estadísticas de tu progreso general (el progreso actual que tienes en la carrera)
      y el progreso conforme vas diseñando tu ruta.</p>

    <h2>Mi Perfil</h2>
    <p>Aquí podrás gestionar los cursos. Podrás marcar cada curso ya sea como aprobado, o desaprobado. Recuerda que no puedes marcar un curso como aprobado
      si se encuentra previamente en un período. Esto es porque en los períodos se encuentran cursos únicamente no aprobados.
    </p>

    <h2 class="mb-2">Video explicativo:</h2>
    <div>
      <iframe class="w-full aspect-video" src="https://www.youtube.com/embed/2xdFDRr1H6M?si=c73L3-TIcfgYld_E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>

    <h1 class="mt-2"><font-awesome-icon v-if="pageLoaded" :icon="['fas', 'circle-question']" /> FAQ:</h1>
    <hr class="my-2" />
    <b>¿Cómo funcionan los tiempos de los períodos?</b>
    <p>La Universidad de San Carlos maneja cuatro tipos de período por cada año: <i>Primer Semestre, Vacaciones Junio, Segundo Semestre y Vacaciones Diciembre.</i>
      A continuación se describe el rango de fechas (dd/mm) en las que se desarrollan estos períodos:
    </p>
    <ul class="list-disc mb-3">
      <li><b>Primer Semestre:</b> 15/01 - 15/05</li>
      <li><b>Vacaciones Junio:</b> 01/06 - 30/06</li>
      <li><b>Segundo Semestre:</b> 15/07 - 15/11</li>
      <li><b>Vacaciones Diciembre</b> 01/12 - 30/12</li>
    </ul>

    <p>Cabe destacar que las fechas de 'Primer Semestre' y 'Segundo Semestre' son el promedio de fechas que se desarrollan estos períodos.
      A veces son más largos, a veces más cortos, pero falta un estándar, así que se definieron esas fechas (donde oscilan los inicios y finales de estos períodos).
    </p>

    <p>Supone que el día de hoy es <u>21/10/2023</u> (dd/mm/yyyy) , si tratas de crear un período, por ejemplo, del 'Primer Semestre 2023', no podrás, ya que ese período ya es pasado.
      Ya terminó en la universidad. Lo mismo si intentas crear uno de 'Vacaciones Junio 2023'. Solo podrás crear períodos que se estén cursando en ese momento y posteriores.
      Por ejemplo, sí podrás crear un período 'Segundo Semestre 2023', 'Vacaciones Diciembre 2023', y de cualquier tipo del 2024 en adelante:
      'Primer Semestre 2024', 'Vacaciones Junio 2027'...
    </p>

    <p>
      Por eso antes de crear períodos verifica siempre la fecha en la que estás tratando crearlos, y chequea si es posible. Si intentas crear uno que ya ha "expirado", te mostrará un error.
    </p>
    <b class="mt-4">Al ingresar a <u><nuxt-link class="text-gray-700 hover:text-gray-600" to="/my-route">Mi Ruta</nuxt-link></u>, me dice que se van a eliminar períodos "expirados", ¿qué significa eso?</b>
    <p>
      Como se decía en la pregunta anterior, no pueden haber períodos expirados. Si por ejemplo tenías "Vacaciones Diciembre 2023" con ciertos cursos, si visitas
      <u><nuxt-link class="text-gray-700 hover:text-gray-600" to="/my-route">Mi Ruta</nuxt-link></u> en, por ejemplo, enero del 2024, te enviará este mensaje. </p>
      <p> Este mensaje dice que podrás acceder a tu ruta
      luego que se hayan borrado todos los períodos expirados (lee la pregunta anterior para entender qué es un 'período expirado'), y los cursos quedarán "libres", listos para ya sea asignarlos a otro período o marcarlos
      como 'Aprobados'.
    </p>
    <hr class="my-2" />
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
    <p>Contáctame enviándome un correo a deidarachamp@gmail.com</p>
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