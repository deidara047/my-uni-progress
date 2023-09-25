<style scoped lang="scss">
.tabs {
  @apply inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300;

  &.active {
    @apply text-blue-600 border-blue-600
  }
}
</style>

<template>
  <main class="container mx-auto my-6">
    <h1 class="font-bold text-3xl">Mi Perfil</h1>
    <h2 class="font-bold text-2xl mt-2">Hola Luis (espero que seas Luis 😑)</h2>

    <p class="mt-2">En esta tabla tienes todos los cursos. Aquí puedes marcar si ya aprobaste un curso o viceversa.</p>

    <div class="mt-3">
      <b>Buscar curso por nombre o código</b>
      <div class="flex items-center max-w-[400px] mt-1">
        <label for="simple-search" class="sr-only">Search</label>
        <div class="relative w-full">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
            <span class="sr-only">Search</span>
          </div>
          <input type="text" id="simple-search"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 outline-none"
            placeholder="Buscar curso" required>
        </div>
      </div>
    </div>

    <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 mt-2">
      <ul class="flex flex-wrap -mb-px">
        <li class="mr-2">
          <button class="tabs" :class="{ 'active': currentTab === 'all' }" @click="() => currentTab = 'all'">Todos</button>
        </li>
        <li class="mr-2">
          <button class="tabs" :class="{ 'active': currentTab === 'approved-courses' }" @click="() => currentTab = 'approved-courses'">Cursos Aprobados</button>
        </li>
        <li class="mr-2">
          <button class="tabs" :class="{ 'active': currentTab === 'not-approved-courses' }" @click="() => currentTab = 'not-approved-courses'">Cursos
            No Aprobados</button>
        </li>
      </ul>
    </div>

    <div class="relative overflow-x-auto my-5">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col"  style="width: 1px; white-space: nowrap;" class="px-6 py-3 text-end">
              #
            </th>
            <th scope="col" class="px-6 py-3 text-center">
              Código
            </th>
            <th scope="col" class="px-6 py-3 text-center">
              Curso
            </th>
            <th scope="col" class="px-6 py-3 text-center">
              Semestre
            </th>
            <th scope="col" class="px-6 py-3 text-center">
              Aprobación
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 text-end whitespace-nowrap">
              Apple MacBook Pro 17"
            </th>
            <td class="px-6 py-4 text-center">
              Silver
            </td>
            <td class="px-6 py-4 text-center">
              Laptop
            </td>
            <td class="px-6 py-4 text-center">
              $2999
            </td>
            <td class="px-6 py-4 text-center">
              <button class="btn-primary">Aprobar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script setup>
const currentTab = ref("all");

/*
{
  "code": "0010",
  "name": "Lógica",
  "semester": 4,
  "isPassed": false,
}
*/
</script>