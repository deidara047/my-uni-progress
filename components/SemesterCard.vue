<template>
  <div class="py-4 px-3 border-2 w-[21rem] border-[#f8a864]">
    <div>
      <h1 class="font-[Roboto] text-2xl font-semibold"><span>{{ props.semesterData[0].semester }}</span> | <span>PRIMER SEMESTRE</span></h1>
    </div>
    <hr class="mt-2 border-2 border-[#aeacac] mb-4" />
    <div class="course-container">
      <CourseCard v-for="semData in props.semesterData" :key="semData.semester" :course-data="semData" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUpdated} from 'vue';

const props = defineProps({
  semesterData: {
    type: Array,
    required: true
  }
});

function getNumOrdinName(num) {

}

</script>