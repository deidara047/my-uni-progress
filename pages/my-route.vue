<style lang="scss" scoped>
.courses-season-panel {
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23cbcbcb' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
}

.change-season-button {
  transition: .1s ease background-color
}

.season-card-slider {

  /* 1311px max */
  @media (min-width: 1311px) {
    width: 568px;
  }

  @media (min-width: 1536px) {
    width: 802px;
  }
}

.select-semester-panel {
  max-height: 500px;

  &::-webkit-scrollbar {
    width: 7px;
    /* Ancho del scrollbar */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    /* Color del thumb */
    border-radius: 5px;
    /* Bordes redondeados del thumb */
    transition: .2s ease all;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #aaa;
    /* Color del thumb */
    border-radius: 5px;
    /* Bordes redondeados del thumb */
  }
}
</style>

<template>
  <main class="container mx-auto my-6">
    <div>
      <div class="flex" style="min-height: 800px;">
        <div class="py-4 px-5 border">
          <template v-if="dataLeftPanelLoaded === true">
            <div class="flex justify-end">
              <ToggleBoxButton :state="isLeftColumnOpened"
                @right-button-clicked="() => { isLeftColumnOpened = !isLeftColumnOpened; calcWidthSeasonCardSlider() }" />
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
                  <button :disabled="searchCriteria != ''"
                    class="border border-slate-300 disabled:bg-[#f1f5f94b] disabled:text-gray-300 enabled:hover:bg-slate-100 transition rounded-md p-1"
                    @click="() => increaseSemLPanIndex()">
                    <font-awesome-icon :icon="['fas', 'angle-left']" size="xl" />
                  </button>
                  <button :disabled="searchCriteria != ''"
                    class="border border-slate-300 disabled:bg-[#f1f5f94b] disabled:text-gray-300 enabled:hover:bg-slate-100 transition rounded-md ml-2 p-1"
                    @click="() => decreaseSemLPanIndex()">
                    <font-awesome-icon :icon="['fas', 'angle-right']" size="xl" />
                  </button>
                </div>
                <div class="pt-1 flex justify-center overflow-auto select-semester-panel">
                  <SemesterCard @drag-course-start="({ code }) => currentDraggedCourseCode = code"
                    @drag-course-end="() => currentDraggedCourseCode = ''" type-course-cards="draggable"
                    :is-searching="searchCriteria != ''" :semester-data="coursesForLeftPanel" />
                </div>
              </div>
            </div>
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
        <div class="courses-season-panel flex flex-col grow p-4 border">
          <div class="mt-4">
            <p v-show="viewport > 0 && viewport < 1311"><span class="text-yellow-500 font-bold">Advertencia: </span> Tu
              pantalla es muy
              pequeña (en ancho): Se recomienda que tu viewport sea mayor o igual que 1311px. Disminuye el zoom de tu
              navegador o deberás conseguir una pantalla más grande.</p>
            <h1 class="font-bold text-3xl">Mi ruta</h1>
          </div>
          <div class="grow flex justify-center items-center">
            <div class="py-5">
              <SeasonCardSliderContainer @new-season-data-submitted="(newSeasonData) => addNewSeason(newSeasonData)"
                @dropped-course="(data) => pushCourseToSeasonByTypeAndYear(data.type, data.year)"
                @clicked-x-button-course="({ code, type, year }) => deleteCourseFromSeasonByTypeAndYear(code, type, year)"
                @clicked-x-button-season="({ type, year }) => deleteSeasonByTypeAndYear(type, year)"
                :seasons-data="seasonsData" :slidesPerView="slidesPerViewSCSC" :style="getWidthSCSC"
                class="season-card-slider" ref="SCSCComponent" />
            </div>
          </div>
        </div>
        <div class="py-4 px-5 border">
          <template v-if="coursesData.length > 0">
            <MainRightCol
              @right-button-clicked="() => { isRightColumnOpened = !isRightColumnOpened; calcWidthSeasonCardSlider() }"
              :course-data="coursesData" :is-progreso-section-opened="false" page-that-uses-this-component="MyRoute" />
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
import Swal from 'sweetalert2'
const dataLeftPanelLoaded = ref(false);

