<template>
  <div>
    <Navbar />
    <main class="container mx-auto my-6">
      <div class="flex">
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
          <div class="flex flex-wrap justify-between mt-6">
            <SemesterCard />
          </div>
        </div>

        <div class="p-8 w-3/12 bg-slate-500 text-xl">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est magnam molestias sint quod eveniet nulla
            quaerat nostrum neque nam exercitationem. Perspiciatis, eius deleniti! Repellendus cupiditate, eligendi
            temporibus ipsam molestias suscipit.</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
useHead({
  title: "Cursos de Ingeniería en Sistemas en la USAC"
})
</script>