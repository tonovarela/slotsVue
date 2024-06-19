<template>
  <dialog class="modal" :open="open">
    <div class="modal-box">
      <div class="">
        <slot name="header"></slot>
      </div>
      <div class="my-5">
        <slot name="body"></slot>
      </div>
      <div class=" pt-2">
        <slot name="footer"></slot>
      </div>
    </div>
  </dialog>
  <div v-if="open" class="modal-backdrop fixed top-0 left-0 z-10  bg-gray-500/50  w-screen h-screen"></div>
</template>
<script setup lang="ts">
interface Props {
  open: boolean;
}


withDefaults(defineProps<Props>(), {
  open: true
});

</script>
