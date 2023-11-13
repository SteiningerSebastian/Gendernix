<script setup>
//Inspired by https://stackoverflow.com/questions/36612847/how-can-i-bind-the-html-title-content-in-vuejs
import { watch } from 'vue'

const props = defineProps(['title', 'description'])

watch(
  () => props.title,
  (newValue) => {
    document.title = newValue
  },{immediate:true}
)

watch(
  () => props.description,
  (newValue) => {
    //Inspired by: https://stackoverflow.com/questions/2568760/is-it-possible-to-use-javascript-to-change-the-meta-tags-of-the-page
    document.querySelector('meta[name="description"]').setAttribute('content', newValue)
  },{immediate:true}
)
</script>
<!-- eslint-disable-next-line vue/valid-template-root -->
<template></template>