const coursesData = reactive([]);
/*
  Format of seasonData (next app I'll use typescript I promise ^w^)
[
  {
    type: String,
    year: String,
    courses: Array<String> // Array de code de cursos
  }
]
 */
const seasonsData = reactive([]);

const currentDraggedCourseCode = ref("");

const searchCriteria = ref("");
const currentSemLPanIndex = ref(0);
const isLeftColumnOpened = ref(true);
const isRightColumnOpened = ref(true);
const semsWithNoPassed = ref([]);
/* All this so SeasonCardSliderContainer.vue can have a decent width */
const viewport = ref(0);
const widthSeasonCardSliderContainer = ref(null);
const getWidthSCSC = computed(() => {
  return widthSeasonCardSliderContainer.value !== null ? { width: widthSeasonCardSliderContainer.value + 'px' } : {}
});

const SCSCComponent = ref(null)

const slidesPerViewSCSC = ref(1);

const coursesForLeftPanel = computed(() => {
  if (semsWithNoPassed.value.length > 0) {
    if (searchCriteria.value === "") {
      if (seasonsData.length > 0) {
        return coursesData.filter((course) => (course.semester === semsWithNoPassed.value[currentSemLPanIndex.value] && course.isPassed === false && !seasonsData.some(season => season.courses.includes(course))));
      } else {
        return coursesData.filter((course) => (course.semester === semsWithNoPassed.value[currentSemLPanIndex.value] && course.isPassed === false));
      }
    } else {
      if (seasonsData.length > 0) {
        return coursesData.filter((course) => (course.code.includes(searchCriteria.value.trim()) || removeAccents(course.name.toLowerCase()).includes(removeAccents(searchCriteria.value.trim()))) && !seasonsData.some(season => season.courses.includes(course))).slice(0, 6);
      } else {
        return coursesData.filter((course) => (course.code.includes(searchCriteria.value.trim()) || removeAccents(course.name.toLowerCase()).includes(removeAccents(searchCriteria.value.trim())))).slice(0, 6);
      }
    }
  }
});

onMounted(() => {
  coursesData.push(...data);

  // Method: find the lowest semester number with unpassed courses left
  let semCounter = 1;

  while (true) {
    if ([...coursesData.filter((course) => (course.semester === semCounter && course.isPassed === false))].length > 0) {
      semsWithNoPassed.value.push(semCounter);
    }

    if (semCounter === 10) break;
    semCounter++;
  }
  // EndMethod

  dataLeftPanelLoaded.value = true;
  const handleResize = () => {
    viewport.value = window.innerWidth;
    calcWidthSeasonCardSlider();
  }

  handleResize();
  calcWidthSeasonCardSlider();

  window.addEventListener("resize", handleResize);
  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
  })
});

watch(seasonsData, (newVal, oldVal) => {
  /* If coursesForLeftPanel.value.length === 0, i.e., no course is left in the
     current Semester in the left panel, removes the current Semester from left panel and
     goes to the lowest semester with no passed courses left
  */
  if (coursesForLeftPanel.value.length === 0) {
    semsWithNoPassed.value.splice(currentSemLPanIndex.value, 1);
  }
})

function addNewSeason(newSeasonData) {
  const { type, year } = newSeasonData;

  if (seasonsData.find((season) => season.year === year && season.type === type)) {
    Swal.fire(
      'Período ya existente',
      "Ya existe un período con temporada '" + getTypeNameByTypeCode(type) + "' y con año '" + year + "'",
      "error"
    );
  } else {
    seasonsData.push({ ...newSeasonData, courses: [] });
    SCSCComponent.value.goToSlide(type, year);
  }
}

