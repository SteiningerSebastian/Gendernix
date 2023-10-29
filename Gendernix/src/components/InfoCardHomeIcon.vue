<script setup>
import InfoCardIcon from '../components/icons/InfoCardIcon.vue'
</script>
<template>
  <div style="width: fit-content; height: fit-content; position: relative;">
    <div><InfoCardIcon /></div>
    <div class="overlayIcon">
      <slot></slot>
    </div>
  </div>
</template>
<style scoped>
.overlayIcon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -70%);
}
</style>
