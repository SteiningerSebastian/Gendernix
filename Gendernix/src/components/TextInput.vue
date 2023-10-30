<script setup>

const props = defineProps(['value', 'width', 'height'])

</script>
<template>
  <textarea class="txtArea mb-8 pa-5 w-100" label="" v-bind="props.value" v-on:input="$emit('update:modelValue', $event.target.value)"></textarea>
</template>
<style scoped>
.txtArea {
  color: rgb(var(--v-theme-text));
  background-color: rgb(var(--v-theme-tertiary));
  outline: none;
  border: none;
  height: 50vh;
  overflow-y: scroll;
  resize: none;
  font-size: 16px;
}

/* Inspired by https://www.w3schools.com/howto/howto_css_custom_scrollbar.asp */
/* width */
::-webkit-scrollbar {
  width: 12px;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgb(var(--v-theme-text));
  cursor: pointer;

}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(var(--v-theme-accent));
}
</style>
