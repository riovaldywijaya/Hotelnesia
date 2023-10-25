<template>
  <div class="card mb-4 border-0 shadow">
    <div class="row g-0 p-3 align-items-center">
      <div class="col-md-5 mb-lg-0 mb-md-0 mb-3">
        <img :src="room.imageUrl" class="img-fluid rounded" />
      </div>
      <div class="col-md-5 px-lg-3 px-md-3 px-0">
        <h5 class="mb-3">{{ room.name }}</h5>
        <div class="features mb-3">
          <h6 class="mb-1">Features</h6>
          <span class="badge rounded-pill bg-light text-dark text-wrap"> 2 Rooms </span>
          <span class="badge rounded-pill bg-light text-dark text-wrap"> 1 Bathroom </span>
          <span class="badge rounded-pill bg-light text-dark text-wrap"> 1 Balcony </span>
          <span class="badge rounded-pill bg-light text-dark text-wrap"> 3 Sofa </span>
        </div>
        <div class="facilities mb-3">
          <h6 class="mb-1">Facilities</h6>
          <span class="badge rounded-pill bg-light text-dark text-wrap"> Wifi </span>
          <span class="badge rounded-pill bg-light text-dark text-wrap"> Television </span>
          <span class="badge rounded-pill bg-light text-dark text-wrap"> AC </span>
          <span class="badge rounded-pill bg-light text-dark text-wrap"> Room heater </span>
        </div>
        <div class="guests">
          <h6 class="mb-1">Guests</h6>
          <span class="badge rounded-pill bg-light text-dark text-wrap"> 5 Adults </span>
          <span class="badge rounded-pill bg-light text-dark text-wrap"> 4 Children </span>
        </div>
      </div>
      <div class="col-md-2 text-center">
        <h6 class="mb-4">
          <span style="color: #2e44c1; font-size: 18px">{{ changeFormatRupiah(room.price) }}</span>
          per night
        </h6>

        <a href="#" class="btn btn-sm w-100 text-white custom-bg shadow-none mb-2" @click.prevent="clickBook">Book Now</a>
        <a href="#" class="btn btn-sm w-100 btn-outline-dark shadow-none" @click.prevent="clickDetail">More details</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import { useMainStore } from '../stores/main';
export default {
  props: ['room'],
  methods: {
    ...mapActions(useMainStore, ['changeFormatRupiah']),
    clickBook() {
      this.$router.push({
        name: 'booking',
        params: {
          id: this.room.id,
        },
      });
    },
    clickDetail() {
      this.$router.push({
        name: 'detailRoom',
        params: {
          id: this.room.id,
        },
      });
    },
  },
};
</script>

<style></style>
