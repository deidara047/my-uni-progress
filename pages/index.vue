<style scoped>
.custom-container {
  width: 100%;
}
@media (min-width: 640px) {
  .custom-container {
    max-width: 640px;
  }
}
@media (min-width: 768px) {
  .custom-container {
    max-width: 768px;
  }
}
@media (min-width: 1024px) {
  .custom-container {
    max-width: 1024px;
  }
}
@media (min-width: 1280px) {
  .custom-container {
    max-width: 1280px;
  }
}
@media (min-width: 1536px) {
  .custom-container {
    max-width: 1536px;
  }
}
@media (min-width: 1866px) {
  .custom-container {
    max-width: 1866px;
  }
}
</style>

<template>
  <div>
    <main class="custom-container mx-auto my-6">
      <div class="flex gap-x-5">
        <div class="p-8 border border-gray-300" :class="columnsWidths.left">
          <div class="flex justify-center">
            <img src="/images/SOFTWARE.png" class="w-36 mr-5" alt="Imagen 1">
            <img src="/images/SISTEMAS.png" class="w-36 mr-5" alt="Imagen 2">
            <img src="/images/computacion.png" class="w-36" alt="Imagen 3">
          </div>
          <div class="mt-6">
            <h2 class="text-2xl font-semibold">Cursos</h2>
            <hr class="border" />
          </div>
          <div class="mt-3">
            <template v-if="coursesData.length > 0">
              <SemestersContainer :courses-data="coursesData" />
            </template>
          </div>
        </div>

        <MainRightCol @right-button-clicked="() => rightColumnOpened = !rightColumnOpened" v-if="coursesData.length > 0" :courses-data="coursesData" class="border border-gray-300 h-fit" :class="columnsWidths.right" />
        <div v-else class="pt-5 text-center">
          <div role="status">
            <div role="status">
              <svg aria-hidden="true"
                class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor" />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill" />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
// import crsData from "@/assets/json/coursesData.json";
import { onMounted, ref, reactive, computed} from 'vue';

const supabase = useSupabaseClient();
const rightColumnOpened = ref(true);

const columnsWidths = computed(() => {
  if(rightColumnOpened.value) {
    return { left: ["xl:w-9/12","w-8/12"], right: ["xl:w-3/12","w-4/12", "p-7"] }
  } else {
    return { left: ["w-full"], right: ["px-4 py-7"] }
  }
})

const coursesData = reactive([]);

onMounted(() => {
  hydrateCoursesData();
});

async function hydrateCoursesData() {
  let { data, error } = await supabase
    .from('course')
    .select('*');
  coursesData.push(...data);
  
}

useHead({
  title: "Cursos de Ingeniería en Sistemas en la USAC | Progreso FIUSAC"
});
</script>