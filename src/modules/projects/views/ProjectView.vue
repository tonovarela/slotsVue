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
                <tr class="hover">
                    <th>1</th>
                    <td>Cy Ganderton</td>
                    <td>Quality Control Specialist</td>
                    <td>Blue</td>
                </tr>

            </tbody>
        </table>
        <input-modal :open="modalOpen" title="Nuevo Proyecto" subtitle=" Dale un nombre único a tu proyecto"
            placeholder="Ingrese el nombre del proyecto" @close="cerrarModal" @value="onNewProject" />
        <fab-button @click="modalOpen = true">
            <add-circle />
        </fab-button>

    </div>
</template>

<script setup lang="ts">
import FabButton from '@/modules/common/components/FabButton.vue';
import AddCircle from '@/modules/common/icons/AddCircle.vue';
import InputModal from '@/modules/common/components/InputModal.vue';
import { ref } from 'vue';

const modalOpen = ref(false);

const cerrarModal = () => {
    modalOpen.value = false;
};

const onNewProject = (project: string) => {
    console.log(project);

};




</script>