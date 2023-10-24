<template>
  <div class="container-fluid px-lg-4 mt-4">
    <div class="swiper swiper-container">
      <div class="swiper-wrapper">
        <swiper :spaceBetween="30" :effect="'fade'" :loop="true" :autoplay="{ delay: 2500, disableOnInteraction: false }" :modules="modules">
          <swiper-slide><img src="../assets/images/carousel/1.png" class="w-100 d-block" /></swiper-slide>
          <swiper-slide><img src="../assets/images/carousel/2.png" class="w-100 d-block" /></swiper-slide>
          <swiper-slide><img src="../assets/images/carousel/3.png" class="w-100 d-block" /></swiper-slide>
          <swiper-slide><img src="../assets/images/carousel/4.png" class="w-100 d-block" /></swiper-slide>
          <swiper-slide><img src="../assets/images/carousel/5.png" class="w-100 d-block" /></swiper-slide>
          <swiper-slide><img src="../assets/images/carousel/6.png" class="w-100 d-block" /></swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Autoplay, EffectFade, Navigation, Pagination],
    };
  },
};
</script>

<style></style>
