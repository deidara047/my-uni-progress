<template>
  <div>
    <Navbar />
    <main class="container mx-auto my-6">
      <div class="flex gap-x-5">
        <div class="p-8 w-9/12 border border-gray-300 rounded-l-sm">
          <div class="flex justify-center">
            <img src="/images/SOFTWARE.png" class="w-36 mr-5" alt="Imagen 1">
            <img src="/images/SISTEMAS.png" class="w-36 mr-5" alt="Imagen 2">
            <img src="/images/computacion.png" class="w-36" alt="Imagen 3">
          </div>
          <div class="mt-6">
            <h2 class="text-2xl font-semibold">Cursos</h2>
            <hr class="border" />
          </div>
          <div class="flex flex-wrap justify-between mt-6 gap-4">
            <!-- The number of the range is being set statically, but in the future if necessary, this process will be automated -->
            <template v-if="courseData.length > 0">
              <template v-for="ind in 10" :key="ind">
                <SemesterCard :semester-data="getSemesterDataByIndex(ind)" />
              </template>
            </template>

          </div>
        </div>

        <MainRightCol class="p-8 w-3/12 border border-gray-300" />
      </div>
    </main>
  </div>
</template>

<script setup>
import data from "@/assets/json/coursesData.json";
import { onMounted, ref, reactive, computed, watchEffect } from 'vue';

const courseData = reactive([]);

onMounted(() => {
  courseData.push(...data);
});


//watchEffect()

function getSemesterDataByIndex(ind) {
  return [...courseData.filter(elem => elem.semester === ind)];
}

useHead({
  title: "Cursos de Ingeniería en Sistemas en la USAC"
})
</script>