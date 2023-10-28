<script setup>
import { useLocale } from 'vuetify'
import IconGlobe from './icons/IconGlobe.vue'
import { ref } from 'vue'
import { messages } from '../main'

const { current } = useLocale()
const currentLang = ref(current)
const languages = ref()
languages.value = Object.keys(messages)

//Change the locale
function changeLocale(locale) {
  current.value = locale
}
</script>

<template>
  <!-- The menue is inspired by: https://vuetifyjs.com/en/components/menus/#open-on-hover -->
  <v-menu open-on-hover>
    <template v-slot:activator="{ props }">
      <div v-bind="props" class="languageMenue">
        <div
          style="
            flex: 1;
            text-align: center;
            vertical-align: middle;
            justify-content: center;
            line-height: 36px;
          "
        >
          {{ currentLang.toUpperCase() }}
        </div>
        <div><IconGlobe class="ps-3" /></div>
      </div>
    </template>

    <!-- The languages listed by their name. -->
    <ul class="languageList">
      <li v-for="(item, index) in languages" :key="index">
        <a
          @click="
            () => {
              changeLocale(item)
            }
          "
          style="cursor: pointer"
          >{{ messages[item]['language'] }}</a
        >
      </li>
    </ul>
  </v-menu>
</template>
<style scoped>
.languageList {
  list-style-type: disc;
  background-color: rgb(var(--v-theme-secondary));
  padding: 1em 2em;
  border: 1px solid rgb(var(--v-theme-tertiary));
}

.languageMenue {
  cursor: pointer;
  display: flex;
}

.languageMenue:hover{
  text-decoration: underline;
}
</style>
