<template>
  <div>
    <h2 class="mt-5 pt-4 mb-4 text-center fw-bold h-font">TESTIMONIALS</h2>

    <div class="container mt-5">
      <swiper
        :effect="'coverflow'"
        :grabCursor="true"
        :centeredSlides="true"
        :slidesPerView="'auto'"
        :coverflowEffect="{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }"
        :loop="true"
        :pagination="true"
        :modules="modules"
        class="mySwiper"
      >
        <swiper-slide class="bg-white p-4">
          <div class="profile d-flex align-items-center mb-3">
            <h6 class="m-0 ms-2">Random user1</h6>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus corporis facilis unde dolor, ex asperiores recusandae dolore necessitatibus! Porro, recusandae.</p>
            <div class="rating">
              <i class="bi bi-star-fill text-warning"></i>
              <i class="bi bi-star-fill text-warning"></i>
              <i class="bi bi-star-fill text-warning"></i>
              <i class="bi bi-star-fill text-warning"></i>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="bg-white p-4">
          <div class="profile d-flex align-items-center mb-3">
            <h6 class="m-0 ms-2">Random user1</h6>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus corporis facilis unde dolor, ex asperiores recusandae dolore necessitatibus! Porro, recusandae.</p>
            <div class="rating">
              <i class="bi bi-star-fill text-warning"></i>
              <i class="bi bi-star-fill text-warning"></i>
              <i class="bi bi-star-fill text-warning"></i>
              <i class="bi bi-star-fill text-warning"></i>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="bg-white p-4">
          <div class="profile d-flex align-items-center mb-3">
            <h6 class="m-0 ms-2">Random user1</h6>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus corporis facilis unde dolor, ex asperiores recusandae dolore necessitatibus! Porro, recusandae.</p>
            <div class="rating">
              <i class="bi bi-star-fill text-warning"></i>
              <i class="bi bi-star-fill text-warning"></i>
              <i class="bi bi-star-fill text-warning"></i>
              <i class="bi bi-star-fill text-warning"></i>
            </div>
          </div>
        </swiper-slide>
      </swiper>

      <div class="col-lg-12 text-center mt-5">
        <a href="#" class="btn btn-sm btn-outline-dark rounded-0 fw-bold shadow-none">Know More >>></a>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';

import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { EffectCoverflow, Pagination } from 'swiper/modules';
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [EffectCoverflow, Pagination],
    };
  },
};
</script>

<style></style>
