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
    return {};
  },
  getters: {},
  actions: {
    async register(form) {
      try {
        const formData = new FormData();

        // formData.append('profilePicture', form.profilePicture);
        // formData.append('name', form.name);
        // formData.append('email', form.email);
        // formData.append('phoneNumber', form.phoneNumber);
        // formData.append('address', form.address);
        // formData.append('dateOfBirth', form.dateOfBirth);
        // formData.append('password', form.password);

        // const { data } = await axios({
        //   method: 'post',
        //   url: baseUrl + '/register',
        //   data: formData,
        // });

        // console.log(data);
        this.$router.push({ name: 'home' });
        Toast.fire({
          icon: 'success',
          title: 'Registered successfully',
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
});
