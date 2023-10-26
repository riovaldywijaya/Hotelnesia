<template>
  <div class="col-lg-4 col-md-6 my-3">
    <div class="card border-0 shadow" style="max-width: 350px; margin: auto">
      <img :src="room.imageUrl" class="card-img-top" />

      <div class="card-body">
        <h5>{{ room.name }}</h5>
        <h6 class="mb-4">
          <span style="color: #2e44c1">{{ changeFormatRupiah(room.price) }} </span>

          per night
        </h6>
        <div class="features mb-4">
          <h6 class="mb-1">Features</h6>
          <span class="badge rounded-pill bg-light text-dark text-wrap" v-for="feature in splitFeatures" :key="feature.id"> {{ feature }} </span>
          <!-- <span class="badge rounded-pill bg-light text-dark text-wrap"> 2 Rooms </span>
          <span class="badge rounded-pill bg-light text-dark text-wrap"> 1 Bathroom </span>
          <span class="badge rounded-pill bg-light text-dark text-wrap"> 1 Balcony </span>
          <span class="badge rounded-pill bg-light text-dark text-wrap"> 3 Sofa </span> -->
        </div>
        <div class="facilities mb-4">
          <h6 class="mb-1">Facilities</h6>
          <span class="badge rounded-pill bg-light text-dark text-wrap" v-for="facility in splitFacilities" :key="facility.id"> {{ facility }} </span>
          <!-- <span class="badge rounded-pill bg-light text-dark text-wrap"> Wifi </span>
          <span class="badge rounded-pill bg-light text-dark text-wrap"> Television </span>
          <span class="badge rounded-pill bg-light text-dark text-wrap"> AC </span>
          <span class="badge rounded-pill bg-light text-dark text-wrap"> Room heater </span> -->
        </div>
        <div class="guests">
          <h6 class="mb-1">Guests</h6>
          <span class="badge rounded-pill bg-light text-dark text-wrap"> {{ room.adult }} Adults </span>
          <span class="badge rounded-pill bg-light text-dark text-wrap"> {{ room.children }} Children </span>
        </div>
        <br />
        <div class="rating mb-4">
          <h6 class="mb-1">Rating</h6>
          <span class="badge rounded-pill bg-light">
            <i class="bi bi-star-fill text-warning"></i>
            <i class="bi bi-star-fill text-warning"></i>
            <i class="bi bi-star-fill text-warning"></i>
            <i class="bi bi-star-fill text-warning"></i>
          </span>
          <span class="badge rounded-pill bg-light text-dark text-wrap"></span>
        </div>
        <div class="d-flex justify-content-evenly mb-2">
          <a href="#" class="btn btn-sm text-white custom-bg shadow-none" @click.prevent="clickBook">Book Now</a>
          <a href="#" class="btn btn-sm btn-outline-dark shadow-none" @click.prevent="clickDetail">More details</a>
        </div>
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
  computed: {
    splitFeatures() {
      return this.room.features.split(',');
    },
    splitFacilities() {
      return this.room.facilities.split(',');
    },
  },
};
</script>

<style></style>
