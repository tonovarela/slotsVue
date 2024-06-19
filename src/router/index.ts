import ProjectLayout from '@/modules/projects/layout/ProjectLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ProjectLayout,
    redirect: { name: 'Projects' },
    children: [
      { path: '', name: 'Projects', component: () => import('@/modules/projects/views/ProjectsView.vue'), },
      { path: '/project/:id', props: true, name: 'Project', component: () => import('@/modules/projects/views/ProjectView.vue') },
    ],
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
