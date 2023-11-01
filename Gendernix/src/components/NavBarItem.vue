<script setup>
const props = defineProps(['text', 'to'])
</script>

<template>
  <v-btn :to="props.to" height="50px" rounded="0">{{ props.text }}</v-btn>
</template>

<style scoped>
.v-btn {
  text-transform: none !important;
  font-size: 1em !important;
  padding-left: 1.2em !important;
  padding-right: 1.2em !important;
  background-color: rgba(0, 0, 0, 0) !important;
}

.v-btn--active,
.v-btn:active {
  background-color: rgb(var(--v-theme-accent)) !important;
}

@media only screen and (max-width: 1280px) {
  .v-btn {
    padding-left: 0.5em !important;
    padding-right: 0.5em !important;
  }
}
</style>
