<template>
    <button @click="$emit('click')" :class="['btn btn-circle  btn-secondary fixed', position]">
        <slot></slot>
    </button>
</template>


<script setup lang="ts">

interface Props {
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

}

defineEmits(['click'])
withDefaults(defineProps<Props>(), {
    position: 'bottom-right'
})


</script>

<style scoped>
.top-left {
    @apply top-5 left-5
}

.top-right {
    @apply top-5 right-5
}

.bottom-left {
    @apply bottom-5 left-5
}

.bottom-right {
    @apply bottom-5 right-5
}
</style>