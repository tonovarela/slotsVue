import ProjectLayout from '@/modules/projects/layout/ProjectLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ProjectLayout,
    redirect: { name: 'Proyecto' },
    children: [
      {
        path: '',
        name: 'Proyecto',
        component: () => import('@/modules/projects/views/ProjectView.vue'),
      },
    ],
  },
  //{ path: '/about', component: AboutView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
