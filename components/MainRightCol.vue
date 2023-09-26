<style lang="scss" scoped>
.content {
  transition: max-height 0.2s ease-out;
}

.progress-info {
  max-height: 400px;
  overflow-x: hidden;
  overflow-y: auto;

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
  <div>
    <div class="flex justify-end">
      <button @click="() => { emit('right-button-clicked'); isThisColumnOpened = !isThisColumnOpened }"
        class="hover:bg-slate-200 border font-bold py-1 px-2.5 rounded-full"><font-awesome-icon
          :icon="['fas', (isThisColumnOpened ? 'xmark' : 'align-right')]" size="sm" /></button>
    </div>
    <div v-show="isThisColumnOpened">
      <h1 class="mb-2"
        :class="{ 'text-3xl font-bold': pageThatUsesThisComponent === 'MyIndex', 'text-2xl font-semibold': pageThatUsesThisComponent === 'MyRoute' }">
        Estadísticas</h1>
      <hr class="border" />
      <div class="mt-4 r-card-paddingless">
        <div @click="toggleGeneralProgressPanel" class="cursor-pointer px-4 py-3 flex justify-between"
          :class="{ 'w-[276px]': pageThatUsesThisComponent === 'MyRoute' }">
          <h2 style="user-select: none;" class="font-bold"
            :class="{ 'text-2xl': pageThatUsesThisComponent === 'MyIndex', 'text-lg': pageThatUsesThisComponent === 'MyRoute' }">
            Progreso{{ pageThatUsesThisComponent === 'MyRoute' ? ' general' : '' }}</h2>
          <font-awesome-icon v-if="!isGeneralProgressPanelOpened" icon="fa-solid fa-chevron-down" class="mt-2" />
          <font-awesome-icon v-else icon="fa-solid fa-chevron-up" class="mt-2" />
        </div>
        <div class="content" v-show="isGeneralProgressPanelOpened"
          :class="{ 'max-h-fit': isGeneralProgressPanelOpened, 'px-4': isGeneralProgressPanelOpened, 'py-3': isGeneralProgressPanelOpened, 'progress-info': pageThatUsesThisComponent === 'MyRoute' }">
          <p v-if="pageThatUsesThisComponent === 'MyRoute'" class="my-2">Gráficas de tus cursos <span class="font-semibold italic">ganados.</span></p>
          <hr v-if="pageThatUsesThisComponent === 'MyRoute'" class="mb-2" />
          <span class="text-gray-600" v-if="((getSumCreditsOfCoursesArr(passedCourses) / 300) * 100) >= 100"><font-awesome-icon class="text-amber-500" :icon="['fas', 'medal']" /> Pensum cerrado</span>
          <ul class="list-none list-inside">
            <li><span class="font-bold"><font-awesome-icon v-if="((getSumCreditsOfCoursesArr(passedCoreCourses) / getSumCreditsOfCoursesArr(coreCourses)) * 100) >= 100"  :icon="['fas', 'check']" style="color: #0c4f14;" /> Cursos obligatorios:</span></li>
            <li>
              <ul class="ml-4">
                <li><span class="font-bold">- Ganados: </span> {{ passedCoreCourses.length + "/" + coreCourses.length +
                  ": "
                }}
                  <span class="text-fuchsia-800">{{ coreCourses.length - passedCoreCourses.length }}</span>
                </li>
                <li><span class="font-bold">- Créditos: </span> {{ getSumCreditsOfCoursesArr(passedCoreCourses) + "/" +
                  getSumCreditsOfCoursesArr(coreCourses) + ": " }} <span class="text-fuchsia-800">{{
  getSumCreditsOfCoursesArr(coreCourses) - getSumCreditsOfCoursesArr(passedCoreCourses) }}</span></li>
              </ul>
            </li>
            <li>
              <div class="flex justify-center my-3">
                <CircularProgressBar
                  :percentage="((getSumCreditsOfCoursesArr(passedCoreCourses) / getSumCreditsOfCoursesArr(coreCourses)) * 100) < 100 ? (getSumCreditsOfCoursesArr(passedCoreCourses) / getSumCreditsOfCoursesArr(coreCourses)) * 100: 100"
                  text="Progreso obligatorios" />
              </div>
            </li>
            <li><span class="font-bold"><font-awesome-icon v-if="((getSumCreditsOfCoursesArr(passedElectiveCourses) / Number(300 - getSumCreditsOfCoursesArr(coreCourses))) * 100) >= 100" :icon="['fas', 'check']" style="color: #0c4f14;" /> Cursos no obligatorios:</span></li>
            <li>
              <ul class="ml-4">
                <li><span class="font-bold">- Ganados: </span> {{ passedElectiveCourses.length + "/" +
                  electiveCourses.length
                  + ": " }} <span class="text-fuchsia-800">{{ electiveCourses.length - passedElectiveCourses.length
                }}</span>
                </li>
                <li><span class="font-bold">- Créditos: </span> {{ getSumCreditsOfCoursesArr(passedElectiveCourses) +
                  "/" +
                  Number(300 - getSumCreditsOfCoursesArr(coreCourses)) + " de " +
                  getSumCreditsOfCoursesArr(electiveCourses)
                  +
                  ": " }} <span class="text-fuchsia-800">{{ Number(300 - getSumCreditsOfCoursesArr(coreCourses)) -
  getSumCreditsOfCoursesArr(passedElectiveCourses) }}</span></li>
              </ul>
            </li>
            <li>
              <div class="flex justify-center my-3">
                <CircularProgressBar
                  :percentage="((getSumCreditsOfCoursesArr(passedElectiveCourses) / Number(300 - getSumCreditsOfCoursesArr(coreCourses))) * 100) < 100 ? (getSumCreditsOfCoursesArr(passedElectiveCourses) / Number(300 - getSumCreditsOfCoursesArr(coreCourses))) * 100 : 100"
                  text="Progreso no obligatorios" />
              </div>
            </li>
            <li><span class="font-bold"><font-awesome-icon v-if="((getSumCreditsOfCoursesArr(passedCourses) / 300) * 100) >= 100" :icon="['fas', 'check']" style="color: #0c4f14;" /> Total:</span></li>
            <li>
              <ul class="ml-4">
                <li><span class="font-bold">- Ganados: </span> {{ passedCourses.length + "/" + coursesData.length + ": "
                }}
                  <span class="text-fuchsia-800">{{ coursesData.length - passedCourses.length }}</span>
                </li>
                <li><span class="font-bold">- Créditos: </span> {{ getSumCreditsOfCoursesArr(passedCourses) + "/300 de "
                  +
                  getSumCreditsOfCoursesArr(coursesData) + ": " }} <span class="text-fuchsia-800">{{ 300 -
  getSumCreditsOfCoursesArr(passedCourses) }}</span></li>
              </ul>
            </li>
            <li>
              <div class="flex justify-center my-3">
                <CircularProgressBar :percentage="((getSumCreditsOfCoursesArr(passedCourses) / 300) * 100) < 100 ? (getSumCreditsOfCoursesArr(passedCourses) / 300) * 100: 100"
                  text="Total progreso" />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div v-if="pageThatUsesThisComponent === 'MyRoute'" class="mt-4 w-[279px] r-card-paddingless">
        <div @click="toggleMyRouteStatsPanel" class="cursor-pointer px-4 py-3 flex justify-between">
          <h2 style="user-select: none;" class="font-bold"
            :class="{ 'text-2xl': pageThatUsesThisComponent === 'MyIndex', 'text-lg': pageThatUsesThisComponent === 'MyRoute' }">
            <font-awesome-icon :icon="['fas', 'chart-pie']" /> Mi Ruta</h2>
          <font-awesome-icon v-if="!isMyRouteStatsPanelOpened" icon="fa-solid fa-chevron-down" class="mt-2" />
          <font-awesome-icon v-else icon="fa-solid fa-chevron-up" class="mt-2" />
        </div>
        <div class="content progress-info" v-show="isMyRouteStatsPanelOpened"
          :class="{ 'max-h-fit': isMyRouteStatsPanelOpened, 'px-4': isMyRouteStatsPanelOpened, 'py-3': isMyRouteStatsPanelOpened }">
          <p class="mb-2">Gráficas de tus cursos <span class="font-semibold italic">ganados + seleccionados</span> en la ruta.</p>
          <hr class="mb-2" />
          <span class="text-gray-600" v-if="(((Number(getSumCreditsOfCoursesArr(passedCourses) + getSumCreditsOfCoursesArr(seasonsCourses))) / 300) * 100) >= 100"><font-awesome-icon class="text-amber-500" :icon="['fas', 'medal']" /> Pensum cerrado</span>
          <ul class="list-none list-inside">
            <li><span class="font-bold"><font-awesome-icon v-if="(((Number(getSumCreditsOfCoursesArr(passedCoreCourses) + getSumCreditsOfCoursesArr(coreSeasonsCourses))) / getSumCreditsOfCoursesArr(coreCourses)) * 100) >= 100" :icon="['fas', 'check']" style="color: #0c4f14;" /> Cursos obligatorios:</span></li>
            <li>
              <ul class="ml-4">
                <li><span class="font-bold">- Cantidad: </span> 
                  <span>
                    {{ 
                      (Number(passedCoreCourses.length + coreSeasonsCourses.length)) + "/" + coreCourses.length + ": "
                    }}
                  </span>
                  <span class="text-fuchsia-800">{{ coreCourses.length - (Number(passedCoreCourses.length + coreSeasonsCourses.length)) }}</span>
                </li>
                <li><span class="font-bold">- Créditos: </span> 
                {{ 
                    (Number(getSumCreditsOfCoursesArr(passedCoreCourses) + getSumCreditsOfCoursesArr(coreSeasonsCourses)))
                   + "/" +
                  getSumCreditsOfCoursesArr(coreCourses) + ": " }} 
                  <span class="text-fuchsia-800">{{
  getSumCreditsOfCoursesArr(coreCourses) - (Number(getSumCreditsOfCoursesArr(passedCoreCourses) + getSumCreditsOfCoursesArr(coreSeasonsCourses))) }}</span></li>
              </ul>
            </li>
            <li>
              <div class="flex justify-center my-3">
                <CircularProgressBar
                  :percentage="(((Number(getSumCreditsOfCoursesArr(passedCoreCourses) + getSumCreditsOfCoursesArr(coreSeasonsCourses))) / getSumCreditsOfCoursesArr(coreCourses)) * 100) < 100 ? ((Number(getSumCreditsOfCoursesArr(passedCoreCourses) + getSumCreditsOfCoursesArr(coreSeasonsCourses))) / getSumCreditsOfCoursesArr(coreCourses)) * 100 : 100"
                  text="Progreso obligatorios" />
              </div>
            </li>
            <li><span class="font-bold"><font-awesome-icon v-if="(((Number(getSumCreditsOfCoursesArr(passedElectiveCourses) + getSumCreditsOfCoursesArr(electiveSeasonsCourses))) / Number(300 - getSumCreditsOfCoursesArr(coreCourses))) * 100) >= 100" :icon="['fas', 'check']" style="color: #0c4f14;" /> Cursos no obligatorios:</span></li>
            <li>
              <ul class="ml-4">
                <li><span class="font-bold">- Cantidad: </span> {{ (Number(passedElectiveCourses.length + electiveSeasonsCourses.length)) + "/" +
                  electiveCourses.length
                  + ": " }} <span class="text-fuchsia-800">{{ electiveCourses.length - (Number(passedElectiveCourses.length + electiveSeasonsCourses.length))
                }}</span>
                </li>
                <li><span class="font-bold">- Créditos: </span> {{ (Number(getSumCreditsOfCoursesArr(passedElectiveCourses) + getSumCreditsOfCoursesArr(electiveSeasonsCourses))) +
                  "/" +
                  Number(300 - getSumCreditsOfCoursesArr(coreCourses)) + " de " +
                  getSumCreditsOfCoursesArr(electiveCourses)
                  +
                  ": " }} <span class="text-fuchsia-800">{{ Number(300 - getSumCreditsOfCoursesArr(coreCourses)) -
                    (Number(getSumCreditsOfCoursesArr(passedElectiveCourses) + getSumCreditsOfCoursesArr(electiveSeasonsCourses))) }}</span></li>
              </ul>
            </li>
            <li>
              <div class="flex justify-center my-3">
                <CircularProgressBar
                  :percentage="(((Number(getSumCreditsOfCoursesArr(passedElectiveCourses) + getSumCreditsOfCoursesArr(electiveSeasonsCourses))) / Number(300 - getSumCreditsOfCoursesArr(coreCourses))) * 100) < 100 ? ((Number(getSumCreditsOfCoursesArr(passedElectiveCourses) + getSumCreditsOfCoursesArr(electiveSeasonsCourses))) / Number(300 - getSumCreditsOfCoursesArr(coreCourses))) * 100 : 100"
                  text="Progreso no obligatorios" />
              </div>
            </li>
            <li><span class="font-bold"><font-awesome-icon v-if="(((Number(getSumCreditsOfCoursesArr(passedCourses) + getSumCreditsOfCoursesArr(seasonsCourses))) / 300) * 100) > 100" :icon="['fas', 'check']" style="color: #0c4f14;" /> Total:</span></li>
            <li>
              <ul class="ml-4">
                <li><span class="font-bold">- Cantidad: </span> {{ (Number(passedCourses.length + seasonsCourses.length)) + "/" + coursesData.length + ": "
                }}
                  <span class="text-fuchsia-800">{{ coursesData.length - (Number(passedCourses.length + seasonsCourses.length)) }}</span>
                </li>
                <li><span class="font-bold">- Créditos: </span> {{ (Number(getSumCreditsOfCoursesArr(passedCourses) + getSumCreditsOfCoursesArr(seasonsCourses))) + "/300 de "
                  +
                  getSumCreditsOfCoursesArr(coursesData) + ": " }} <span class="text-fuchsia-800">{{ 300 -
                    (Number(getSumCreditsOfCoursesArr(passedCourses) + getSumCreditsOfCoursesArr(seasonsCourses))) }}</span></li>
              </ul>
            </li>
            <li>
              <div class="flex justify-center my-3">
                <CircularProgressBar :percentage="(((Number(getSumCreditsOfCoursesArr(passedCourses) + getSumCreditsOfCoursesArr(seasonsCourses))) / 300) * 100) < 100 ? ((Number(getSumCreditsOfCoursesArr(passedCourses) + getSumCreditsOfCoursesArr(seasonsCourses))) / 300) * 100 : 100"
                  text="Total progreso" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CircularProgressBar from './CircularProgressBar.vue';

const isThisColumnOpened = ref(true);
const isGeneralProgressPanelOpened = ref(true);
const isMyRouteStatsPanelOpened = ref(true);

const props = defineProps({
  coursesData: {
    type: Array,
    required: true
  },
  pageThatUsesThisComponent: {
    type: String,
    default: "MyIndex"
  },
  isGeneralProgressPanelOpened: {
    type: Boolean,
    default: true
  },
  seasonsData: {
    type: Array,
    default: []
  }
});

onMounted(() => {
  isGeneralProgressPanelOpened.value = props.isGeneralProgressPanelOpened;
});

const emit = defineEmits(["right-button-clicked"])

function toggleGeneralProgressPanel() {
  isGeneralProgressPanelOpened.value = !isGeneralProgressPanelOpened.value
}

function toggleMyRouteStatsPanel() {
  isMyRouteStatsPanelOpened.value = !isMyRouteStatsPanelOpened.value
}

const coreSeasonsCourses = computed(() => {
  if(props.seasonsData.length > 0) {
    return props.seasonsData.reduce((collector, elem) => {
      if(elem.courses.length > 0) {
        return collector.concat(elem.courses.filter(elem => elem.isRequired === true));
      } else {
        return collector;
      }
    }, []);
  } else {
    return []
  }
})

const seasonsCourses = computed(() => {
  if(props.seasonsData.length > 0) {
    return props.seasonsData.reduce((collector, elem) => {
      if(elem.courses.length > 0) {
        return collector.concat(elem.courses);
      } else {
        return collector;
      }
    }, []);
  } else {
    return []
  }
})


const electiveSeasonsCourses = computed(() => {
  if(props.seasonsData.length > 0) {
    return props.seasonsData.reduce((collector, elem) => {
      if(elem.courses.length > 0) {
        return collector.concat(elem.courses.filter(elem => elem.isRequired === false));
      } else {
        return collector;
      }
    }, []);
  } else {
    return []
  }
})

const coreCourses = computed(() => {
  return [...props.coursesData.filter(elem => elem.isRequired === true || elem.is_required === true)];
})

const electiveCourses = computed(() => {
  return [...props.coursesData.filter(elem => elem.isRequired === false || elem.is_required === true)];
})

const passedCoreCourses = computed(() => {
  return [...props.coursesData.filter(elem => (elem.isRequired === true || elem.is_required === true) && (elem.isPassed === true || elem.is_passed === true))];
})

const passedElectiveCourses = computed(() => {
  return [...props.coursesData.filter(elem => (elem.isRequired === false || elem.is_required === false) && (elem.isPassed === true || elem.is_passed === true))];
})

const passedCourses = computed(() => {
  return [...props.coursesData.filter(elem => (elem.isPassed === true || elem.is_passed === true ))];
});

function getSumCreditsOfCoursesArr(arr) {
  if(arr.length > 0) {
    return arr.reduce((total, course) => total + course.credits, 0);
  } else {
    return 0;
  }
}
</script>