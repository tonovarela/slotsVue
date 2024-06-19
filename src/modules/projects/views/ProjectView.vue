<template>
    <div class="w-full">
        <section class="m-2">
            <Breadcrums :name="project?.name ?? 'no-name'" />
        </section>

        <section class="m-3">
            <div class="overflow-x-auto">
                <table class="table table-zebra">
                    <thead>
                        <tr>
                            <th class="w-14">Completada</th>
                            <th>Tarea</th>
                            <th>Completada en</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="hover" v-for=" task in project?.tasks">
                            <th>
                                <input @change="projectsStore.toogleTask(project?.id || '', task.id)" type="checkbox"
                                    :checked="!!task.completeAt" class="checkbox checkbox-primary" />
                            </th>
                            <td>{{ task.name }}</td>
                            <td>{{ task.completeAt }}</td>
                            <td>
                                <button @click="projectsStore.removeTask(project?.id || '', task.id)"
                                    class="flex p-1.5 bg-red-500 rounded-xl hover:rounded-3xl hover:bg-red-600 transition-all duration-300 text-white">
                                    <TrashIcon />
                                </button>
                            </td>
                        </tr>
                        <tr class="hover">
                            <td></td>
                            <td colspan="2">
                                <input type="text" v-model="newTask"
                                    @keyup.enter="projectsStore.addTask(props.id, newTask); newTask = ''"
                                    class="input input-primary hover:opacity-100 focus:opacity-100 w-full opacity-60 transition-all"
                                    placeholder="Nueva tarea">
                            </td>

                        </tr>


                    </tbody>
                </table>
            </div>
        </section>

    </div>

</template>

<script setup lang="ts">
import { watch, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useProjectsStore } from '../stores/projects.store';
import type { Project } from '../interfaces/project.interface';

import Breadcrums from '@/modules/common/components/Breadcrums.vue';
import TrashIcon from '@/modules/common/icons/TrashIcon.vue';


interface Props {
    id: string;
}
const router = useRouter();

const props = defineProps<Props>();

const projectsStore = useProjectsStore();
const project = ref<Project | null>();

const newTask = ref<string>('');

watch(
    () => props.id,
    (newId) => {
        project.value = projectsStore.projectList.find((project) => project.id === newId);
        if (!project.value) { router.replace('/'); }
    },
    { immediate: true }
);



</script>
