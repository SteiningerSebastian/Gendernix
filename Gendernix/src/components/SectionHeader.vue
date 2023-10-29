<script setup>
const props = defineProps(['heading', 'padding-top'])
</script>
<template>
  <div class="container">
    <div class="line"></div>
    <div class="accentBox">
      <h4>{{ props.heading }}</h4>
    </div>
    <div class="line"></div>
  </div>
</template>
<style scoped>
.accentBox {
  background-color: rgb(var(--v-theme-accent));
  width: fit-content;
  padding: 0.25em 0.5em;
  font-size: 1.25em;
  justify-content: center;
  text-align: center;
  margin: auto;
  text-wrap: nowrap;
  word-break: keep-all;
}

.container{
    width:100%;
    display: flex;
}

.line{
    width: 50%;
    height: 2px;
    border-bottom: 2px solid rgb(var(--v-theme-accent));
    float: left;
    transform: translateY(21px);
}
</style>
