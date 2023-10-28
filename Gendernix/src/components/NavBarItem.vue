<script setup>
const props = defineProps(['text', 'to'])
</script>

<template>
    <v-btn :to="props.to" height="50px" rounded="0">{{ props.text }}</v-btn>
</template>

<style scoped>
.v-btn{
    text-transform:none !important;
    font-size: 1em !important;
    padding-left: 1.2em !important;
    padding-right: 1.2em !important;
}

.v-btn--active, .v-btn:active {
    background-color: rgb(var(--v-theme-accent)) !important;
}


@media (min-width: 1024px) {
}
</style>
