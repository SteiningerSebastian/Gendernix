<script setup></script>
<template>
  <div class="mainContent">
    <div class="justify-center text-centerma-auto ma-auto imprintContainer">
      <h1>{{ $t('imprint.heading') }}</h1>
      <v-container>
        {{ $t('imprint.content.IUInfo') }}
      </v-container>
      <v-container>
        Sebastian Steininger <br />
        Stierberg 24 <br />
        4121 Arnreit Österreich - EU <br />
      </v-container>
      <v-container>
        <h4>{{ $t('imprint.heading.contact') }}</h4>
        Email: sebastian.steininger@outlook.com <br />
        Tel.Nr. +43 677 61351811<br />
      </v-container>
    </div>
  </div>
</template>
<style scoped>
.imprintContainer {
  width: 50%;
  margin: auto;
  text-align: center;
}

@media only screen and (max-width: 1280px) {
  .imprintContainer {
    width: 80%;
  }
}
</style>
