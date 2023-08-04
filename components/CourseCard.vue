<style scoped lang="scss">
.text-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.selector-course-card {
  cursor: pointer;
  transition: .1s all ease;

  &:hover {
    transform: scale(1.03);
  }
}
</style>

<template>
  <div class="course-card mb-4" @click="onCourseClick" :class="{ 'selector-course-card': props.type === 'selector' }">
    <div v-if="props.courseData.isPassed" class="text-xs golden-background">
      <h3 class="text-white text-center font-medium text-with-border">Curso Ganado</h3>
    </div>
    <div class="flex text-sm">
      <div class="course-colour border w-[12px]"
        :style="{ borderColor: getColorByBelongsTo(props.courseData.belongsTo, true), backgroundColor: getColorByBelongsTo(props.courseData.belongsTo, false) }">
      </div>
      <div class="text-xs bg-[#fbbf8f] course-left-data ">
        <div class="bg-[#f69745] p-[4px] course-code-div">{{ props.courseData.code }}</div>
        <div class="bg-transparent text-center course-credits">{{ props.courseData.credits }}</div>
      </div>
      <div class="flex flex-grow">
        <div class="course-name p-[8px] text-center bg-[#fdd3b4] flex-grow text-container">
          <p>{{ props.courseData.name }}</p>
        </div>
        <div class="course-is-required-div bg-[#fdd3b4]">
          <div class="dot-div text-2xl pr-[4px] font-bold">{{ props.courseData.isRequired ? "*" : "" }}</div>
        </div>
      </div>
      <div class="course-requirements-div p-[4px] min-w-[37px] bg-[#f69745]">
        <p v-for="req in props.courseData.prerequisites">{{ req }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['selected-course']);

onMounted(() => {
  // console.log({"mode": props.mode})
});

onUpdated(() => {
  // console.log({"mode": props.mode})
});

const props = defineProps({
  courseData: {
    type: Object,
    required: true
  },
  type: {
    type: String,
    default: "normal" // Types: {normal,selector}; if selector, it can emit when it's clicked
  },
  /**
   * Modes: {none, selected, direct-pre, direct-post, chain-pre, chain-post, others}
   * - none: When no course is selected
   * - selected: When this course specifically is selected
   * - direct-pre: When this course is the direct prerequisite course of the clicked course, i.e. the course necessary to pass in order to have
   *             the right to take it
   * - direct-post: When the clicked course is a prerequisite of this course
   * - chain-pre: When this and other courses are pre-requisites of the direct-pre courses
   * - chain-post: When this and other courses are post-requisites of the direct-post courses
   * - others: When a course is selected, but this course doesn't belong to any type of the mentioned aboved (except 'none' case)
   * */
  mode: {
    type: String,
    default: "none"
  }
})

function onCourseClick() {
  if (props.type === "selector") {
    emit('selected-course', { 'code': props.courseData.code })
  }
}

function getColorByBelongsTo(belTo, isBg) {
  if (isBg === true) {
    return belTo === 1 ? "hsl(80, 43%, 33%)" : (belTo === 2 ? "hsl(191, 52%, 31%)" : (belTo === 3 ? "hsl(45, 100%, 46%)" : ""));
  } else {
    return belTo === 1 ? "#76933b" : (belTo === 2 ? "#31869a" : (belTo === 3 ? "#ffc000" : ""));
  }
}

</script>