<style scoped>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.season-card-slider-transition-enter-active,
.season-card-slider-transition-leave-active {
  transition: opacity 0.3s ease;
}

.season-card-slider-transition-enter-from,
.season-card-slider-transition-leave-to {
  opacity: 0;
}
</style>

<template>
  <Transition name="season-card-slider-transition" mode="out-in">
    <template v-if="seasonsData.length === 0">
      <swiper :navigation="true" :modules="modules" :allow-touch-move="false" class="mySwiper">
        <swiper-slide>
          <div class="flex flex-col gap-6 max-w-[400px] bg-gray-100 shadow px-6 py-8 rounded-md">
            <div class="text-center text-7xl">
              <font-awesome-icon :icon="['fas', 'bomb']" />
            </div>
            <div class="text-md">
              Vaya, parece que no hay nada en tu ruta.
              Si quieres empezar a diseñar tu ruta, selecciona los parámetros y presiona Crear Período
            </div>
            <SelectPeriod
              @create-season-button-clicked="(newSeasonData) => $emit('newSeasonDataSubmitted', newSeasonData)">
            </SelectPeriod>
          </div>
        </swiper-slide>
      </swiper>
    </template>
    <template v-else>
      <swiper :navigation="true" :modules="modules" :allow-touch-move="false" class="mySwiper">
        <swiper-slide v-for="(season, index) in seasonsData" :key="index">
          <CoursesSeasonCard v-bind="season" />
        </swiper-slide>
        <swiper-slide>
          Agregar Período
        </swiper-slide>
      </swiper>
    </template>
  </Transition>
</template>

<script>
/* Alright, I didn't manage to set the width 100% of its parent for some reason, so I had to set it by myself
  So far, I've set all the "possible widths" in my-route, so take a look over there to see what I did
*/
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

export default {
  // Using prop drilling as I shouldn't
  emits: ['newSeasonDataSubmitted'],
  props: {
    seasonsData: Array
  },
  components: {
    Swiper,
    SwiperSlide
  },
  setup() {
    return {
      modules: [Navigation]
    };
  },
};

</script>