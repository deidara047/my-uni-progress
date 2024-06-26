<style scoped lang="scss">
.text-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.selector-course-card {
  cursor: pointer;
  transition: .1s transform ease;

  &:hover {
    transform: scale(1.03);
  }
}

.selected-course {
  box-shadow: 0 0 6px 4px #ff9ff3;
}

.cc-x-button {
  position: absolute;
  top: -16px;
  right: -10px;
}
</style>

<template>
  <div class="course-card mb-4 relative" @click="onCourseClick"
    :class="{ 'selector-course-card': props.type === 'selector', 'selected-course': props.mode === 'selected' }"
    @dragstart="() => emit('drag-course-start', {'code': props.courseData.code})"
    @dragend="() => emit('drag-course-end')"
  >
    <div v-if="props.courseData.isPassed || props.courseData.is_passed" class="text-xs golden-background">
      <h3 class="text-white text-center font-medium text-with-border">Curso Ganado</h3>
    </div>
    <div v-if="props.type === 'belong-to-season' && showXButton" class="cc-x-button" @mouseenter.prevent="() => showXButton = true" @mouseleave="() => showXButton = false" @click="onXButtonCourseClick">
      <button class="rounded-full bg-red-600 hover:bg-red-500" style="padding: 0.5px 9px"><font-awesome-icon :icon="['fas', 'xmark']" style="color: #fff;" size="xs" /></button>
    </div>
    <div class="flex text-sm" @mouseenter.prevent="() => showXButton = true" @mouseleave="() => showXButton = false">
      <div class="course-colour border w-[12px]"
        :style="{ borderColor: getColorByBelongsTo(props.courseData.belongsTo ?? props.courseData.belongs_to, true), backgroundColor: getColorByBelongsTo(props.courseData.belongsTo ?? props.courseData.belongs_to, false) }">
      </div>
      <div class="text-xs course-left-data" :class="[getColorsByMode.color2.color, getColorsByMode.color2.textColor]">
        <div class="p-[4px] course-code-div" :class="[getColorsByMode.color1.color, getColorsByMode.color1.textColor]">{{
          props.courseData.code }}</div>
        <div class="bg-transparent text-center course-credits">{{ props.courseData.credits }}</div>
      </div>
      <div class="flex flex-grow">
        <div class="course-name p-[8px] text-center flex-grow text-container"
          :class="[getColorsByMode.color3.color, getColorsByMode.color3.textColor]">
          <p>{{ props.courseData.name }}</p>
        </div>
        <div class="course-is-required-div" :class="[getColorsByMode.color3.color]">
          <div class="dot-div text-2xl pr-[4px] font-bold">
            {{ props.courseData.isRequired || props.courseData.is_required ? "*" : "" }}
            <div v-if="props.courseData.along_with" class="text-xs p-1 rounded-md text-white my-1" :class="{
              'bg-[#4B81D5]': props.courseData.along_with === 'L',
              'bg-[#F1556C]': props.courseData.along_with === 'P',
              'bg-[#c0392b]': props.courseData.along_with === 'X'
            }">{{ props.courseData.along_with }}
            </div>
          </div>
        </div>
      </div>
      <div class="course-requirements-div flex items-center p-[4px] min-w-[37px]"
        :class="[getColorsByMode.color1.color, getColorsByMode.color1.textColor]">
        <div>
          <p v-for="req in props.courseData.prerequisites">{{ req }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(
  [
    'selected-course',
    'clicked-x-button-course',
    'drag-course-start',
    'drag-course-end'
  ]);
const showXButton = ref(false)

const props = defineProps({
  courseData: {
    type: Object,
    required: true
  },
  type: {
    type: String,
    default: "normal" 
    /* Types: {normal,selector, belong-to-season}; 
      if type is selector, it can emit when it's clicked 
      if type is belong-to-season, has a x button on hover so it can be removed from a season
    */
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

/* Prop drilling: order: CourseCard -> CoursesSeasonCard -> SeasonCardSliderContainer -> my-route */
function onXButtonCourseClick() {
  if (props.type === "belong-to-season") {
    emit('clicked-x-button-course', { 'code': props.courseData.code })
  }
}

const getColorsByMode = computed(() => {
  switch (props.mode) {
    case "direct-pre":
      return {
        color1: { color: "bg-[#27ae60]", textColor: "text-white" },
        color2: { color: "bg-[#16a085]", textColor: "text-black" },
        color3: { color: "bg-[#2ecc71]", textColor: "text-black" },
      }
    case "direct-post":
      return {
        color1: { color: "bg-[#EE2F33]", textColor: "text-white" },
        color2: { color: "bg-[#F27B7E]", textColor: "text-black" },
        color3: { color: "bg-[#ff7979]", textColor: "text-white" },
      }
    case "chain-pre":
      return {
        color1: { color: "bg-[#9CCB89]", textColor: "text-white" },
        color2: { color: "bg-[#D2F4CB]", textColor: "text-black" },
        color3: { color: "bg-[#F1FFED]", textColor: "text-black" },
      }
    case "chain-post":
      return {
        color1: { color: "bg-[#FD6C6C]", textColor: "text-white" },
        color2: { color: "bg-[#FFC5C7]", textColor: "text-black" },
        color3: { color: "bg-[#FFF3F6]", textColor: "text-black" },
      }
    case "others":
      return {
        color1: { color: "bg-[#c7ecee]", textColor: "text-black" },
        color2: { color: "bg-[#dff9fb]", textColor: "text-black" },
        color3: { color: "bg-[#F6FAFF]", textColor: "text-black" },
      }
    default:
      return {
        color1: { color: "bg-[#f69745]", textColor: "text-black" },
        color2: { color: "bg-[#fbbf8f]", textColor: "text-black" },
        color3: { color: "bg-[#fdd3b4]", textColor: "text-black" },
      }
  }
});

function getColorByBelongsTo(belTo, isBg) {
  if (isBg === true) {
    return belTo === 1 ? "hsl(80, 43%, 33%)" : (belTo === 2 ? "hsl(191, 52%, 31%)" : (belTo === 3 ? "hsl(45, 100%, 46%)" : ""));
  } else {
    return belTo === 1 ? "#76933b" : (belTo === 2 ? "#31869a" : (belTo === 3 ? "#ffc000" : ""));
  }
}

</script>