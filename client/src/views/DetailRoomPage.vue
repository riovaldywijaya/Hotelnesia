<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="row">
        <div class="col-lg-12 mt-4">
          <img :src="room.imageUrl" class="img-fluid rounded mx-auto d-block" />
        </div>
      </div>
      <div class="row rounded mt-5" style="background-color: white">
        <div class="col-lg-8">
          <h1 class="mb-3 mt-5">{{ room.name }}</h1>
          <div class="description mb-3">
            <h5 class="mb-1">Description</h5>
            <p>
              {{ room.description }}
            </p>
          </div>
          <div class="features mb-3">
            <h5 class="mb-1">Features</h5>

            <span class="badge rounded-pill bg-light text-dark text-wrap" v-for="feature in splitFeatures" :key="feature.id"> {{ feature }} </span>
            <!-- <span class="badge rounded-pill bg-light text-dark text-wrap"> 2 Rooms </span>
            <span class="badge rounded-pill bg-light text-dark text-wrap"> 1 Bathroom </span>
            <span class="badge rounded-pill bg-light text-dark text-wrap"> 1 Balcony </span>
            <span class="badge rounded-pill bg-light text-dark text-wrap"> 3 Sofa </span> -->
          </div>
          <div class="facilities mb-3">
            <h5 class="mb-1">Facilities</h5>
            <span class="badge rounded-pill bg-light text-dark text-wrap" v-for="facility in splitFacilities" :key="facility.id"> {{ facility }} </span>
            <!-- <span class="badge rounded-pill bg-light text-dark text-wrap"> Wifi </span>
            <span class="badge rounded-pill bg-light text-dark text-wrap"> Television </span>
            <span class="badge rounded-pill bg-light text-dark text-wrap"> AC </span>
            <span class="badge rounded-pill bg-light text-dark text-wrap"> Room heater </span> -->
          </div>
          <div class="guests mb-3">
            <h5 class="mb-1">Guests</h5>
            <span class="badge rounded-pill bg-light text-dark text-wrap"> {{ room.adult }} Adults </span>
            <span class="badge rounded-pill bg-light text-dark text-wrap"> {{ room.children }} Children </span>
          </div>
          <div class="col-md-2 mb-3">
            <h5 class="mb-1 mb-1">Price</h5>
            <h6 class="mb-4" style="font-size: 13px"></h6>
            Start from
            <span>
              <h2 style="color: #2e44c1">{{ changeFormatRupiah(room.price) }}</h2>
            </span>
            /room/night
          </div>
          <a href="#" class="btn btn-sm w-100 text-white custom-bg shadow-none mb-2" @click.prevent="clickBook">Book Now</a>
          <a href="#" class="btn btn-sm w-100 text-white custom-bg-back shadow-none mb-2" @click.prevent="$router.go(-1)">Go Back</a>
        </div>
        <div class="col-4 mt-3" v-html="qrcode"></div>
      </div>
    </div>

    <Footerr />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Footerr from '../components/Footer.vue';
import { mapActions, mapState } from 'pinia';
import { useMainStore } from '../stores/main';
export default {
  components: {
    Navbar,
    Footerr,
  },
  methods: {
    ...mapActions(useMainStore, ['fetchDetailRoom', 'changeFormatRupiah']),
    clickBook() {
      this.$router.push({
        name: 'booking',
        params: {
          id: this.room.id,
        },
      });
    },
  },
  computed: {
    ...mapState(useMainStore, ['room', 'qrcode']),
    splitFeatures() {
      return this.room.features.split(',');
    },
    splitFacilities() {
      return this.room.facilities.split(',');
    },
  },
  created() {
    this.fetchDetailRoom(this.$route.params.id);
  },
};
</script>

<style></style>
