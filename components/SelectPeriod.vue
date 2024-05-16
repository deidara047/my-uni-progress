<style scoped lang="scss">
.select-styled {
  @apply p-2 rounded;
}

#submit-button {
  background-color: #8e44ad !important;

  &:hover {
    background-color: #9b59b6 !important;
  }
}
</style>

<template>
  <div class="flex flex-col gap-6 max-w-[400px] bg-gray-100 shadow-xl px-6 py-8 rounded-md">
    <template v-if="!props.seasonsExists">
      <div class="text-center text-7xl">
        <font-awesome-icon :icon="['fas', 'bomb']" />
      </div>
      <div class="text-md">
        Vaya, parece que no hay nada en tu ruta.
        Si quieres empezar a diseñar tu ruta, selecciona los parámetros y presiona Crear Período
      </div>
    </template>
    <template v-else>
      <h2 class="text-2xl font-bold m-auto">Crear nuevo período</h2>
      <p>Recuerda que no se pueden repetir <strong>temporada</strong> y <strong>año</strong> en dos períodos</p>
    </template>
    <form @submit.prevent="() => emit('createSeasonButtonClicked', seasonData)" class="flex flex-col gap-3">
      <div class="flex gap-2">
        <select class="flex-grow border select-styled" v-model="seasonData.type">
          <option value="first-semester">Primer Semestre</option>
          <option value="vacations-june">Vacaciones Junio</option>
          <option value="second-semester">Segundo Semestre</option>
          <option value="vacations-december">Vacaciones Diciembre</option>
        </select>
        <select class="select-styled border" v-model="seasonData.year">
          <option v-for="yr in years" :value="yr.toString()">{{ yr }}</option>
        </select>
      </div>
      <div>
        <button type="submit" id="submit-button" class="transition text-white p-3 rounded w-full">
          + Crear Período
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon';

// I'm going to use prop drilling as I shouldn't, I'm still learning though :P
const emit = defineEmits(["createSeasonButtonClicked"]);
const dateInGuatemala = DateTime.now().setZone('America/Guatemala');
const currentYear = dateInGuatemala.year;
const seasonsLeft = reactive([]);
const endYear = currentYear + 8;
const years = Array.from({ length: endYear - currentYear + 1 }, (_, index) => currentYear + index);

onMounted(() => {
  if (dateInGuatemala < DateTime.fromISO(`${dateInGuatemala.year}-05-15T00:00:00`, { zone: 'America/Guatemala' })) {
    seasonsLeft.push("first-semester");
  }

  if (dateInGuatemala < DateTime.fromISO(`${dateInGuatemala.year}-07-01T00:00:00`, { zone: 'America/Guatemala' })) {
    seasonsLeft.push("vacations-june");
  }

  if (dateInGuatemala < DateTime.fromISO(`${dateInGuatemala.year}-11-15T00:00:00`, { zone: 'America/Guatemala' })) {
    seasonsLeft.push("second-semester");
  }

  if (dateInGuatemala < DateTime.fromISO(`${dateInGuatemala.year}-12-31T00:00:00`, { zone: 'America/Guatemala' })) {
    seasonsLeft.push("vacations-december");
  }

  seasonData.value.type = seasonsLeft[0];
  seasonData.value.year = currentYear.toString();
});

const props = defineProps({
  seasonsExists: Boolean,
  default: false
});

const seasonData = ref(
  {
    type: '...',
    year: '...'
  }
);
</script>