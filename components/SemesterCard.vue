<template>
  <div class="py-4 px-3 border-2 w-[20rem] h-fit border-[#f8a864]">
    <div>
      <h1 class="font-[Roboto] text-2xl font-semibold">
        <div v-if="!props.isSearching">
          <span>{{ props.semesterData[0].semester }}</span> | <span>{{
            getNumOrdinName(props.semesterData[0].semester) }}
            SEMESTRE</span>
        </div>
        <span v-else>BUSCANDO CURSO...</span>
      </h1>
    </div>
    <div v-if="!props.isSearching"><i class="text-sm text-slate-700">
        <p>- Total: ({{ semesterData.length }} cursos: {{ getSumCreditsOfCoursesArr(semesterData) }} cdts)</p>
        <p>- Ganado: ({{ passedCourses.length }} cursos: {{ getSumCreditsOfCoursesArr(passedCourses) }} cdts)</p>
      </i></div>
    <hr class="mt-2 border-2 border-[#aeacac] mb-4" />
    <div class="course-container">
      <template v-if="props.semesterData.length > 0">
        <CourseCard draggable="true" @selected-course="({ code }) => onSelectedCourse(code)" :type="props.typeCourseCards"
        v-for="semData in props.semesterData" :key="semData.code" :course-data="semData" :mode="semData.mode" />
      </template>
      <div v-else>No se encontró nada</div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  semesterData: {
    type: Array,
    required: true
  },
  typeCourseCards: {
    type: String,
    default: "none"
  },
  // If my-route route is searching, this is going to be true
  isSearching: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["selected-course"]);


function onSelectedCourse(code) {
  emit('selected-course', { 'code': code });
}

function getNumOrdinName(num) {
  switch (num) {
    case 1:
      return "PRIMER"
      break;
    case 2:
      return "SEGUNDO"
      break;
    case 3:
      return "TERCER"
      break;
    case 4:
      return "CUARTO"
      break;
    case 5:
      return "QUINTO"
      break;
    case 6:
      return "SEXTO"
      break;
    case 7:
      return "SÉPTIMO"
      break;
    case 8:
      return "OCTAVO"
      break;
    case 9:
      return "NOVENO"
      break;
    case 10:
      return "DÉCIMO"
      break;
    default:
      return "_undefined"
      break;
  }
}

const passedCourses = computed(() => {
  return [...props.semesterData.filter(elem => elem.isPassed === true)];
})

function getSumCreditsOfCoursesArr(arr) {
  return arr.reduce((total, course) => total + course.credits, 0);
}

</script>