import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import RoomsPage from '../views/RoomsPage.vue';
import DetailRoomPage from '../views/DetailRoomPage.vue';
import BookingPage from '../views/BookingPage.vue';
import Swal from 'sweetalert2';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/rooms',
      name: 'rooms',
      component: RoomsPage,
    },
    {
      path: '/rooms/:id',
      name: 'detailRoom',
      component: DetailRoomPage,
    },
    {
      path: '/bookings/:id',
      name: 'booking',
      component: BookingPage,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (!localStorage.access_token && to.name === 'booking') {
    next({ name: 'home' });
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please login first',
    });
  } else {
    next();
  }
});

export default router;
