<style scoped>
.courses-season-panel {
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23cbcbcb' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
}
</style>

<template>
  <main class="container mx-auto my-6">
    <div style="border: 1px red solid">
      <div class="flex gap-5" style="border: 1px blue solid">
        <div style="border: 1px orange solid">
          <h1>Cursos:</h1>
          <p>Arrastra el curso al período que vayas a cursarlo</p>
          <div>
            <div>
              <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
              <input type="text" v-model="searchCriteria" class="border" />
            </div>
            <div>

            </div>
          </div>
        </div>
        <div style="border: 1px #ff4500 solid" class="grow">
          <h1>Mi ruta</h1>
          <div class="courses-season-panel">
            <CoursesSeasonCard />
          </div>
        </div>
        <div style="border: 1px red solid">C</div>
      </div>
      <div class="mt-4" style="border: 1px purple solid">D</div>
    </div>
  </main>
</template>

<script setup>
import data from "@/assets/json/coursesData.json";

const coursesData = reactive([]);
const searchCriteria = ref("");
const unPassedCourses = computed(() => {
  return [...coursesData.filter((course) => course.isPassed === false)]
});

onMounted(() => {
  coursesData.push(...data);
});


</script>