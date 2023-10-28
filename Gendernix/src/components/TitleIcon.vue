<script setup>
import { ref } from 'vue'
import logo from '../assets/logo.svg'
const icon = ref(logo)
</script>
<template>
  <div
    width="fit-content"
    style="font-size: 1.5em; vertical-align: middle; justify-content: center; height: 36px"
  >
    <div style="width: 64px; padding: 0; float: inline-start">
      <v-img class="mx-2" :src="icon" max-width="36" max-height="36" contain />
    </div>
    Gendernix
  </div>
</template>

<style scoped></style>
