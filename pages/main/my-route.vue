<style lang="scss" scoped>
.courses-season-panel {
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23cbcbcb' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
}

.change-season-button {
  transition: .1s ease background-color
}
</style>

<template>
  <main class="container mx-auto my-6">
    <div>
      <div class="flex">
        <div class="py-4 px-5 border">
          <div class="flex justify-end">
            <ToggleBoxButton @right-button-clicked="isLeftColumnOpened = !isLeftColumnOpened" />
          </div>
          <div v-show="isLeftColumnOpened">
            <h1 class="text-2xl font-semibold">Cursos</h1>
            <hr />
            <p class="pt-2 max-w-[300px]">Arrastra el curso al período que vayas a cursarlo</p>
            <div class="pt-2">
              <div>
                <!--font-awesome-icon :icon="['fas', 'magnifying-glass']" /-->
                <input type="text" placeholder="Buscar curso..." v-model="searchCriteria" class="text-input w-full" />
              </div>
              <div class="flex justify-end py-2">
                <button class="border border-slate-300 hover:bg-slate-100 transition rounded-md p-1"><font-awesome-icon :icon="['fas', 'angle-left']"
                    size="xl" /></button>
                <button class="border border-slate-300 hover:bg-slate-100 transition rounded-md ml-2 p-1"><font-awesome-icon
                    :icon="['fas', 'angle-right']" size="xl" /></button>
              </div>
              <div class="pt-1 flex justify-center">
                <template v-if="currentSemesterLeftPanel != null">
                  <SemesterCard :semester-data="coursesForLeftPanel" />
                </template>
                <div v-else>
                  <div role="status">
                    <div role="status">
                      <svg aria-hidden="true"
                        class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor" />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill" />
                      </svg>
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div class="courses-season-panel flex flex-col grow p-4 border">
          <div>
            <h1 class="font-bold text-3xl">Mi ruta</h1>
          </div>
          <div class="border grow">
            <!--div class="border flex items-center border-purple-700">
              <button
                class="border change-season-button shadow active:translate-y-0.5 bg-[#4b4c4e] hover:bg-[#717274] text-white px-4 py-9 rounded-md"><font-awesome-icon
                  :icon="['fas', 'chevron-left']" size="xl" /></button>
            </div-->
            <div class="border border-red-500">
              <SeasonCardSliderContainer />
            </div>

            <!--div class="border flex items-center border-purple-700">
              <button
                class="border change-season-button boton-sexo shadow active:translate-y-0.5 bg-[#4b4c4e] hover:bg-[#717274] text-white px-4 py-9 rounded-md"><font-awesome-icon
                  :icon="['fas', 'chevron-right']" size="xl" /></button>
            </div-->
          </div>

        </div>
        <div class="py-4 px-5 border">
          <template v-if="coursesData.length > 0">
            <MainRightCol :course-data="coursesData" page-that-uses-this-component="MyRoute" />
          </template>
          <div v-else class="pt-5 text-center">
            <div role="status">
              <div role="status">
                <svg aria-hidden="true"
                  class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor" />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill" />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4 p-5 border">
        <div>
          <h1 class="font-bold text-2xl">Visualización de cursos</h1>
          <hr class="border" />
          <p class="mt-2 text-lg">Si quieres saber mejor cuál curso seleccionar, dale clic al curso del cual deseas
            consultar su información
          </p>
        </div>
        <template v-if="coursesData.length > 0">
          <SemestersContainer class="mt-4" :courses-data="coursesData" />
        </template>
        <div v-else class="pt-5 text-center">
          <div role="status">
            <div role="status">
              <svg aria-hidden="true"
                class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor" />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill" />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import data from "@/assets/json/coursesData.json";

const coursesData = reactive([]);
const searchCriteria = ref("");
const currentSemesterLeftPanel = ref(null);
const isLeftColumnOpened = ref(true);

const coursesForLeftPanel = computed(() => {
  return [...coursesData.filter((course) => (course.semester === currentSemesterLeftPanel.value && course.isPassed === false))]
});

onMounted(() => {
  coursesData.push(...data);

  // Method: find the lowest semester number with unpassed courses left
  let foundedSem = null;
  let semCounter = 1;

  while (foundedSem === null) {
    if ([...coursesData.filter((course) => (course.semester === semCounter && course.isPassed === false))].length > 0) {
      currentSemesterLeftPanel.value = semCounter;
      foundedSem = semCounter;
    } else {
      semCounter++;
    }
  }
  // EndMethod
});


</script>