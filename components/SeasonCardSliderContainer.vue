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
</style>

<template>
  <swiper :navigation="true" :modules="modules" class="mySwiper">
    <swiper-slide>
      <CoursesSeasonCard />
    </swiper-slide>
    <swiper-slide>
      <CoursesSeasonCard />
    </swiper-slide>
    <swiper-slide>
      <CoursesSeasonCard />
    </swiper-slide>
    <swiper-slide>
      <CoursesSeasonCard />
    </swiper-slide>
  </swiper>
</template>

<script>
/* Alright, I didn't manage to set the width 100% of its parent for some reason, so I had to set it by myself
  So far, I've set all the "lengths" in my-route, so take a look over there to see what I did
*/

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
      modules: [Navigation]
    };
  },
};

</script>