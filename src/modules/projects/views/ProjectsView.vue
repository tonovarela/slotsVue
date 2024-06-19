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
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <!-- row 1 -->
                <tr v-for=" (project, index) in projectsStore.projectsWithCompletion" :key="project.id" class="hover">
                    <th>{{ index + 1 }}</th>
                    <td>
                        <span @dblclick=" modalEdit = true; projectEdit = project">
                            {{ project.name }}
                        </span>

                    </td>
                    <td>{{ project.taskCount }}</td>
                    <td>
                        <progress class="progress progress-primary w-56" :value="project.completion"
                            max="100"></progress>
                        {{ project.completion }}%
                    </td>
                    <td>
                        <div class='flex flex-row items-center space-x-5 '>

                            <button @click=" modalEdit = true; projectEdit = project"
                                class="flex p-1.5 bg-yellow-500 rounded-xl hover:rounded-3xl hover:bg-yellow-600 transition-all duration-300 text-white">
                                <edit-icon />
                            </button>
                            <button @click="modalDelete = true; projectDelete = project"
                                class="flex p-1.5 bg-red-500 rounded-xl hover:rounded-3xl hover:bg-red-600 transition-all duration-300 text-white">
                                <trash-icon />
                            </button>

                        </div>

                    </td>
                </tr>

            </tbody>
        </table>
        <input-modal :open="modalOpen" title="Nuevo Proyecto" subtitle=" Dale un nombre único a tu proyecto"
            placeholder="Ingrese el nombre del proyecto" @close="cerrarModal" @value="projectsStore.addProject" />

        <input-modal :open="modalEdit" title="Editar Proyecto" subtitle="Editar el nombre de tu proyecto"
            :value="projectEdit?.name" @close="modalEdit = false" @value="editarProyecto" />


        <custom-modal :open="modalDelete">
            <template #header>
                <svg aria-hidden="true" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </template>
            <template #body>
                <div class="text-center">
                    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Estas seguro de borrar este proyecto?
                    </h3>
                </div>

            </template>
            <template #footer>
                <div class="text-center">
                    <button data-modal-toggle="popup-modal" type="button" @click="modalDelete = false"
                        class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600 mr-3">
                        Cancelar</button>
                    <button data-modal-toggle="popup-modal" type="button" @click="borrarProyecto()"
                        class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center ">
                        Si,borrarlo
                    </button>
                </div>
            </template>

        </custom-modal>

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
import { ref } from 'vue';
import type { Project } from '../interfaces/project.interface';

import { useProjectsStore } from '../stores/projects.store';

import FabButton from '@/modules/common/components/FabButton.vue';
import AddCircle from '@/modules/common/icons/AddCircle.vue';
import CodeIcon from '@/modules/common/icons/CodeIcon.vue';
import InputModal from '@/modules/common/components/InputModal.vue';
import CustomModal from '@/modules/common/components/CustomModal.vue';
import TrashIcon from '@/modules/common/icons/TrashIcon.vue';
import EditIcon from '@/modules/common/icons/EditIcon.vue';

const modalOpen = ref(false);
const modalDelete = ref(false);
const customModalOpen = ref(false);
const modalEdit = ref(false);


const projectsStore = useProjectsStore();
const projectEdit = ref<Project | null>(null);
const projectDelete = ref<Project | null>(null);


const cerrarModal = () => {
    modalOpen.value = false;
};




const editarProyecto = (newName: string) => {
    projectsStore.editNameProject(projectEdit.value?.id!, newName);
    projectEdit.value = null;
};
const borrarProyecto = () => {
    projectsStore.removeProject(projectDelete.value?.id!);
    modalDelete.value = false;

}









</script>