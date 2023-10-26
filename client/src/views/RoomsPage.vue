<template>
  <div>
    <Navbar />
    <div class="my-5 px-4">
      <h2 class="fw-bold h-font text-center">OUR ROOMS</h2>
      <div class="h-line bg-dark"></div>
    </div>

    <div class="container">
      <div class="row">
        <!-- FILTER -->
        <div class="col-lg-3 col-md-12 mb-lg-0 mb-4 px-lg-0">
          <nav class="navbar navbar-expand-lg navbar-light bg-white rounded shadow">
            <div class="container-fluid flex-lg-column align-item-stretch">
              <h4 class="mt-2">FILTERS</h4>
              <button class="navbar-toggler shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#filterDropdown" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse flex-column align-item-strech" id="filterDropdown">
                <div class="border bg-light p-3 rounded mb-3">
                  <h5 class="mb-3" style="font-size: 18px">CHECK AVAILABILITY</h5>
                  <label class="form-label">Check-in</label>
                  <input type="date" class="form-control shadow-none mb-3" disabled />
                  <label class="form-label">Check-out</label>
                  <input type="date" class="form-control shadow-none" disabled />
                </div>
                <div class="border bg-light p-3 rounded mb-3">
                  <h5 class="mb-3" style="font-size: 18px">FACILITIES</h5>
                  <div class="mb-2">
                    <input type="checkbox" id="f1" class="form-check-input shadow-none me-1" disabled />
                    <label class="form-check-label" for="f1">Facility one</label>
                  </div>
                  <div class="mb-2">
                    <input type="checkbox" id="f2" class="form-check-input shadow-none me-1" disabled />
                    <label class="form-check-label" for="f2">Facility two</label>
                  </div>
                  <div class="mb-2">
                    <input type="checkbox" id="f3" class="form-check-input shadow-none me-1" disabled />
                    <label class="form-check-label" for="f3">Facility three</label>
                  </div>
                </div>
                <div class="border bg-light p-3 rounded mb-3">
                  <h5 class="mb-3" style="font-size: 18px">GUESTS</h5>
                  <div class="d-flex">
                    <div class="me-3">
                      <label class="form-label">Adults</label>
                      <input type="number" class="form-control shadow-none" disabled />
                    </div>
                    <div>
                      <label class="form-label">Children</label>
                      <input type="number" class="form-control shadow-none" disabled />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <!-- ROOMS -->
        <div class="col-lg-9 col-md-12 px-4">
          <RoomsCard v-for="room in rooms" :key="room.id" :room="room" />
        </div>
      </div>
    </div>
    <div style="padding-left: 900px">
      <nav aria-label="...">
        <ul class="pagination">
          <li :class="[page.number <= 1 ? `page-item disabled` : `page-item`]">
            <a class="page-link" style="color: #2e44c1" href="#" @click="handlePaginationFilter(-1)">Previous</a>
          </li>
          <li class="page-item">
            <a class="page-link" style="color: #2e44c1" href="#" @click="handlePaginationFilter(1)">Next</a>
          </li>
        </ul>
      </nav>
    </div>
    <Footerr />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Footerr from '../components/Footer.vue';
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useMainStore } from '../stores/main';
import RoomsCard from '../components/RoomsCard.vue';
export default {
  components: {
    Navbar,
    Footerr,
    RoomsCard,
  },
  data() {
    return {
      page: {
        size: 5,
        number: 1,
      },
    };
  },
  methods: {
    ...mapActions(useMainStore, ['fetchDataRooms', 'changeFormatRupiah']),
    handlePaginationFilter(direction) {
      this.page.number += direction;
      this.page.size = 5;
      this.fetchDataRooms({ page: this.page });
    },
  },
  created() {
    this.fetchDataRooms({ page: this.page });
  },
  computed: {
    ...mapState(useMainStore, ['rooms']),
    ...mapWritableState(useMainStore, ['filter']),
  },
};
</script>

<style></style>
