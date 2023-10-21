<style scoped lang="scss">
.tabs {
  @apply inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300;

  &.active {
    @apply text-blue-600 border-blue-600
  }
}
</style>

<template>
  <main class="container mx-auto my-6">
    <h1 class="font-bold text-3xl">Mi Perfil</h1>
    <h2 class="font-bold text-2xl mt-2">Hola Luis (espero que seas Luis 😑)</h2>

    <p class="mt-2">En esta tabla tienes todos los cursos. Aquí puedes marcar si ya aprobaste un curso o viceversa.</p>

    <template v-if="coursesData.length > 0">
      <div class="mt-3">
        <b>Buscar curso por nombre o código</b>
        <div class="flex items-center max-w-[400px] mt-1">
          <label for="simple-search" class="sr-only">Search</label>
          <div class="relative w-full">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path :stroke="coursesThatAreLoading.length > 0 ? '#aaa' : 'black'" stroke-linecap="round"
                  stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
              <span class="sr-only">Search</span>
            </div>
            <input type="text" id="simple-search" :disabled="coursesThatAreLoading.length > 0"
              class="bg-gray-50 disabled:opacity-40 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 outline-none"
              placeholder="Buscar curso" v-model="searchCriteria" />
          </div>
        </div>
      </div>

      <div class="border border-gray-200 mt-4 rounded-md">
        <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
          <ul class="flex flex-wrap -mb-px">
            <li class="mr-2">
              <button class="tabs" :disabled="coursesThatAreLoading.length > 0"
                :class="{ 'active': currentTab === 'all', 'opacity-40': coursesThatAreLoading.length > 0 }"
                @click="() => currentTab = 'all'">Todos</button>
            </li>
            <li class="mr-2">
              <button class="tabs" :disabled="coursesThatAreLoading.length > 0"
                :class="{ 'active': currentTab === 'approved-courses', 'opacity-40': coursesThatAreLoading.length > 0 }"
                @click="() => currentTab = 'approved-courses'">Cursos Aprobados</button>
            </li>
            <li class="mr-2">
              <button class="tabs" :disabled="coursesThatAreLoading.length > 0"
                :class="{ 'active': currentTab === 'not-approved-courses', 'opacity-40': coursesThatAreLoading.length > 0 }"
                @click="() => currentTab = 'not-approved-courses'">Cursos
                No Aprobados</button>
            </li>
          </ul>
        </div>

        <div class="relative overflow-auto h-[450px]  my-5">
          <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" style="width: 1px; white-space: nowrap;" class="px-6 py-3 text-end">
                  #
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                  Código
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                  Curso
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                  Semestre
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                  Es obligatorio
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                  Aprobación
                </th>
              </tr>
            </thead>
            <tbody>
              <template v-if="coursesForTable.length > 0">
                <RowCoursesTable v-for="(crs, index) in coursesForTable" :key="crs.code"
                  @approve-button-clicked="(type, code) => onApproveButtonClicked(type, code)" :index="index"
                  :code="crs.code" :name="crs.name" :semester="crs.semester" :is-passed="crs.is_passed"
                  :is-required="crs.is_required" :is-loading="crs.isLoading" />
              </template>
              <template v-else>
                <tr class="text-center">
                  <td colspan="100" class="text-lg py-3 text-gray-600">
                    No se encontró ningún curso
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </template>
    <div class="w-full p-5 bg-slate-100 mt-5 rounded-lg flex items-center justify-center" v-else>
      <Spinner></Spinner>
    </div>
  </main>
</template>

<script setup>
const supabase = useSupabaseClient();
const currentTab = ref("all");
const coursesData = ref([]);
const searchCriteria = ref("");
const coursesThatAreLoading = ref([]);

const coursesForTable = computed(() => {
  // (course.code.includes(searchCriteria.value.trim()) || removeAccents(course.name.toLowerCase()).includes(removeAccents(searchCriteria.value.trim())))
  if (searchCriteria.value === "") {
    if (currentTab.value === "approved-courses") {
      return [...coursesData.value.filter(course => (course.isPassed === true || course.is_passed === true))];
    } else if (currentTab.value === "not-approved-courses") {
      return [...coursesData.value.filter(course => (course.isPassed === false || course.is_passed === false))];
    } else if (currentTab.value === "all") {
      return coursesData.value;
    }
  } else {
    if (currentTab.value === "approved-courses") {
      return [...coursesData.value.filter(course => (course.code.includes(searchCriteria.value.trim()) || removeAccents(course.name.toLowerCase()).includes(removeAccents(searchCriteria.value.trim()))) && (course.isPassed === true || course.is_passed === true))];
    } else if (currentTab.value === "not-approved-courses") {
      return [...coursesData.value.filter(course => (course.code.includes(searchCriteria.value.trim()) || removeAccents(course.name.toLowerCase()).includes(removeAccents(searchCriteria.value.trim()))) && (course.isPassed === false || course.is_passed === false))];
    } else if (currentTab.value === "all") {
      return [...coursesData.value.filter(course => (course.code.includes(searchCriteria.value.trim()) || removeAccents(course.name.toLowerCase()).includes(removeAccents(searchCriteria.value.trim()))))];
    }
  }

});

useHead({
  title: "Mi Perfil | Progreso FIUSAC"
});

onMounted(() => {
  hydrateCoursesData();
});

function onApproveButtonClicked(type, code) {
  function deleteCode(codeToDelete) {
    const idxToDelete = coursesThatAreLoading.value.indexOf(codeToDelete);

    if (idxToDelete !== -1) {
      coursesThatAreLoading.value.splice(idxToDelete, 1);
    }
  }

  const idxCourse = coursesData.value.findIndex(crs => crs.code === code);

  if (idxCourse !== -1) {
    coursesData.value[idxCourse].isLoading = true;
    coursesThatAreLoading.value.push(code);

    supabase
      .from('course')
      .update({ is_passed: type === "approve" })
      .eq('code', code)
      .select()
      .then(({ error }) => {
        if (error === null) {
          coursesData.value[idxCourse].is_passed = type === "approve";
          coursesData.value[idxCourse].isLoading = false;
          deleteCode(code);
        } else {
          console.error(error);
        }
      });


    /*
    setTimeout(() => {
      
    }, 2000);
    */
  }
}

async function hydrateCoursesData() {
  coursesData.value.splice(0, coursesData.value.length);
  let crs = await supabase
    .from("course")
    .select("*");

  coursesData.value.push(...crs.data.map((crs) => ({
    ...crs,
    isLoading: false
  })));
}


/*
  You can find this function in my-route.vue
  Next time I will have these somewhere accesible for all pages and components instead of copy them
*/
function removeAccents(text) {
  const accentsMap = {
    'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
    'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U',
    'ü': 'u', 'Ü': 'U', 'ñ': 'n', 'Ñ': 'N'
  };

  return text.replace(/[áéíóúÁÉÍÓÚüÜñÑ]/g, match => accentsMap[match]);
}
</script>