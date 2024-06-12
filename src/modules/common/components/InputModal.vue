<template>
    <dialog id="my_modal_1" class="modal" :open="open">
        <div class="modal-box">
            <h3 class="font-bold text-lg">{{ title }}</h3>
            <p class="py-4">{{ subtitle }}</p>
            <div class="modal-action  flex flex-col">
                <form method="dialog" @submit.prevent="submitValue">
                    <input type="text" ref="inputRef" v-model="inputValue" :placeholder="placeholder"
                        class="input input-bordered input-primary w-full flex-1 ">
                    <div class="flex justify-end mt-5">
                        <button class="btn mr-4" @click="$emit('close')">Close</button>
                        <button type="submit" class="btn btn-primary">Aceptar</button>
                    </div>

                </form>
            </div>
        </div>
    </dialog>
    <div v-if="open" class="modal-backdrop fixed top-0 left-0 z-10  bg-gray-500/50  w-screen h-screen">
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
interface Props {
    open: boolean;
    placeholder?: string;
    title?: string;
    subtitle?: string;
}
const emits = defineEmits<{
    close: [void];
    value: [text: string];
}>();

withDefaults(defineProps<Props>(), {
    placeholder: "Ingrese el nombre del proyecto",
    title: "Hello!",
    subtitle: "Press ESC key or click the button below to close"
});

const inputValue = ref('');
const inputRef = ref<HTMLInputElement | null>(null);

const submitValue = () => {
    if (!inputValue.value) {
        inputRef.value?.focus();
        return;
    }
    emits('value', inputValue.value.trim());
    emits('close');
    inputValue.value = '';
};
</script>