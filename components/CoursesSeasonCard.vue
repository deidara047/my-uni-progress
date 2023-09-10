<style scoped>
.course-season-card {
  background: rgb(247, 228, 245);
  background: -moz-linear-gradient(167deg, rgb(247, 228, 245) 0%, rgba(196, 216, 237, 1) 49%);
  background: -webkit-linear-gradient(167deg, rgb(247, 228, 245) 0%, rgba(196, 216, 237, 1) 49%);
  background: linear-gradient(167deg, rgb(247, 228, 245) 0%, rgba(196, 216, 237, 1) 49%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffffff", endColorstr="#c4d8ed", GradientType=1);
}

.is-course-over {
  box-shadow: 0px 0px 15px 1px rgba(9, 132, 227, 0.5) inset;
  -webkit-box-shadow: 0px 0px 15px 1px rgba(9, 132, 227, 0.5) inset;
  -moz-box-shadow: 0px 0px 15px 1px rgba(9, 132, 227, 0.5) inset;

  @apply border border-blue-400
}
</style>

<template>
  <div class="w-[332px]">
    <div class="text-center">
      <h2 class="font-bold text-2xl font-[Lato]">{{ formattedType + " " + props.year }}</h2>
    </div>
    <div class="p-4 mt-5 shadow-lg rounded-xl course-season-card">
      <div class="flex justify-end">
        <ToolTip tooltip-text="Eliminar período">
          <button class="text-red-600 hover:text-red-400 text-lg" @click="() => emit('clicked-x-button-season', {type: props.type, year: props.year})">X</button>
        </ToolTip>
      </div>
      <div>
        <p class="font-semibold">{{ props.courses.length }} Cursos</p>
        <p class="font-semibold">{{ getSumCreditsOfCoursesArr(props.courses) }} Créditos</p>
      </div>
      <div class="mt-3">
        <!--div class="h-[40px] bg-white w-[300px] mb-3"></div-->
        <CourseCard @clicked-x-button-course="(data) => onXButtonCourseClick(data)" type="belong-to-season" v-for="crsD in props.courses" :course-data="crsD" />
        <div
          @dragenter="handleDragEnter" 
          @dragleave="handleDragLeave"
          @dragover.prevent
          @drop="handleDrop"
          class="h-[40px] w-full bg-white flex justify-center items-center"><font-awesome-icon
            :icon="['fas', 'circle-plus']" size="xl" style="color: #e0e0e0;" /></div>
      </div>
    </div>
  </div>
</template>

<script setup>
// "is-course-over border border-blue-400"
const emit = defineEmits(['dropped-course','clicked-x-button-course','clicked-x-button-season'])
const isCourseOver = ref(false);
const props = defineProps({
  type: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  courses: {
    type: Array,
    required: true
  }
});

function handleDragEnter(e) {
  e.preventDefault();

  if(isCourseOver.value === false) {
    isCourseOver.value = true;
    e.target.classList.add("is-course-over")
  }
}

/* Prop drilling: order: CourseCard -> CoursesSeasonCard -> SeasonCardSliderContainer -> my-route */
function onXButtonCourseClick(data) {
  emit('clicked-x-button-course', { ...data, type: props.type, year: props.year })
}

function handleDragLeave(e) {
  if(isCourseOver.value === true) {
    isCourseOver.value = false;
    e.target.classList.remove("is-course-over")
  }
}

function handleDrop(e) {
  e.preventDefault();
  emit('dropped-course', {type: props.type, year: props.year});

  isCourseOver.value = false;
  e.target.classList.remove("is-course-over")
}


const formattedType = computed(() => {
  switch (props.type) {
    case "first-semester":
      return "Primer Semestre";
    case "vacations-june":
      return "Vacaciones Junio";
    case "second-semester":
      return "Segundo Semestre";
    case "vacations-december":
      return "Vacaciones Diciembre";
  }
})

// Copied from 'SemesterCard.vue'
function getSumCreditsOfCoursesArr(arr) {
  return arr.reduce((total, course) => total + course.credits, 0);
}
</script>