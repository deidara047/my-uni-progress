<style scoped>
.course-season-card {
  background: rgb(255, 255, 255);
  background: -moz-linear-gradient(167deg, rgba(255, 255, 255, 1) 0%, rgba(196, 216, 237, 1) 49%);
  background: -webkit-linear-gradient(167deg, rgba(255, 255, 255, 1) 0%, rgba(196, 216, 237, 1) 49%);
  background: linear-gradient(167deg, rgba(255, 255, 255, 1) 0%, rgba(196, 216, 237, 1) 49%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffffff", endColorstr="#c4d8ed", GradientType=1);
}
</style>

<template>
  <div class="w-fit">
    <div class="text-center">
      <h2 class="font-bold text-2xl font-[Lato]">Primer Semestre 2022</h2>
    </div>
    <div class="p-4 mt-3 shadow-md rounded-xl course-season-card">
      <div class="flex justify-end">
        <button class="text-red-600 hover:text-red-300 text-lg">X</button>
      </div>
      <div>
        <p class="font-semibold">7 Cursos</p>
        <p class="font-semibold">35 Créditos</p>
      </div>
      <div class="mt-3">
        <div class="h-[40px] w-[300px] bg-white mb-3"></div>
        <div class="h-[40px] w-[300px] bg-white flex justify-center items-center"><font-awesome-icon :icon="['fas', 'circle-plus']" size="xl" style="color: #e8eaecb9;" /></div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>