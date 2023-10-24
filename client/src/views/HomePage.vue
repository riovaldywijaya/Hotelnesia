<template>
  <div>
    <Navbar />
    <!-- START CAROUSEL -->
    <Carousel />
    <!-- END CAROUSEL -->

    <!-- START Check availability form -->
    <div class="container availability-form">
      <div class="row">
        <div class="col-lg-12 bg-white shadow p-4 rounded">
          <h5 class="mb-4">Check Booking Availability</h5>
          <form>
            <div class="row align-items-end">
              <div class="col-lg-3 mb-3">
                <label class="form-label" style="font-weight: 500">Check-in</label>
                <input type="date" class="form-control shadow-none" />
              </div>
              <div class="col-lg-3 mb-3">
                <label class="form-label" style="font-weight: 500">Check-out</label>
                <input type="date" class="form-control shadow-none" />
              </div>
              <div class="col-lg-3 mb-3">
                <label class="form-label" style="font-weight: 500">Adult</label>
                <select class="form-select shadow-none">
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div class="col-lg-2 mb-3">
                <label class="form-label" style="font-weight: 500">Children</label>
                <select class="form-select shadow-none">
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div class="col-lg-1 mb-lg-3 mt-2">
                <button type="submit" class="btn text-white shadow-none custom-bg">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- END Check availability form -->

    <!-- START Our Rooms -->
    <OurRooms />
    <!-- END Our Rooms -->

    <!-- START Our Facilities -->
    <OurFacilities />
    <!-- END Our Facilities -->

    <!-- START Testimonials -->

    <Testimonials />
    <!-- END Testimonials -->

    <!-- START Reach Us -->
    <ReachUs />
    <!-- END Reach Us -->
    <Footerr />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Footerr from '../components/Footer.vue';
import OurRooms from '../components/OurRooms.vue';
import OurFacilities from '../components/OurFacilities.vue';
import Testimonials from '../components/Testimonials.vue';
import ReachUs from '../components/ReachUs.vue';
import Carousel from '../components/Carousel.vue';
export default {
  components: {
    Navbar,
    Footerr,
    OurRooms,
    OurFacilities,
    Testimonials,
    ReachUs,
    Carousel,
  },
};
</script>

<style></style>
