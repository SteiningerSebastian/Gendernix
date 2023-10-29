<script setup>
import InfoCardHomeIcon from './InfoCardHomeIcon.vue'
const props = defineProps(['title', 'text', 'icon'])
</script>
<template>
  <!-- Card inspired by https://vuetifyjs.com/en/components/cards/#usage-->
  <v-card color="#FFFFFF00" class="card pt-3">
    <v-card-item class="cardicon pa-0">
      <InfoCardHomeIcon><slot></slot></InfoCardHomeIcon>
    </v-card-item>
    <v-container class="pa-0 ps-2 pe-2">
      <v-card-title class="cardtitle pa-0">{{ props.title }}</v-card-title>
      <v-card-item class="cardtext pa-0">{{ props.text }}</v-card-item>
    </v-container>
  </v-card>
</template>
<style scoped>
.card {
  width: 33%;
  box-shadow: none;
}

.cardicon {
  justify-content: center;
}

.cardtitle {
  font-size: 1.25em;
  color: rgb(var(--v-theme-accent));
  justify-content: center;
  text-align: center;
  padding-block-end: 16px;
}

.cardtext {
  justify-content: center;
  text-align: center;
  padding-block-end: 16px;
}

@media only screen and (max-width: 1280px) {
  .card {
    width: 100%;
    display: flex;
    padding-bottom: 1em;
  }

  .cardicon {
    justify-content: unset;
    width: fit-content;
  }

  .cardtitle {
    justify-content: unset;
    text-align: start;
    height: fit-content;
  }

  .cardtext {
    justify-content: unset;
    text-align: start;
    height: fit-content;
  }
}
</style>
