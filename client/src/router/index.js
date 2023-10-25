import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import RoomsPage from '../views/RoomsPage.vue';
import DetailRoomPage from '../views/DetailRoomPage.vue';

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
  ],
});

export default router;
