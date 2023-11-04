<script setup>
const props = defineProps(['to'])
</script>
<template>
  <RouterLink class="aLink" :to="'/' + $i18n.locale + props.to"><slot></slot></RouterLink>
</template>
