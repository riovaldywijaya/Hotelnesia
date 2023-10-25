<template>
  <div>
    <Navbar />
    <div class="container">
      <h1 class="mt-5 pt-4 mb-4 text-center fw-bold h-font">Booking Room</h1>
      <div class="row">
        <div class="col-lg-3"></div>
        <div class="col-lg-6">
          <form @submit.prevent="submitBook">
            <div class="mb-3">
              <label class="form-label">Name</label>
              <input type="text" class="form-control" disabled :value="customer.name" />
            </div>
            <div class="mb-3">
              <label class="form-label">Email address</label>
              <input type="email" class="form-control" disabled :value="customer.email" />
            </div>
            <div class="mb-3">
              <label class="form-label">Phone number</label>
              <input type="text" class="form-control" disabled :value="customer.phoneNumber" />
            </div>
            <div class="mb-3">
              <label class="form-label">Address</label>
              <textarea class="form-control shadow-none" rows="1" disabled :value="customer.address"></textarea>
              <!-- <input type="text" class="form-control" :value="customer.address" /> -->
            </div>
            <div class="mb-3">
              <label class="form-label">Check-In date</label>
              <input type="date" class="form-control" v-model="customerData.checkinDate" />
            </div>
            <div class="mb-3">
              <label class="form-label">Check-Out date</label>
              <input type="date" class="form-control" v-model="customerData.checkoutDate" />
            </div>

            <div class="mb-3">
              <label class="form-label"> Room</label>
              <input type="text" class="form-control" disabled :value="room.name" />
            </div>
            <div class="mb-3">
              <label class="form-label">Total Price</label>
              <input type="text" disabled class="form-control" :value="countTotalPrice" />
            </div>

            <button type="submit" class="btn w-100 text-white custom-bg shadow-none mb-2">Submit</button>
            <button type="submit" class="btn btn-danger w-100 text-white shadow-none">Cancel</button>
          </form>
        </div>
        <div class="col-lg-3"></div>
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
  data() {
    return {
      customerData: {
        name: '',
        email: '',
        phoneNumber: '',
        address: '',
        checkinDate: '',
        checkoutDate: '',
      },
      roomData: {
        name: '',
        price: '',
      },
    };
  },
  components: {
    Navbar,
    Footerr,
  },
  computed: {
    ...mapState(useMainStore, ['room', 'customer']),
    countTotalPrice() {
      if (this.customerData.checkinDate && this.customerData.checkoutDate) {
        let tgl1 = new Date(this.customerData.checkinDate);
        let tgl2 = new Date(this.customerData.checkoutDate);
        let selisih = Math.abs((tgl2 - tgl1) / (1000 * 60 * 60 * 24));
        return isNaN(selisih) ? 'Format tanggal tidak valid' : selisih * this.room.price;
      } else {
        return '';
      }
    },
  },
  methods: {
    ...mapActions(useMainStore, ['fetchDetailRoom', 'fetchDataCustomer', 'generateMidtrans']),
    submitBook() {
      this.generateMidtrans({
        RoomId: this.room.id,
        checkinDate: this.customerData.checkinDate,
        checkoutDate: this.customerData.checkoutDate,
        totalPayment: this.countTotalPrice,
      });
    },
  },
  created() {
    this.fetchDetailRoom(this.$route.params.id);
    this.fetchDataCustomer();
  },
};
</script>

<style></style>
