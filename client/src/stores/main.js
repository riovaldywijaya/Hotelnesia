import { defineStore } from 'pinia';
import axios from 'axios';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

const baseUrl = 'http://localhost:3000';
export const useMainStore = defineStore('main', {
  state() {
    return {
      access_token: localStorage.access_token,
      rooms: [],
      room: {},
      qrcode: '',
      customer: {},
    };
  },
  actions: {
    async register(form) {
      try {
        const formData = new FormData();

        formData.append('profilePicture', form.profilePicture);
        formData.append('name', form.name);
        formData.append('email', form.email);
        formData.append('phoneNumber', form.phoneNumber);
        formData.append('address', form.address);
        formData.append('dateOfBirth', form.dateOfBirth);
        formData.append('password', form.password);

        const { data } = await axios({
          method: 'post',
          url: baseUrl + '/register',
          data: formData,
        });

        console.log(data);

        Toast.fire({
          icon: 'success',
          title: 'Registered successfully',
        });
      } catch (error) {
        console.error(error);
      }
    },

    async login(form) {
      try {
        const { data } = await axios({
          method: 'post',
          url: baseUrl + '/login',
          data: form,
        });
        localStorage.access_token = data.access_token;
        this.access_token = data.access_token;
        Toast.fire({
          icon: 'success',
          title: 'Logged in successfully',
        });
      } catch (error) {
        console.error(error);
      }
    },

    async logout() {
      try {
        localStorage.clear();
        this.access_token = null;
        this.$router.push({ name: 'home' });
        Toast.fire({
          icon: 'success',
          title: 'Logged out successfully',
        });
      } catch (error) {
        console.error(error);
      }
    },

    async fetchDataRooms() {
      try {
        const { data } = await axios({
          method: 'get',
          url: baseUrl + '/rooms',
          headers: {
            access_token: localStorage.access_token,
          },
        });

        this.rooms = data;
      } catch (error) {
        console.error(error);
      }
    },

    async fetchDetailRoom(roomId) {
      try {
        Swal.fire({
          title: 'Uploading...',
          html: 'Please wait...',
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        const { data } = await axios({
          method: 'get',
          url: baseUrl + `/rooms/${roomId}`,
          headers: {
            access_token: localStorage.access_token,
          },
        });

        this.room = data.room;
        this.qrcode = data.qr;
        Swal.close();
      } catch (error) {
        console.error(error);
      }
    },

    async fetchDataCustomer() {
      try {
        const { data } = await axios({
          method: 'get',
          url: baseUrl + '/customers',
          headers: {
            access_token: localStorage.access_token,
          },
        });

        this.customer = data;
      } catch (error) {
        console.error(error);
      }
    },

    async changeStatusPayment(bookingId) {
      try {
        await axios({
          method: 'patch',
          url: baseUrl + `/bookings/${bookingId}`,
          headers: {
            access_token: localStorage.access_token,
          },
        });

        this.$router.push({ name: 'home' });
        Toast.fire({
          icon: 'success',
          title: 'Your payment is successful',
        });
      } catch (error) {
        console.error(error);
      }
    },

    async generateMidtrans(formData) {
      try {
        const { data } = await axios({
          method: 'post',
          url: baseUrl + '/generate-midtrans-token',
          headers: {
            access_token: localStorage.access_token,
          },
          data: formData,
        });

        const cb = this.changeStatusPayment;
        snap.pay(data.midtransToken.token, {
          onSuccess: function (result) {
            console.log(result);
            cb(data.bookingId);
          },
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
});
