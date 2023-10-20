<style scoped lang="scss">
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
          <SelectPeriod @create-season-button-clicked="(newSeasonData) => $emit('newSeasonDataSubmitted', newSeasonData)">
          </SelectPeriod>
        </swiper-slide>
      </swiper>
    </template>
    <template v-else>
      <swiper @swiper="onSwiper" :navigation="true" :modules="modules" :allow-touch-move="false" class="mySwiper">
        <swiper-slide v-for="(season, index) in orderedSeasonsData" :key="index">
          <CoursesSeasonCard 
            @clicked-x-button-course="(data) => onXButtonCourseClick(data)"
            @clicked-x-button-season="(data) => $emit('clickedXButtonSeason', data)"
            @dropped-course="(data) => $emit('droppedCourse', data)" v-bind="season" />
        </swiper-slide>
        <swiper-slide>
          <SelectPeriod :seasons-exists="seasonsData.length > 0"
            @create-season-button-clicked="(newSeasonData) => $emit('newSeasonDataSubmitted', newSeasonData)">
          </SelectPeriod>
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
  emits: ['newSeasonDataSubmitted', 'droppedCourse','clickedXButtonCourse','clickedXButtonSeason'],
  props: {
    seasonsData: Array
  },
  data() {
    return {
      swiper: null
    }
  },
  components: {
    Swiper,
    SwiperSlide
  }
  ,
  computed: {
    orderedSeasonsData() {
      const organizedData = {};

      this.seasonsData.forEach((data) => {
        const type = data.type;
        const year = data.year;

        if (!organizedData[year]) {
          organizedData[year] = {};
        }

        if (!organizedData[year][type]) {
          organizedData[year][type] = [];
        }

        organizedData[year][type].push(data);
      });

      const orderedData = [];
      const years = Object.keys(organizedData).sort();
      years.forEach((yr) => {
        const sns = ["first-semester", "vacations-june", "second-semester", "vacations-december"];
        sns.forEach((type) => {
          if (organizedData[yr][type]) {
            orderedData.push(...organizedData[yr][type]);
          }
        });
      });

      return orderedData;
    }
  },
  methods: {
    onSwiper(swiper) {
      this.swiper = swiper
    },
    goToSlideNum(num) {
      if (this.swiper) {
        this.swiper.slideTo(num);
      }
    },
    goToSlide(type, year) {
      if (this.swiper) {
        this.swiper.slideTo(this.orderedSeasonsData.findIndex((season) => season.year === year && season.type === type));
      }
    },
    getCurrentIndex() {
      return this.swiper.activeIndex;
    },
    /* Prop drilling: order: CourseCard -> CoursesSeasonCard -> SeasonCardSliderContainer -> my-route */
    onXButtonCourseClick(data) {
      this.$emit('clickedXButtonCourse', data)
    }
  },
  setup() {
    return {
      modules: [Navigation]
    };
  }
};

</script>