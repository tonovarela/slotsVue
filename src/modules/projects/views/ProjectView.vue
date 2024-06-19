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
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="hover" v-for=" (task, index) in project.tasks">
                            <th>{{ index + 1 }}</th>
                            <td>{{ task.name }}</td>
                            <td>Desktop Support Technician</td>
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
import Breadcrums from '@/modules/common/components/Breadcrums.vue';
import { useProjectsStore } from '../stores/projects.store';
import { watch, ref } from 'vue';
import { useRouter } from 'vue-router';
interface Props {
    id: string;
}
const router = useRouter();

const props = defineProps<Props>();

const projectsStore = useProjectsStore();
const project = ref<Project | null>();
const newModel = ref<string>('');
const newTask = ref<string>('');

watch(
    () => props.id,
    (newId) => {
        project.value = projectsStore.projectList.find((project) => project.id === props.id);
        if (!project.value) { router.replace('/'); }
    },
    { immediate: true }
);

</script>
