<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="row">
        <div class="col-lg-12 mt-4">
          <img src="../assets/images/rooms/1.jpg" class="img-fluid rounded" />
        </div>
      </div>
      <div class="row rounded mt-5" style="background-color: white">
        <div class="col-lg-8">
          <h1 class="mb-3 mt-5">Simple Room Name</h1>
          <div class="description mb-3">
            <h5 class="mb-1">Description</h5>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum a accusantium, maxime optio animi error tempore earum deserunt suscipit quos, mollitia inventore eos voluptas magnam labore eaque dicta nisi repellendus fugit.
              Placeat aperiam fugiat cum architecto provident deserunt iure nisi voluptate mollitia voluptas accusantium quibusdam itaque rem, ipsam quos laudantium!
            </p>
          </div>
          <div class="features mb-3">
            <h5 class="mb-1">Features</h5>
            <span class="badge rounded-pill bg-light text-dark text-wrap"> 2 Rooms </span>
            <span class="badge rounded-pill bg-light text-dark text-wrap"> 1 Bathroom </span>
            <span class="badge rounded-pill bg-light text-dark text-wrap"> 1 Balcony </span>
            <span class="badge rounded-pill bg-light text-dark text-wrap"> 3 Sofa </span>
          </div>
          <div class="facilities mb-3">
            <h5 class="mb-1">Facilities</h5>
            <span class="badge rounded-pill bg-light text-dark text-wrap"> Wifi </span>
            <span class="badge rounded-pill bg-light text-dark text-wrap"> Television </span>
            <span class="badge rounded-pill bg-light text-dark text-wrap"> AC </span>
            <span class="badge rounded-pill bg-light text-dark text-wrap"> Room heater </span>
          </div>
          <div class="guests mb-3">
            <h5 class="mb-1">Guests</h5>
            <span class="badge rounded-pill bg-light text-dark text-wrap"> 5 Adults </span>
            <span class="badge rounded-pill bg-light text-dark text-wrap"> 4 Children </span>
          </div>
          <div class="col-md-2 mb-3">
            <h5 class="mb-1 mb-1">Price</h5>
            <h7 class="mb-4" style="font-size: 13px"
              >Start from <span> <h2>Rp1,000,000</h2></span> /room/night
            </h7>
          </div>
          <a href="#" class="btn btn-sm w-100 text-white custom-bg shadow-none mb-2">Book Now</a>
        </div>
        <div class="col-4 mt-3">
          <img src="../assets/images/rooms/1.jpg" style="width: 380px; height: 380px" />
        </div>
      </div>
    </div>

    <Footerr />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Footerr from '../components/Footer.vue';
export default {
  components: {
    Navbar,
    Footerr,
  },
};
</script>

<style></style>
