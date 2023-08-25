<style scoped lang="scss">
.select-styled {
  @apply p-2 rounded;
}

#submit-button {
  background-color: #8e44ad!important;
  &:hover {
    background-color: #9b59b6!important;
  }
}
</style>

<template>
  <form @submit.prevent="() => emit('createSeasonButtonClicked', seasonData)" class="flex flex-col gap-3">
    <div class="flex gap-2">
      <select class="flex-grow border select-styled" v-model="seasonData.type">
        <option value="first-semester">Primer Semestre</option>
        <option value="vacations-june">Vacaciones Junio</option>
        <option value="second-semester">Segundo Semestre</option>
        <option value="vacations-december">Vacaciones Diciembre</option>
      </select>
      <select class="select-styled border" v-model="seasonData.year">
        <option value="2023">2023</option>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
        <option value="2026">2026</option>
        <option value="2027">2027</option>
        <option value="2028">2028</option>
        <option value="2029">2029</option>
      </select>
    </div>
    <div>
      <button type="submit" id="submit-button"  class="transition text-white p-3 rounded w-full"> + Crear Período</button>
    </div>
  </form>
</template>

<script setup>
// I'm going to use prop drilling as I shouldn't, I'm still learning though :P
  const emit = defineEmits(["createSeasonButtonClicked"]);
  const seasonData = ref(
    {
      type: 'first-semester', 
      year: '2023'
    });
</script>