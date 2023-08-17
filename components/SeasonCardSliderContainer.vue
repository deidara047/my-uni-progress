<style scoped>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  font-size: 18px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid red
}

.mySwiper {
  width: 600px;
}

</style>

<template>
  <div>
    <!--CoursesSeasonCard /-->
    <swiper :navigation="true" :modules="modules" class="mySwiper">
      <swiper-slide><CoursesSeasonCard /> </swiper-slide>
      <swiper-slide><CoursesSeasonCard /> </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Navigation],
    };
  },
};

</script>