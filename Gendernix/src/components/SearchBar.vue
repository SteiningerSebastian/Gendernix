<script setup>
const props = defineProps(['value'])

</script>
<template>
  <v-container class="ma-0 pa-0 flex">
    <input
      class="txtInput mb-8"
      v-bind="props.value"
      v-on:input="$emit('update:modelValue', $event.target.value)"
      @input=" $emit('updateSearch')"
    />
    <v-btn rounded="0" @click="$emit('search')">{{ $t('textsearch.btn.search') }}</v-btn></v-container
  >
</template>
<style scoped>
.txtInput {
  color: rgb(var(--v-theme-text));
  background-color: rgb(var(--v-theme-tertiary));
  outline: none;
  border: none;
  overflow-y: scroll;
  resize: none;
  height: 3em;
  font-size: 20px;
  padding: 0.5em;
  padding-inline-start: 1em;
  width:calc(100% - 120px);
}

.v-btn {
  height: 60px;
  width: 100px;
  font-size: 20px;
  float: inline-end;

}
</style>
