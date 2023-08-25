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
</style>

<template>
  <div class="course-card mb-4" @click="onCourseClick"
    :class="{ 'selector-course-card': props.type === 'selector', 'selected-course': props.mode === 'selected' }"
    >
    <div v-if="props.courseData.isPassed" class="text-xs golden-background">
      <h3 class="text-white text-center font-medium text-with-border">Curso Ganado</h3>
    </div>
    <div class="flex text-sm">
      <div class="course-colour border w-[12px]"
        :style="{ borderColor: getColorByBelongsTo(props.courseData.belongsTo, true), backgroundColor: getColorByBelongsTo(props.courseData.belongsTo, false) }">
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
            {{ props.courseData.isRequired ? "*" : "" }}
            <div v-if="props.courseData.alongWith" class="text-xs p-1 rounded-md text-white my-1" :class="{
              'bg-[#4B81D5]': props.courseData.alongWith === 'L',
              'bg-[#F1556C]': props.courseData.alongWith === 'P',
              'bg-[#c0392b]': props.courseData.alongWith === 'X'
            }">{{ props.courseData.alongWith }}
            </div>
          </div>
        </div>
      </div>
      <div class="course-requirements-div p-[4px] min-w-[37px]"
        :class="[getColorsByMode.color1.color, getColorsByMode.color1.textColor]">
        <p v-for="req in props.courseData.prerequisites">{{ req }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['selected-course']);

const props = defineProps({
  courseData: {
    type: Object,
    required: true
  },
  type: {
    type: String,
    default: "normal" // Types: {normal,selector}; if type is selector, it can emit when it's clicked
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

const getColorsByMode = computed(() => {
  switch (props.mode) {
    case "direct-pre":
      return {
        color1: { color: "bg-[#27ae60]", textColor: "text-white" },
        color2: { color: "bg-[#16a085]", textColor: "text-black" },
        color3: { color: "bg-[#2ecc71]", textColor: "text-black" },
      }
      break;
    case "direct-post":
      return {
        color1: { color: "bg-[#EE2F33]", textColor: "text-white" },
        color2: { color: "bg-[#F27B7E]", textColor: "text-black" },
        color3: { color: "bg-[#ff7979]", textColor: "text-white" },
      }
      break;
    case "chain-pre":
      return {
        color1: { color: "bg-[#9CCB89]", textColor: "text-white" },
        color2: { color: "bg-[#D2F4CB]", textColor: "text-black" },
        color3: { color: "bg-[#F1FFED]", textColor: "text-black" },
      }
      break;
    case "chain-post":
      return {
        color1: { color: "bg-[#FD6C6C]", textColor: "text-white" },
        color2: { color: "bg-[#FFC5C7]", textColor: "text-black" },
        color3: { color: "bg-[#FFF3F6]", textColor: "text-black" },
      }
      break;
    case "others":
      return {
        color1: { color: "bg-[#c7ecee]", textColor: "text-black" },
        color2: { color: "bg-[#dff9fb]", textColor: "text-black" },
        color3: { color: "bg-[#F6FAFF]", textColor: "text-black" },
      }
      break;
    default:
      return {
        color1: { color: "bg-[#f69745]", textColor: "text-black" },
        color2: { color: "bg-[#fbbf8f]", textColor: "text-black" },
        color3: { color: "bg-[#fdd3b4]", textColor: "text-black" },
      }
      break;
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