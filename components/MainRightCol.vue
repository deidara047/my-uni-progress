<style>
.content {
  transition: max-height 0.2s ease-out;
}
</style>

<template>
  <div>
    <h1 class="text-3xl mb-2 font-bold">Estadísticas</h1>
    <hr class="border" />
    <div class="mt-4 r-card-paddingless">
      <div @click="toggleCollapse" class="cursor-pointer px-4 py-3 flex justify-between">
        <h2 style="user-select: none;" class="text-2xl font-bold">Progreso</h2>
        <font-awesome-icon v-if="!isOpen" icon="fa-solid fa-chevron-down" class="mt-2" />
        <font-awesome-icon v-else icon="fa-solid fa-chevron-up" class="mt-2" />
      </div>
      <div class="content overflow-hidden"
        :class="{ 'max-h-0': !isOpen, 'max-h-fit': isOpen, 'px-4': isOpen, 'py-3': isOpen }">
        <ul class="list-none list-inside">
          <li><span class="font-bold">Cursos obligatorios:</span></li>
          <li>
            <ul class="ml-4">
              <li><span class="font-bold">- Ganados: </span> {{ passedCoreCourses.length + "/" + coreCourses.length + ": "
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
                :percentage="(getSumCreditsOfCoursesArr(passedCoreCourses) / getSumCreditsOfCoursesArr(coreCourses)) * 100"
                text="Progreso obligatorios" />
            </div>
          </li>
          <li><span class="font-bold">Cursos no obligatorios:</span></li>
          <li>
            <ul class="ml-4">
              <li><span class="font-bold">- Ganados: </span> {{ passedElectiveCourses.length + "/" +
                electiveCourses.length
                + ": " }} <span class="text-fuchsia-800">{{ electiveCourses.length - passedElectiveCourses.length
  }}</span>
              </li>
              <li><span class="font-bold">- Créditos: </span> {{ getSumCreditsOfCoursesArr(passedElectiveCourses) + "/" +
                Number(300 - getSumCreditsOfCoursesArr(coreCourses)) + " de " + getSumCreditsOfCoursesArr(electiveCourses)
                +
                ": " }} <span class="text-fuchsia-800">{{ Number(300 - getSumCreditsOfCoursesArr(coreCourses)) -
    getSumCreditsOfCoursesArr(passedElectiveCourses) }}</span></li>
            </ul>
          </li>
          <li>
            <div class="flex justify-center my-3">
              <CircularProgressBar
                :percentage="(getSumCreditsOfCoursesArr(passedElectiveCourses) / Number(300 - getSumCreditsOfCoursesArr(coreCourses))) * 100"
                text="Progreso no obligatorios" />
            </div>
          </li>
          <li><span class="font-bold">Total:</span></li>
          <li>
            <ul class="ml-4">
              <li><span class="font-bold">- Ganados: </span> {{ passedCourses.length + "/" + courseData.length + ": " }}
                <span class="text-fuchsia-800">{{ courseData.length - passedCourses.length }}</span>
              </li>
              <li><span class="font-bold">- Créditos: </span> {{ getSumCreditsOfCoursesArr(passedCourses) + "/300 de " +
                getSumCreditsOfCoursesArr(courseData) + ": " }} <span class="text-fuchsia-800">{{ 300 -
    getSumCreditsOfCoursesArr(passedCourses) }}</span></li>
            </ul>
          </li>
          <li>
            <div class="flex justify-center my-3">
              <CircularProgressBar :percentage="(getSumCreditsOfCoursesArr(passedCourses) / 300) * 100"
                text="Total progreso" />
            </div>
          </li>
        </ul>
      </div>


    </div>
  </div>
</template>

<script setup>
import CircularProgressBar from './CircularProgressBar.vue';

const isOpen = ref(true);

const props = defineProps({
  courseData: {
    type: Array,
    required: true
  }
});

function toggleCollapse() {
  isOpen.value = !isOpen.value
}

const coreCourses = computed(() => {
  return [...props.courseData.filter(elem => elem.isRequired === true)];
})

const electiveCourses = computed(() => {
  return [...props.courseData.filter(elem => elem.isRequired === false)];
})

const passedCoreCourses = computed(() => {
  return [...props.courseData.filter(elem => elem.isRequired === true && elem.isPassed === true)];
})

const passedElectiveCourses = computed(() => {
  return [...props.courseData.filter(elem => elem.isRequired === false && elem.isPassed === true)];
})

const passedCourses = computed(() => {
  return [...props.courseData.filter(elem => elem.isPassed === true)];
});

function getSumCreditsOfCoursesArr(arr) {
  return arr.reduce((total, course) => total + course.credits, 0);
}
</script>