/* Here is where I leveraged the almost-static breakpoints of TailwindCSS and I had to put every situation */
function calcWidthSeasonCardSlider() {
  if (isLeftColumnOpened.value) {
    if (!isRightColumnOpened.value) {
      // L:1 R:0
      if (window.innerWidth >= 1536) {
        widthSeasonCardSliderContainer.value = 1058;
        slidesPerViewSCSC.value = 2;
      } else if (window.innerWidth >= 1311 && window.innerWidth < 1536) {
        widthSeasonCardSliderContainer.value = 802;
        slidesPerViewSCSC.value = 1;
      }
    } else {
      // L:1 R:1
      widthSeasonCardSliderContainer.value = null;
      slidesPerViewSCSC.value = 1;
    }
  } else {
    if (isRightColumnOpened.value) {
      // L:0 R:1
      if (window.innerWidth >= 1536) {
        widthSeasonCardSliderContainer.value = 1110;
        slidesPerViewSCSC.value = 2;
      } else if (window.innerWidth >= 1311 && window.innerWidth < 1536) {
        widthSeasonCardSliderContainer.value = 854;
        slidesPerViewSCSC.value = 2;
      }
    } else {
      // L:0 R:0
      if (window.innerWidth >= 1536) {
        widthSeasonCardSliderContainer.value = 1344;
        slidesPerViewSCSC.value = 3;
      } else if (window.innerWidth >= 1311 && window.innerWidth < 1536) {
        widthSeasonCardSliderContainer.value = 1088;
        slidesPerViewSCSC.value = 2;
      }
    }
  }
}


/* Copied from 'CoursesSeasonCard.vue' */
function getTypeNameByTypeCode(typeCode) {
  switch (typeCode) {
    case "first-semester":
      return "Primer Semestre";
    case "vacations-june":
      return "Vacaciones Junio";
    case "second-semester":
      return "Segundo Semestre";
    case "vacations-december":
      return "Vacaciones Diciembre";
  }
}

function pushCourseToSeasonByTypeAndYear(type, year) {
  for (let i = 0; i < seasonsData.length; i++) {
    if (seasonsData[i].year === year && seasonsData[i].type === type && currentDraggedCourseCode.value != "") {
      seasonsData[i].courses.push(coursesData.find((course) => course.code === currentDraggedCourseCode.value))
    }
  }
}

function deleteCourseFromSeasonByTypeAndYear(code, type, year) {
  for (let i = 0; i < seasonsData.length; i++) {
    if (seasonsData[i].year === year && seasonsData[i].type === type) {
      console.log(seasonsData[i])
      seasonsData[i].courses.splice(seasonsData[i].courses.findIndex((course) => course.code === code), 1)
    }
  }
}

function deleteSeasonByTypeAndYear(type, year) {
  Swal.fire({
    title: 'Eliminar período',
    text: "¿Está seguro de eliminar este período?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Eliminar'
  }).then((result) => {
    if (result.isConfirmed) {
      for (let i = 0; i < seasonsData.length; i++) {
        if (seasonsData[i].year === year && seasonsData[i].type === type) {
          seasonsData.splice(i, 1);
        }
      }

      Swal.fire(
        'Período Eliminado',
        'El período ha sido eliminado con éxito',
        'success'
      )
    }
  })
}

/* Those have a circular behaviour. Let N be length of array. When currentSemLPanIndex reaches N, on increase goes back 
   to 0, and viceversa
   Credits to this algorith: ChatGPT
*/
const increaseSemLPanIndex = () => {
  currentSemLPanIndex.value = (currentSemLPanIndex.value - 1 + semsWithNoPassed.value.length) % semsWithNoPassed.value.length;
};

const decreaseSemLPanIndex = () => {
  currentSemLPanIndex.value = (currentSemLPanIndex.value + 1) % semsWithNoPassed.value.length;
};

function removeAccents(text) {
  const accentsMap = {
    'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
    'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U',
    'ü': 'u', 'Ü': 'U', 'ñ': 'n', 'Ñ': 'N'
  };

  return text.replace(/[áéíóúÁÉÍÓÚüÜñÑ]/g, match => accentsMap[match]);
}


</script>