<template>

    <div class="overflow-x-auto text-white w-full">
        <table class="table">
            <!-- head -->
            <thead>
                <tr>
                    <th></th>
                    <th>Proyecto</th>
                    <th>Tareas</th>
                    <th>Avance</th>
                </tr>
            </thead>
            <tbody>
                <!-- row 1 -->
                <tr v-for=" (project, index) in projectsStore.projectList " :key="project.id" class="hover">
                    <th>{{ index + 1 }}</th>
                    <td>{{ project.name }}</td>
                    <td>{{ project.tasks.length }}</td>
                    <td>
                        <progress class="progress progress-primary w-56" value="10" max="100"></progress>
                    </td>
                </tr>

            </tbody>
        </table>
        <input-modal :open="modalOpen" title="Nuevo Proyecto" subtitle=" Dale un nombre único a tu proyecto"
            placeholder="Ingrese el nombre del proyecto" @close="cerrarModal" @value="projectsStore.addProject" />
        <custom-modal :open="customModalOpen">
            <template #header>
                <h1 class="text-3xl">Cabecera</h1>
            </template>
            <template #body>
                <h1>Varela </h1>
            </template>
            <template #footer>
                <div class="flex justify-end mt-5">
                    <button class="btn mr-4" @click="customModalOpen = false">Close</button>
                    <button type="submit" @click="customModalOpen = false" class="btn btn-primary">Aceptar</button>
                </div>
            </template>

        </custom-modal>

        <fab-button @click="modalOpen = true">
            <add-circle />
        </fab-button>
        <fab-button @click="customModalOpen = true" position="bottom-left">
            <code-icon />
        </fab-button>

    </div>
</template>

<script setup lang="ts">
import FabButton from '@/modules/common/components/FabButton.vue';
import AddCircle from '@/modules/common/icons/AddCircle.vue';
import CodeIcon from '@/modules/common/icons/CodeIcon.vue';
import InputModal from '@/modules/common/components/InputModal.vue';
import CustomModal from '@/modules/common/components/CustomModal.vue';
import { ref } from 'vue';
import { useProjectsStore } from '../stores/projects.store';

const modalOpen = ref(false);
const customModalOpen = ref(false);

const projectsStore = useProjectsStore();

const cerrarModal = () => {
    modalOpen.value = false;
};





</script>